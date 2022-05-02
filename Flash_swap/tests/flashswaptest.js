const { BigNumber } = require("@ethersproject/bignumber");
const { expect } = require("chai");
const { ethers } = require("hardhat");

const ERC20ABI = require("@uniswap/v2-core/build/ERC20.json").abi;

describe("Flash Swap Test", function () {
    const USDCHolder = 0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE
    const USDCAddress = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
    const fundAmount = pow(10, 6).mul(new BN(2000000))
    const borrowAmount = pow(10, 6).mul(new BN(1000000))

    let testFlashSwap;
    let token;
    beforeEach(async () => {
        const TestFlashSwapFactory = await ethers.getContractFactory("testFlashSwap");
        TestFlashSwapContract = await TestFlashSwapFactory.deploy();
        await TestFlashSwapContract.deployed();
    });

    it("should pass", async () => {
        // impersonate acc
        await hre.network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [USDCHolder],
        });
        const impersonateSigner = await ethers.getSigner(USDCHolder);

        // Token Borrowed
        const USDCContract = new ethers.Contract(USDCAddress, ERC20ABI, impersonateSigner)
        // const USDCHolderBalance = await USDCContract.balanceOf(impersonateSigner.address)
    })
})