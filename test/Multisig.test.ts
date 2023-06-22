import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { parseEther } from "ethers";

describe("Multisig", function () {
  async function deployMultisigFixture() {
    const [admin1, admin2, admin3, other] = await ethers.getSigners();
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
      other,
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
      other,
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
      other,
    };
  }

  async function submitFixture() {
    const {
      multisigContract,
      multisigFactory,
      availableBalance,
      ONE_ETH,
      minApproval,
      admin1,
      admin2,
      admin3,
      other,
    } = await depositFixture();

    const tx0 = await multisigContract
      .connect(admin1)
      .submit(admin1.address, ONE_ETH, "0x");
    await tx0.wait();

    const tx1 = await multisigContract
      .connect(admin2)
      .submit(other.address, parseEther("0.000001"), "0x");
    await tx1.wait();

    const tx2 = await multisigContract
      .connect(admin3)
      .submit(admin3.address, ONE_ETH, "0x");
    await tx2.wait();

    return {
      multisigContract,
      multisigFactory,
      availableBalance,
      ONE_ETH,
      minApproval,
      admin1,
      admin2,
      admin3,
      other,
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
      const { multisigContract, admin1, admin2, admin3, other } =
        await loadFixture(deployMultisigFixture);

      expect(await multisigContract.isAdmin(admin1)).to.equal(true);
      expect(await multisigContract.isAdmin(admin2)).to.equal(true);
      expect(await multisigContract.isAdmin(admin3)).to.equal(true);
      expect(await multisigContract.isAdmin(other)).to.equal(false);
    });
  });

  describe("Deposit", function () {
    it("Should update balace correctly", async function () {
      const { multisigContract, other } = await loadFixture(
        deployMultisigFixture
      );

      const transferAmount = parseEther("1");

      await expect(
        other.sendTransaction({
          to: await multisigContract.getAddress(),
          value: transferAmount,
        })
      ).to.changeEtherBalances(
        [multisigContract, other],
        [transferAmount, -transferAmount]
      );

      expect(await multisigContract.availableBalance()).to.equal(
        transferAmount
      );
    });

    it("Should emit Deposit event", async function () {
      const { multisigContract, other } = await loadFixture(
        deployMultisigFixture
      );

      const transferAmount = parseEther("1");

      // With calldata, i.e. fallback() function
      await expect(
        other.sendTransaction({
          to: await multisigContract.getAddress(),
          value: transferAmount,
          data: "0x12345678",
        })
      )
        .to.emit(multisigContract, "Deposit")
        .withArgs(other.address, transferAmount, "0x12345678");

      // Without calldata, i.e. recieve() function
      await expect(
        other.sendTransaction({
          to: await multisigContract.getAddress(),
          value: transferAmount,
        })
      )
        .to.emit(multisigContract, "Deposit")
        .withArgs(other.address, transferAmount, "0x");
    });
  });

  describe("Submit", function () {
    it("Should be callable by only admins", async function () {
      const { multisigContract, availableBalance, admin1, other } =
        await loadFixture(depositFixture);

      await expect(
        multisigContract.connect(admin1).submit(other.address, 100, "0x")
      ).to.not.reverted;

      await expect(
        multisigContract
          .connect(other)
          .submit(other.address, availableBalance, "0x")
      )
        .to.be.revertedWithCustomError(multisigContract, "NotAdmin")
        .withArgs(other.address);
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

    it("Should emit Submit event", async function () {
      const { multisigContract, admin1, other, ONE_ETH } = await loadFixture(
        depositFixture
      );

      const tx = await multisigContract
        .connect(admin1)
        .submit(other.address, ONE_ETH, "0x");

      await expect(tx)
        .to.emit(multisigContract, "Submit")
        .withArgs(0, admin1.address);
    });
  });

  describe("Approve", function () {
    it("Should be callable by only admins", async function () {
      const { multisigContract, admin1, other } = await loadFixture(
        submitFixture
      );

      await expect(multisigContract.connect(other).approve(1))
        .to.revertedWithCustomError(multisigContract, "NotAdmin")
        .withArgs(other.address);
      await expect(multisigContract.connect(admin1).approve(0)).to.not.reverted;
    });

    it("Should update Approver mapping correctly", async function () {
      const { multisigContract, admin1, admin2, other } = await loadFixture(
        submitFixture
      );

      expect(await multisigContract.isApprover(0, admin1.address)).to.equal(
        false
      );
      const tx = await multisigContract.connect(admin1).approve(0);
      await tx.wait();

      expect(await multisigContract.isApprover(0, admin1.address)).to.equal(
        true
      );
      expect(await multisigContract.isApprover(0, admin2.address)).to.equal(
        false
      );
      expect(await multisigContract.isApprover(0, other.address)).to.equal(
        false
      );
    });

    it("Should revert if already Approved", async function () {
      const { multisigContract, admin1 } = await loadFixture(submitFixture);
      const tx = await multisigContract.connect(admin1).approve(0);
      await tx.wait();

      await expect(multisigContract.connect(admin1).approve(0))
        .to.revertedWithCustomError(multisigContract, "AlreadyApproved")
        .withArgs(0, admin1.address);
    });

    it("Should revert if already Executed", async function () {
      const { multisigContract, admin1, admin2, admin3 } = await loadFixture(
        submitFixture
      );
      const tx1 = await multisigContract.connect(admin1).approve(0);
      await tx1.wait();
      const tx2 = await multisigContract.connect(admin2).approve(0);
      await tx2.wait();
      const tx3 = await multisigContract.connect(admin1).execute(0);
      await tx3.wait();

      await expect(multisigContract.connect(admin3).approve(0))
        .to.revertedWithCustomError(multisigContract, "AlreadyExecuted")
        .withArgs(0);
    });

    it("Should emit Approve event", async function () {
      const { multisigContract, admin1 } = await loadFixture(submitFixture);

      await expect(multisigContract.connect(admin1).approve(0))
        .to.emit(multisigContract, "Approve")
        .withArgs(0, admin1.address);
    });
  });

  describe("Revoke", function () {
    it("Should be callable by only admins", async function () {
      const { multisigContract, admin1, other } = await loadFixture(
        submitFixture
      );
      const tx = await multisigContract.connect(admin1).approve(0);
      await tx.wait();

      await expect(multisigContract.connect(other).revoke(0))
        .to.revertedWithCustomError(multisigContract, "NotAdmin")
        .withArgs(other.address);
      await expect(multisigContract.connect(admin1).revoke(0)).to.not.reverted;
    });

    it("Should update Approver mapping correctly", async function () {
      const { multisigContract, admin1 } = await loadFixture(submitFixture);

      const tx0 = await multisigContract.connect(admin1).approve(0);
      await tx0.wait();
      expect(await multisigContract.isApprover(0, admin1.address)).to.equal(
        true
      );

      const tx1 = await multisigContract.connect(admin1).revoke(0);
      await tx1.wait();
      expect(await multisigContract.isApprover(0, admin1.address)).to.equal(
        false
      );
    });

    it("Should revert if not Approved yet", async function () {
      const { multisigContract, admin1 } = await loadFixture(submitFixture);

      await expect(multisigContract.connect(admin1).revoke(0))
        .to.revertedWithCustomError(multisigContract, "NotApprovedYet")
        .withArgs(0, admin1.address);
    });

    it("Should revert if already Executed", async function () {
      const { multisigContract, admin1, admin2, admin3 } = await loadFixture(
        submitFixture
      );
      const tx1 = await multisigContract.connect(admin1).approve(0);
      await tx1.wait();
      const tx2 = await multisigContract.connect(admin2).approve(0);
      await tx2.wait();
      const tx3 = await multisigContract.connect(admin3).approve(0);
      await tx3.wait();
      const tx4 = await multisigContract.connect(admin3).execute(0);
      await tx4.wait();

      await expect(multisigContract.connect(admin1).revoke(0))
        .to.revertedWithCustomError(multisigContract, "AlreadyExecuted")
        .withArgs(0);
    });

    it("Should emit Revoke event", async function () {
      const { multisigContract, admin1 } = await loadFixture(submitFixture);

      const tx = await multisigContract.connect(admin1).approve(0);
      await tx.wait();

      await expect(multisigContract.connect(admin1).revoke(0))
        .to.emit(multisigContract, "Revoke")
        .withArgs(0, admin1.address);
    });
  });

  describe("Execute", function () {
    it("Should be callable by only admins", async function () {
      const { multisigContract, admin1, admin2, admin3, other } =
        await loadFixture(submitFixture);
      const tx1 = await multisigContract.connect(admin1).approve(0);
      await tx1.wait();
      const tx2 = await multisigContract.connect(admin2).approve(0);
      await tx2.wait();
      const tx3 = await multisigContract.connect(admin3).approve(0);
      await tx3.wait();

      await expect(multisigContract.connect(other).execute(0))
        .to.revertedWithCustomError(multisigContract, "NotAdmin")
        .withArgs(other.address);
      await expect(multisigContract.connect(admin1).execute(0)).to.not.reverted;
    });

    it("Should revert if not enough approvals", async function () {
      const { multisigContract, admin1 } = await loadFixture(submitFixture);
      const tx1 = await multisigContract.connect(admin1).approve(0);
      await tx1.wait();

      await expect(multisigContract.connect(admin1).execute(0))
        .to.revertedWithCustomError(multisigContract, "NotEnoughApprovals")
        .withArgs(0);
    });

    it("Should revert if already Executed", async function () {
      const { multisigContract, admin1, admin2, admin3 } = await loadFixture(
        submitFixture
      );
      const tx1 = await multisigContract.connect(admin1).approve(0);
      await tx1.wait();
      const tx2 = await multisigContract.connect(admin2).approve(0);
      await tx2.wait();
      const tx3 = await multisigContract.connect(admin3).approve(0);
      await tx3.wait();
      const tx4 = await multisigContract.connect(admin3).execute(0);
      await tx4.wait();

      await expect(multisigContract.connect(admin1).execute(0))
        .to.revertedWithCustomError(multisigContract, "AlreadyExecuted")
        .withArgs(0);
    });

    it("Should update transaction status correctly", async function () {
      const { multisigContract, admin1, admin2, admin3 } = await loadFixture(
        submitFixture
      );
      const tx1 = await multisigContract.connect(admin1).approve(0);
      await tx1.wait();
      const tx2 = await multisigContract.connect(admin2).approve(0);
      await tx2.wait();
      const tx3 = await multisigContract.connect(admin3).approve(0);
      await tx3.wait();
      const tx4 = await multisigContract.connect(admin3).execute(0);
      await tx4.wait();

      expect((await multisigContract.transactions(0)).isExecuted).to.equal(
        true
      );
    });

    it("Should update nounce correctly", async function () {
      const { multisigContract, admin1, admin2, admin3 } = await loadFixture(
        submitFixture
      );
      const tx1 = await multisigContract.connect(admin1).approve(0);
      await tx1.wait();
      const tx2 = await multisigContract.connect(admin2).approve(0);
      await tx2.wait();
      const tx3 = await multisigContract.connect(admin3).approve(0);
      await tx3.wait();
      const tx4 = await multisigContract.connect(admin2).revoke(0);
      await tx4.wait();
      const tx5 = await multisigContract.connect(admin3).execute(0);
      await tx5.wait();

      expect(await multisigContract.nounce()).to.equal(1);
    });

    it("Should emit Execute event", async function () {
      const { multisigContract, admin1, admin2 } = await loadFixture(
        submitFixture
      );

      const tx1 = await multisigContract.connect(admin1).approve(0);
      await tx1.wait();
      const tx2 = await multisigContract.connect(admin2).approve(0);
      await tx2.wait();

      await expect(multisigContract.connect(admin1).execute(0))
        .to.emit(multisigContract, "Execute")
        .withArgs(0, true, "0x");
    });
  });

  describe("Contract Interaction", async function () {
    async function deployReverterFixture() {
      const {
        multisigContract,
        multisigFactory,
        availableBalance,
        ONE_ETH,
        minApproval,
        admin1,
        admin2,
        admin3,
        other,
      } = await depositFixture();

      const reverterFactory = await ethers.getContractFactory("Reverter");
      const reverterContract = await reverterFactory.connect(other).deploy();
      return {
        multisigContract,
        multisigFactory,
        reverterContract,
        availableBalance,
        ONE_ETH,
        minApproval,
        admin1,
        admin2,
        admin3,
        other,
      };
    }

    it("Should handle failed calls correctly", async function () {
      const {
        multisigContract,
        reverterContract,
        availableBalance,
        ONE_ETH,
        admin1,
        admin2,
        admin3,
      } = await loadFixture(deployReverterFixture);

      const value = ONE_ETH;
      const data = reverterContract.interface.encodeFunctionData("giveError");

      expect(await multisigContract.availableBalance()).to.equal(
        availableBalance
      );

      const tx1 = await multisigContract
        .connect(admin1)
        .submit(reverterContract.getAddress(), value, data);
      await tx1.wait();
      expect(await multisigContract.availableBalance()).to.equal(
        availableBalance - value
      );

      const tx2 = await multisigContract.connect(admin1).approve(0);
      await tx2.wait();
      const tx3 = await multisigContract.connect(admin2).approve(0);
      await tx3.wait();

      const tx4 = await multisigContract.connect(admin3).approve(0);
      await tx4.wait();
      const tx5 = await multisigContract.connect(admin3).revoke(0);
      await tx5.wait();

      const tx6 = await multisigContract.connect(admin1).execute(0);
      await tx6.wait();

      expect(await multisigContract.nounce()).to.equal(1);
      expect(await multisigContract.availableBalance()).to.equal(
        availableBalance
      );
    });
  });
});
