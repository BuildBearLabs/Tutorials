const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DutchAuction contract", function () {
  let DutchAuction;
  let dutchAuction;
  let IERC721;
  let nft;
  let seller;
  let buyer;

  const startingPrice = ethers.utils.parseEther("1.0"); // 1 ETH
  const discountRate = ethers.utils.parseEther("0.1"); // 0.1 ETH
  const DURATION = 7 * 24 * 60 * 60; // 7 days in seconds

  beforeEach(async () => {
    [seller, buyer] = await ethers.getSigners();

    IERC721 = await ethers.getContractFactory("IERC721Mock");
    nft = await IERC721.deploy();
    await nft.deployed();

    DutchAuction = await ethers.getContractFactory("DutchAuction");
    dutchAuction = await DutchAuction.deploy(startingPrice, discountRate, nft.address, 1);
    await dutchAuction.deployed();
  });

  it("should initialize correctly", async function () {
    const sellerAddress = await dutchAuction.seller();
    const startingPriceValue = await dutchAuction.startingPrice();
    const discountRateValue = await dutchAuction.discountRate();
    const startAt = await dutchAuction.startAt();
    const expiresAt = await dutchAuction.expiresAt();
    const nftAddress = await dutchAuction.nft();
    const nftId = await dutchAuction.nftId();

    expect(sellerAddress).to.equal(seller.address);
    expect(startingPriceValue).to.equal(startingPrice);
    expect(discountRateValue).to.equal(discountRate);
    expect(startAt).to.be.gt(0);
    expect(expiresAt).to.be.gt(0);
    expect(expiresAt).to.be.gt(startAt);
    expect(nftAddress).to.equal(nft.address);
    expect(nftId).to.equal(1);
  });

  it("should calculate the correct price over time", async function () {
    const timeElapsed = DURATION / 2; // Half the duration
    const expectedPrice = startingPrice.sub(discountRate.mul(timeElapsed));

    
    await network.provider.send("evm_increaseTime", [timeElapsed]);
    await network.provider.send("evm_mine");

    const currentPrice = await dutchAuction.getPrice();
    expect(currentPrice).to.equal(expectedPrice);
  });

  it("should allow the buyer to purchase the NFT", async function () {
    const expectedPrice = ethers.utils.parseEther("0.5"); 
    const gasLimit = 210000; 

    await network.provider.send("evm_increaseTime", [DURATION / 2]);
    await network.provider.send("evm_mine");

    const tx = await dutchAuction.connect(buyer).buy({ value: expectedPrice, gasLimit: gasLimit });

    const owner = await nft.ownerOf(1);
    expect(owner).to.equal(buyer.address);

    const sellerBalance = await ethers.provider.getBalance(seller.address);
    const expectedSellerBalance = startingPrice.sub(expectedPrice);
    expect(sellerBalance).to.equal(expectedSellerBalance);

    const buyerBalance = await ethers.provider.getBalance(buyer.address);
    expect(buyerBalance).to.be.gt(expectedPrice);

    const contractBalance = await ethers.provider.getBalance(dutchAuction.address);
    expect(contractBalance).to.equal(0);

   
    await expect(tx).to.be.revertedWith("Self-destructed");
  });

  it("should not allow the buyer to purchase the NFT after the auction expires", async function () {
    
    await network.provider.send("evm_increaseTime", [DURATION + 1]);
    await network.provider.send("evm_mine");

    
    const expectedPrice = ethers.utils.parseEther("0.5");
    await expect(
      dutchAuction.connect(buyer).buy({ value: expectedPrice })
    ).to.be.revertedWith("auction expired");
  });
});
