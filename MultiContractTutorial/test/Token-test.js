const { expect } = require("chai");
const { ethers } = require("hardhat");
require("@nomicfoundation/hardhat-chai-matchers")

describe("Token contract", function () {
    let Token;
    let token;
    let owner;
    let buyer;

    beforeEach(async function () {
        Token = await ethers.getContractFactory("Token");
        token = await Token.deploy(1000);
        [owner, buyer] = await ethers.getSigners();
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await token.balanceOf(owner.address)).to.equal(ethers.BigNumber.from("1000"));
        });

        it("Should set the total supply", async function () {
            expect(await token.totalSupply()).to.equal(1000);
        });
    });

    describe("Transactions", function () {
        it("Should transfer tokens between accounts", async function () {
            await token.transfer(buyer.address, 100);
            expect(await token.balanceOf(owner.address)).to.equal(900);
            expect(await token.balanceOf(buyer.address)).to.equal(100);
        });

        it("Should fail if sender doesn’t have enough tokens", async function () {
            const initialOwnerBalance = await token.balanceOf(owner.address);

            await expect(
                token.transfer(buyer.address, 10000)
            ).to.be.revertedWithoutReason();

            expect(await token.balanceOf(owner.address)).to.equal(initialOwnerBalance);
        });

        it("Should update allowance", async function () {
            await token.approve(buyer.address, 100);
            expect(await token.allowance(owner.address, buyer.address)).to.equal(100);
        });

        it("Should transfer tokens from one account to another with allowance", async function () {
            await token.approve(buyer.address, 100);
            await token.connect(buyer).transferFrom(owner.address, buyer.address, 1);

            expect(await token.balanceOf(owner.address)).to.equal(999);
            expect(await token.balanceOf(buyer.address)).to.equal(1);
            expect(await token.allowance(owner.address, buyer.address)).to.equal(99);
        });

        it("Should fail if sender doesn’t have enough allowance", async function () {
            await token.approve(buyer.address, 99);

            await expect(
                token.transferFrom(owner.address, buyer.address, 100)
            ).to.be.revertedWith("ERC20: transfer amount exceeds allowance");
        });
    });
});