const { expect } = require("chai");
require("@nomicfoundation/hardhat-chai-matchers")
require("ethers");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");


describe("ERC1155 contract", () => {

    async function deployTokenFixture() {
        const [owner, addr1, addr2] = await ethers.getSigners();
        const ERC1155 = await ethers.getContractFactory("TestERC1155");
        const erc1155 = await ERC1155.deploy();
        await erc1155.deployed();
        return { erc1155, owner, addr1, addr2 };
    }

    describe("Deployment", () => {

        it("Should set the right owner", async () => {
            const { erc1155, owner } = await loadFixture(deployTokenFixture);
            expect(await erc1155.owner()).to.equal(owner.address);
        });
    });

    describe("mint", () => {
        it("Should mint a token with token ID 1 & 2 to account1", async () => {
            const { erc1155, owner } = await loadFixture(deployTokenFixture);

            await erc1155.mint(owner.address, 1, 1, "https://baseUrl.com");
            expect(await erc1155.balanceOf(owner.address, 1)).to.equal(1);

            await erc1155.mint(owner.address, 2, 2, "https://baseUrl.com");
            expect(await erc1155.balanceOf(owner.address, 2)).to.equal(2);

            const svg = await erc1155.uri(2)
            console.log("svg:", svg)
        });

    })


    describe("safeTransferFrom", () => {
        it("Should transfer a token with token ID 1 from account1 to account2", async () => {
            const { erc1155, owner, addr1, addr2 } = await loadFixture(deployTokenFixture);

            await erc1155.mint(owner.address, 1, 1, "https://baseUrl.com");
            expect(await erc1155.balanceOf(owner.address, 1)).to.equal(1);

            await erc1155.safeTransferFrom(owner.address, addr1.address, 1, 1, "0x00");
            expect(await erc1155.balanceOf(owner.address, 1)).to.equal(0);
            expect(await erc1155.balanceOf(addr1.address, 1)).to.equal(1);
        });

        it("Should transfer a token with token ID 2 from account1 to account2", async () => {

            const { erc1155, owner, addr1, addr2 } = await loadFixture(deployTokenFixture);

            await erc1155.mint(owner.address, 5, 2, "https://baseUrl.com");
            expect(await erc1155.balanceOf(owner.address, 2)).to.equal(5);

            await erc1155.safeTransferFrom(owner.address, addr1.address, 2, 5, "0x00");
            expect(await erc1155.balanceOf(owner.address, 2)).to.equal(0);
            expect(await erc1155.balanceOf(addr1.address, 2)).to.equal(5);
        });
    })
    describe("safeBatchTransferFrom", () => {
        it("Should transfer a token with token ID 1 & 2 from account1 to account2", async () => {
            const { erc1155, owner, addr1, addr2 } = await loadFixture(deployTokenFixture);

            await erc1155.mint(owner.address, 1, 1, "https://baseUrl.com");
            expect(await erc1155.balanceOf(owner.address, 1)).to.equal(1);

            await erc1155.mint(owner.address, 2, 2, "https://baseUrl.com");
            expect(await erc1155.balanceOf(owner.address, 2)).to.equal(2);

            await erc1155.safeBatchTransferFrom(owner.address, addr1.address, [1, 2], [1, 2], "0x00");
            expect(await erc1155.balanceOf(owner.address, 1)).to.equal(0);
            expect(await erc1155.balanceOf(owner.address, 2)).to.equal(0);
            expect(await erc1155.balanceOf(addr1.address, 1)).to.equal(1);
            expect(await erc1155.balanceOf(addr1.address, 2)).to.equal(2);
        });

    })
    describe("setApprovalForAll", () => {
        it("Should set approval for all", async () => {
            const { erc1155, owner, addr1, addr2 } = await loadFixture(deployTokenFixture);

            await erc1155.setApprovalForAll(addr1.address, true);
            expect(await erc1155.isApprovedForAll(owner.address, addr1.address)).to.equal(true);
        });

    })
    describe("isApprovedForAll", () => {
        it("Should return true if approved for all", async () => {
            const { erc1155, owner, addr1, addr2 } = await loadFixture(deployTokenFixture);

            await erc1155.setApprovalForAll(addr1.address, true);
            expect(await erc1155.isApprovedForAll(owner.address, addr1.address)).to.equal(true);
        });

    })
    describe("setURI", () => {
        it("Should set the URI", async () => {
            const { erc1155, owner, addr1, addr2 } = await loadFixture(deployTokenFixture);

            await erc1155.setURI("https://baseUrl.com/2");
            expect(await erc1155.uri(1)).to.equal("https://baseUrl.com/2");
        });

    })
    describe("pause", () => {
        it("Should pause the contract", async () => {
            const { erc1155, owner, addr1, addr2 } = await loadFixture(deployTokenFixture);

            await erc1155.pause();
            expect(await erc1155.paused()).to.equal(true);
        });

    })
    describe("unpause", () => {
        it("Should unpause the contract", async () => {
            const { erc1155, owner, addr1, addr2 } = await loadFixture(deployTokenFixture);

            await erc1155.pause();
            expect(await erc1155.paused()).to.equal(true);

            await erc1155.unpause();
            expect(await erc1155.paused()).to.equal(false);
        });

    })



})
