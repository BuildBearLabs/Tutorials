const { expect } = require("chai");
const { ethers } = require("hardhat");
const { describe, it } = require("mocha");

describe("CarbonToken", function () {
  let regulator, carbonToken, owner;

  beforeEach(async function () {
    const regulatorFactory = await ethers.getContractFactory("regulator");
  regulator = await regulatorFactory.deploy();
  await regulator.deployed();
    
  const carbonTokenFactory = await ethers.getContractFactory("carbonToken");
  carbonToken = await carbonTokenFactory.deploy(regulator.address);
  await carbonToken.deployed();
  
    [owner] = await ethers.getSigners();
  });

  describe("Minting", function () {
    it("Should allow the regulator to mint tokens", async function () {
      const amountToMint = 100;

      await regulator.connect(owner).mint(carbonToken.address, amountToMint);
      const balance = await carbonToken.balanceOf(carbonToken.address);
      
      expect(balance).to.equal(amountToMint);
    });

    it("Should not allow non-regulators to mint tokens", async function () {
      const amountToMint = 100;

      await expect(
        carbonToken.connect(owner).mint(owner.address, amountToMint)
      ).to.be.revertedWith("ERC20PresetMinterPauser: must have minter role to mint");
    });
  });
  describe("Burning", function () {
    it("Should allow the regulator to burn tokens", async function () {
      const amountToMint = 100;
      await regulator.connect(owner).mint(carbonToken.address, amountToMint);

      const amountToBurn = 50;
      await regulator.burn(carbonToken.address, amountToBurn);

      const balance = await carbonToken.balanceOf(carbonToken.address);
      expect(balance).to.equal(amountToMint.sub(amountToBurn));
    });

    it("Should not allow non-regulators to burn tokens", async function () {
      const amountToMint = 100;
      await regulator.connect(owner).mint(carbonToken.address, amountToMint);

      const amountToBurn = 50;
      await expect(
        carbonToken.connect(owner).burn(owner.address, amountToBurn)
      ).to.be.revertedWith("ERC20PresetMinterPauser: must have burner role to burn");
    });
  });

  describe("Pausing", function () {
    it("Should allow the regulator to pause the contract", async function () {
      await regulator.pause(carbonToken.address);
      await expect(
        carbonToken.connect(owner).transfer(owner.address, 1)
      ).to.be.revertedWith("Pausable: paused");
    });

    it("Should not allow non-regulators to pause the contract", async function () {
      await expect(
        carbonToken.connect(owner).pause()
      ).to.be.revertedWith("ERC20PresetMinterPauser: must have pauser role to pause");
    });
  });

  describe("Unpausing", function () {
    it("Should allow the regulator to unpause the contract", async function () {
      await regulator.pause(carbonToken.address);
      await regulator.unpause(carbonToken.address);
      await carbonToken.transfer(owner.address, 1);
    });

    it("Should not allow non-regulators to unpause the contract", async function () {
      await expect(
        carbonToken.connect(owner).unpause()
      ).to.be.revertedWith("ERC20PresetMinterPauser: must have pauser role to unpause");
    });
  })
});