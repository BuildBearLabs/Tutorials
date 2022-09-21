const { expect } = require("chai");
const { ethers, waffle, network } = require("hardhat");

describe("Staking", function () {
  this.beforeEach(async function () {
    [signer1, signer2] = await ethers.getSigners();
    Staking = await ethers.getContractFactory("Staking", signer1);
    staking = await Staking.deploy({
      value: ethers.utils.parseEther("10"),
    });
  });


  describe("stakeEther", function () {
    it("transfers ethers", async function () {
      const provider = waffle.provider;
      let contractBalance;
      let signerBalance;
      const transferAmount = ethers.utils.parseEther("2.0");
      contractBalance = await provider.getBalance(staking.address);
      signerBalance = await signer1.getBalance();

      const data = { value: transferAmount };
      const transaction = await staking.connect(signer1).stakeEther(30, data);
      const receipt = await transaction.wait();
      const gasUsed = receipt.gasUsed.mul(receipt.effectiveGasPrice);

      // test the change in signer1's ether bal
      expect(await signer1.getBalance()).to.equal(
        signerBalance.sub(transferAmount).sub(gasUsed)
      );

      // test the change in contract's ether bal
      expect(await provider.getBalance(staking.address)).to.equal(
        contractBalance.add(transferAmount)
      );
    });
  });
});
