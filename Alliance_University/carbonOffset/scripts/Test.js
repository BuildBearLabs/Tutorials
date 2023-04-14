const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Carbon Token", function () {
  let Token, token, Regulator, regulator, owner, pauser, minter, burner;

  const INITIAL_SUPPLY = ethers.utils.parseEther("1000000000");

  beforeEach(async function () {
    [owner, pauser, minter, burner] = await ethers.getSigners();

    Token = await ethers.getContractFactory("CarbonToken");
    token = await Token.connect(owner).deploy(pauser.address);

    Regulator = await ethers.getContractFactory("regulator");
    regulator = await Regulator.connect(owner).deploy();

    // Mint initial supply
    await token.connect(owner).mint(owner.address, INITIAL_SUPPLY);
  });

  describe("Minting", function () {
    it("should mint tokens when called by minter account", async function () {
      await regulator.connect(owner).grantRole(
        await regulator.MINTER_ROLE(),
        minter.address
      );

      await token.connect(minter).mint(owner.address, 100);

      const balance = await token.balanceOf(owner.address);
      expect(balance).to.equal(INITIAL_SUPPLY.add(ethers.utils.parseEther("100")));
    });

    it("should revert when minting without minter role", async function () {
      await expect(token.connect(minter).mint(owner.address, 100)).to.be.revertedWith(
        "CarbonToken: must have minter role to mint"
      );
    });
  });

  describe("Burning", function () {
    it("should burn tokens when called by burner account", async function () {
      await regulator.connect(owner).grantRole(
        await regulator.BURNER_ROLE(),
        burner.address
      );

      await token.connect(owner).transfer(burner.address, 100);
      await token.connect(burner).burn(burner.address, 50);

      const balance = await token.balanceOf(burner.address);
      expect(balance).to.equal(INITIAL_SUPPLY.sub(ethers.utils.parseEther("50")));
    });

    it("should revert when burning without burner role", async function () {
      await expect(token.connect(owner).burn(burner.address, 100)).to.be.revertedWith(
        "Caller is not a burner"
      );
    });
  });

  describe("Pausing", function () {
    it("should pause transfers when called by pauser account", async function () {
      await token.connect(pauser).pause();
      await expect(token.connect(minter).mint(owner.address, 100)).to.be.revertedWith(
        "Pausable: paused"
      );
    });

    it("should unpause transfers when called by pauser account", async function () {
      await token.connect(pauser).pause();
      await token.connect(pauser).unpause();

      await token.connect(minter).mint(owner.address, 100);

      const balance = await token.balanceOf(owner.address);
      expect(balance).to.equal(INITIAL_SUPPLY.add(ethers.utils.parseEther("100")));
    });

    it("should revert when pausing without pauser role", async function () {
      await expect(token.connect(owner).pause()).to.be.revertedWith(
        "CarbonToken: must have pauser role to pause"
      );
    });

    it("should revert when unpausing without pauser role", async function () {
      await expect(token.connect(owner).unpause()).to.be.revertedWith(
        "CarbonToken: must have pauser role to unpause"
      );
    });
  });
});