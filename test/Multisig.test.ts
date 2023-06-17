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
      const { multisigContract, admin1, admin2, admin3, other1 } =
        await loadFixture(deployMultisigFixture);

      expect(await multisigContract.isAdmin(admin1)).to.equal(true);
      expect(await multisigContract.isAdmin(admin2)).to.equal(true);
      expect(await multisigContract.isAdmin(admin3)).to.equal(true);
      expect(await multisigContract.isAdmin(other1)).to.equal(false);
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
});
