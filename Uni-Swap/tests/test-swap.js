const { BigNumber } = require("@ethersproject/bignumber");
const { expect } = require("chai");
const { ethers } = require("hardhat");

const IERC20ABI = ("../artifacts/contracts/interfaces/IERC20.sol/IERC20.json");
// const TestSwapABI = ("../artifacts/contracts/testSwap.sol/testSwap.json").abi;

describe("Test Swap", function () {

    const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    const WBTC = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599";
    const my_address = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    const DAIHolder = "0x93c08a3168fc469f3fc165cd3a471d19a37ca19e";
    // const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    // const WBTC = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599";

    const AMOUNT_IN = 100000000; // 100,000 DAI
    const AMOUNT_OUT_MIN = 1;
    const TOKEN_IN = DAIAddress;
    const TOKEN_OUT = WBTC;
    const TO = my_address;

    beforeEach(async () => {
        const TestSwapFactory = await ethers.getContractFactory("testSwap");
        const TestSwapContract = await TestSwapFactory.deploy();
        await TestSwapContract.deployed();
    })

    it("should swap", async () => {
        // need to impersonate an acc 
        await hre.network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [DAIHolder],
          });
          const impersonateSigner = await ethers.getSigner(DAIHolder)
        // const TokenIn = await IERC20ABI.at(TOKEN_IN);
        // const TokenOut = await IERC20ABI.at(TOKEN_OUT);
        // await TokenIn.approve(TestSwapContract.address, AMOUNT_IN, { from: impersonateSigner });
        await TOKEN_IN.connect(impersonateSigner).approve(TestSwapContract.address, AMOUNT_IN)

        await TestSwapContract.swap (
            TokenIn.address,
            TokenOut.address,
            AMOUNT_IN,
            AMOUNT_OUT_MIN,
            TO, 
            {
                from: impersonateSigner
            }
        )
console.log(`out ${await TokenOut.balanceOf(TO)}`);

    })
})