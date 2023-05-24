const { expect } = require("chai");

require("chai");
require("ethers");

describe("RentNFT", function () {
    let contract;

    beforeEach(async () => {
        const [owner, addr1, addr2] = await ethers.getSigners();
        const RentableNFT = await ethers.getContractFactory("RentableNFT");
        contract = await RentableNFT.deploy();
    });

    describe("Minting NFT", () => {
        it("Minting 1 NFTs and checking balance of the User", async function () {
            const [owner, addr1, addr2] = await ethers.getSigners();
            await contract.deployed();
            const nftmint = await contract.nftMint();
            nftmint.wait();
            const nftid = await contract.totalSupply();
            expect(nftid.toNumber()).to.equal(1);
        });
    });

    describe("Renting an NFT", () => {
        it("Renting an NFT to User", async () => {
            const [owner, addr1, addr2] = await ethers.getSigners();
            await contract.deployed();
            const nftmint = await contract.nftMint();
            nftmint.wait();
            const nftid = await contract.totalSupply();
            expect(nftid.toNumber()).to.equal(1);
            const DAY = 1 * 24 * 60 * 60;
            const currentBlock = await ethers.provider.getBlockNumber();
            const rent_expire_time = (await ethers.provider.getBlock(currentBlock)).timestamp + DAY;
            const Tx = await contract.setUser(nftid, addr1.address, rent_expire_time, { "from": owner.address })
            await Tx.wait();
            expect(await contract.userOf(nftid)).to.equal(addr1.address);
        });
    });

    describe("Rent same NFT twice", () => {
        it("Owner canot rent same NFT to 2 Users", async () => {
            const [owner, addr1, addr2] = await ethers.getSigners();
            await contract.deployed();
            const nftmint = await contract.nftMint();
            nftmint.wait();
            const nftid = await contract.totalSupply();
            expect(nftid.toNumber()).to.equal(1);
            const DAY = 1 * 24 * 60 * 60;
            const currentBlock = await ethers.provider.getBlockNumber();
            const rent_expire_time = (await ethers.provider.getBlock(currentBlock)).timestamp + DAY;
            const Tx = await contract.setUser(nftid, addr1.address, rent_expire_time, { "from": owner.address })
            await Tx.wait();
            await expect(contract.setUser(nftid, addr2.address, rent_expire_time, { "from": owner.address })).to.be.revertedWith('User already assigned');
        });

    });

    describe("User NFt transfer", () => {
        it("User should not be able to transfer NFTs", async () => {
            const [owner, addr1, addr2] = await ethers.getSigners();
            await contract.deployed();
            const nftmint = await contract.nftMint();
            nftmint.wait();
            const nftid = await contract.totalSupply();
            expect(nftid.toNumber()).to.equal(1);
            const DAY = 1 * 24 * 60 * 60;
            const currentBlock = await ethers.provider.getBlockNumber();
            const rent_expire_time = (await ethers.provider.getBlock(currentBlock)).timestamp + DAY;
            const Tx = await contract.setUser(nftid, addr1.address, rent_expire_time, { "from": owner.address });
            await Tx.wait();
            expect(contract.userExpires(1)).to.be.revertedWith("ERC721: caller is not token owner or approved");


        });


    });

    describe("NFTrent  expires", () => {
        it("check the expire time", async () => {
            const [owner, addr1, addr2] = await ethers.getSigners();
            await contract.deployed();
            const nftmint = await contract.nftMint();
            nftmint.wait();
            const nftid = await contract.totalSupply();
            expect(nftid.toNumber()).to.equal(1);
            const DAY = 1 * 24 * 60 * 60;
            const currentBlock = await ethers.provider.getBlockNumber();
            const rent_expire_time = (await ethers.provider.getBlock(currentBlock)).timestamp + DAY;
            const Tx = await contract.setUser(nftid, addr1.address, rent_expire_time, { "from": owner.address });
            await Tx.wait();
            await expect(contract.userExpires(nftid) < (DAY));


        });


    });


});