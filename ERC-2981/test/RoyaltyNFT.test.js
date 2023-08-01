const {ethers}= require("hardhat");
const {loadFixture}= require("@nomicfoundation/hardhat-network-helpers");
const { expect}= require("chai");
const {parseEther}= require("ethers");


describe("RoyaltyNFT", function () {
    let royaltyNFT;
    let owner;
    let addr1;
    let addr2;
  
    beforeEach(async function () {
      [owner, addr1, addr2] = await ethers.getSigners();
  
      const RoyaltyNFT = await ethers.getContractFactory("RoyaltyNFT");
      royaltyNFT = await RoyaltyNFT.deploy(addr1.address, 10000); // 10% royalty fee
  
      await royaltyNFT.deployed();
    });
  
    it("Should mint an NFT and set default royalty", async function () {
      const tokenId = 1;
      const to = addr2.address;
  
      // Mint an NFT
      await royaltyNFT.safeMint(to);
  
      // Check the royalty receiver and fee numerator
      const royaltyInfo = await royaltyNFT.royaltyInfo(tokenId, ethers.utils.parseUnits("1", "ether"));
      expect(royaltyInfo[0]).to.equal(addr1.address);
      expect(royaltyInfo[1]).to.equal(ethers.utils.parseUnits("1", "ether"));
    });

    it("Should update default token royalty", async function () {
        const tokenId = 1;
        const receiver = addr2.address;
        const feeNumerator = 5000; // 50% royalty fee
    
        // Mint an NFT
        await royaltyNFT.safeMint(owner.address);
    
        // Set token royalty
        await royaltyNFT.setTokenRoyalty(tokenId, receiver, feeNumerator);
    
        // Check the updated royalty receiver and fee numerator
        const royaltyInfo = await royaltyNFT.royaltyInfo(tokenId, ethers.utils.parseUnits("1", "ether"));
        expect(royaltyInfo[0]).to.equal(receiver);
        expect(royaltyInfo[1]).to.equal(ethers.utils.parseUnits("0.5", "ether"));
      });
    
    it("Should not allow setting token royalty by non-owner", async function () {
        const to = addr2.address;
    
        // Mint an NFT
        await royaltyNFT.safeMint(to);
    
        const tokenId = 1;
    
        const receiver = addr2.address;
        const feeNumerator = 5000; // 50% royalty fee
    
        // Non-owner tries to set token royalty
        await expect(royaltyNFT.connect(addr2).setTokenRoyalty(tokenId, receiver, feeNumerator)).to.be.revertedWith(
          "Ownable: caller is not the owner"
        );
      });


});
