const { expect } = require("chai");
const { ethers } = require("hardhat");
const { BigNumber } = require("ethers")


const ERC20ABI = require("@uniswap/v2-core/build/ERC20.json").abi;

describe("Flash Swap Test", function () {
    const USDCHolder = "0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE";
    const USDCAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
    const borrowAmount = 1000000000; // 1000

    before(async () => {
        const TestFlashSwapFactory = await ethers.getContractFactory("flashSwap");
        TestFlashSwapContract = await TestFlashSwapFactory.deploy();
        await TestFlashSwapContract.deployed();
    });

    it("Flash swap", async () => {
        // impersonate acc
        await hre.network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [USDCHolder],
        });
        const impersonateSigner = await ethers.getSigner(USDCHolder);

        // Token Borrowed
        const USDCContract = new ethers.Contract(USDCAddress, ERC20ABI, impersonateSigner)
        // const USDCHolderBalance = await USDCContract.balanceOf(impersonateSigner.address)
        // console.log(`USDC Holder Balance: ${USDCHolderBalance}`)
        const fee = Math.round(((borrowAmount * 3) / 997)) + 1;
        await USDCContract.connect(impersonateSigner).transfer(TestFlashSwapContract.address, fee)
        await TestFlashSwapContract.testFlashSwap(USDCContract.address, borrowAmount)
        const TestFlashSwapContractBalance = await USDCContract.balanceOf(TestFlashSwapContract.address)
        expect(TestFlashSwapContractBalance.eq(BigNumber.from("0"))).to.be.true;
    })
})