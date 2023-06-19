import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { parseEther } from "ethers";

describe("Multisig", function () {
  async function deployMultisigFixture() {
    const [admin1, admin2, admin3, other1, other2, other3] =
      await ethers.getSigners();
    const minApproval = 2;
    const multisigFactory = await ethers.getContractFactory("Multisig");
    const multisigContract = await multisigFactory.deploy(
      [admin1, admin2, admin3],
      minApproval
    );

    return {
      multisigContract,
      multisigFactory,
      minApproval,
      admin1,
      admin2,
      admin3,
      other1,
      other2,
      other3,
    };
  }

  async function depositFixture() {
    const {
      multisigContract,
      multisigFactory,
      minApproval,
      admin1,
      admin2,
      admin3,
      other1,
      other2,
      other3,
    } = await deployMultisigFixture();

    const transferAmount = parseEther("1");

    await admin1.sendTransaction({
      to: await multisigContract.getAddress(),
      value: transferAmount,
    });

    await admin2.sendTransaction({
      to: await multisigContract.getAddress(),
      value: transferAmount,
    });

    await admin3.sendTransaction({
      to: await multisigContract.getAddress(),
      value: transferAmount,
    });

    const availableBalance = await multisigContract.availableBalance();
    const ONE_ETH = parseEther("1");

    return {
      multisigContract,
      multisigFactory,
      availableBalance,
      ONE_ETH,
      minApproval,
      admin1,
      admin2,
      admin3,
      other1,
      other2,
      other3,
    };
  }

  describe("Deployment", function () {
    it("Should revert if minApproval > admins.length", async function () {
      const { multisigFactory, admin1, admin2, admin3 } = await loadFixture(
        deployMultisigFixture
      );
      await expect(
        multisigFactory.deploy([admin1, admin2, admin3], 4)
      ).to.be.revertedWithCustomError(multisigFactory, "InvalidMinApproval");
    });

    it("Should not revert if minApproval <= admins.length", async function () {
      const { multisigFactory, admin1, admin2, admin3 } = await loadFixture(
        deployMultisigFixture
      );

      await expect(multisigFactory.deploy([admin1, admin2, admin3], 2)).to.not
        .reverted;

      await expect(multisigFactory.deploy([admin1, admin2, admin3], 3)).to.not
        .reverted;
    });

    it("Should set admins correctly", async function () {
      const {
        multisigContract,
        admin1,
        admin2,
        admin3,
        other1,
        other2,
        other3,
      } = await loadFixture(deployMultisigFixture);

      expect(await multisigContract.isAdmin(admin1)).to.equal(true);
      expect(await multisigContract.isAdmin(admin2)).to.equal(true);
      expect(await multisigContract.isAdmin(admin3)).to.equal(true);
      expect(await multisigContract.isAdmin(other1)).to.equal(false);
      expect(await multisigContract.isAdmin(other2)).to.equal(false);
      expect(await multisigContract.isAdmin(other3)).to.equal(false);
    });
  });

  describe("Deposit", function () {
    it("Should update balace correctly", async function () {
      const { multisigContract, other1 } = await loadFixture(
        deployMultisigFixture
      );

      const transferAmount = parseEther("1");

      await expect(
        other1.sendTransaction({
          to: await multisigContract.getAddress(),
          value: transferAmount,
        })
      ).to.changeEtherBalances(
        [multisigContract, other1],
        [transferAmount, -transferAmount]
      );

      expect(await multisigContract.availableBalance()).to.equal(
        transferAmount
      );
    });

    it("Should emit Deposit event", async function () {
      const { multisigContract, other1, other2 } = await loadFixture(
        deployMultisigFixture
      );

      const transferAmount = parseEther("1");

      // With calldata, i.e. fallback() function
      await expect(
        other1.sendTransaction({
          to: await multisigContract.getAddress(),
          value: transferAmount,
          data: "0x12345678",
        })
      )
        .to.emit(multisigContract, "Deposit")
        .withArgs(other1.address, transferAmount, "0x12345678");

      // Without calldata, i.e. recieve() function
      await expect(
        other2.sendTransaction({
          to: await multisigContract.getAddress(),
          value: transferAmount,
        })
      )
        .to.emit(multisigContract, "Deposit")
        .withArgs(other2.address, transferAmount, "0x");
    });
  });

  describe("Submit", function () {
    it("Should be callable by only admins", async function () {
      const { multisigContract, availableBalance, admin1, other1 } =
        await loadFixture(depositFixture);

      await expect(
        multisigContract.connect(admin1).submit(other1.address, 100, "0x")
      ).to.not.reverted;

      await expect(
        multisigContract
          .connect(other1)
          .submit(other1.address, availableBalance, "0x")
      )
        .to.be.revertedWithCustomError(multisigContract, "NotAdmin")
        .withArgs(other1.address);
    });

    it("Should revert if value > availableBalance", async function () {
      const { multisigContract, availableBalance, admin1, ONE_ETH } =
        await loadFixture(depositFixture);

      const value = availableBalance + ONE_ETH;
      await expect(
        multisigContract.submit(admin1.address, value, "0x")
      ).to.revertedWithCustomError(multisigContract, "InvalidTxnValue");
    });

    it("Should add the transaction correctly", async function () {
      const { multisigContract, admin1, ONE_ETH } = await loadFixture(
        depositFixture
      );
      await expect(multisigContract.transactions(0)).to.reverted;

      const tx = await multisigContract.submit(admin1.address, ONE_ETH, "0x");
      await tx.wait();

      const txn = await multisigContract.transactions(0);
      expect(txn.to).to.equal(admin1.address);
      expect(txn.value).to.equal(ONE_ETH);
      expect(txn.data).to.equal("0x");
      expect(txn.isExecuted).to.equal(false);
    });

    it("Should decrease the availableBalance", async function () {
      const { multisigContract, admin1, ONE_ETH, availableBalance } =
        await loadFixture(depositFixture);
      expect(await multisigContract.availableBalance()).to.equal(
        availableBalance
      );

      const tx = await multisigContract.submit(admin1.address, ONE_ETH, "0x");
      await tx.wait();

      expect(await multisigContract.availableBalance()).to.equal(
        availableBalance - ONE_ETH
      );
    });
  });
});
