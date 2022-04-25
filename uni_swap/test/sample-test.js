const { BigNumber } = require("@ethersproject/bignumber");
const { expect } = require("chai");
const { ethers } = require("hardhat");

// const IERC20ABI = ("../artifacts/contracts/interfaces/IERC20.sol/IERC20.json");
const ERC20ABI = require("@uniswap/v2-core/build/ERC20.json").abi;

describe("Test Swap", function () {

    const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    const WETHAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
    const my_address = "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B";
    const DAIHolder = "0x5d38b4e4783e34e2301a2a36c39a03c45798c4dd";
    let TestSwapContract;

    const AMOUNT_IN = 1000000;
    const AMOUNT_OUT_MIN = 1;
    const TO = my_address;

    beforeEach(async () => {
        const TestSwapFactory = await ethers.getContractFactory("testSwap");
        TestSwapContract = await TestSwapFactory.deploy();
        await TestSwapContract.deployed();

    })

    it("should swap", async () => {
        // impersonate acc
        await hre.network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [DAIHolder],
        });
        // deadline
        // const blockNumBefore = await ethers.provider.getBlockNumber();
        // const blockBefore = await ethers.provider.getBlock(blockNumBefore);
        // const timestampBefore = blockBefore.timestamp;
        // // const DEADLINE = timestampBefore + 1200;
        // await ethers.provider.send('evm_increaseTime', [120]);
        // const blockNumAfter = await ethers.provider.getBlockNumber();
        // const blockAfter = await ethers.provider.getBlock(blockNumAfter);
        // const timestampAfter = blockAfter.timestamp
        // const DEADLINE = timestampAfter


        // DAI contract
        const impersonateSigner = await ethers.getSigner(DAIHolder);
        const DaiAddressContract = new ethers.Contract(DAIAddress, ERC20ABI, impersonateSigner)
        const TokenInBal = await DaiAddressContract.balanceOf(impersonateSigner.address)
        await DaiAddressContract.approve(TestSwapContract.address, AMOUNT_IN)
        const SwapBal_Init = await DaiAddressContract.balanceOf(TO);
        const IntSwap = ethers.utils.formatUnits(SwapBal_Init)
        console.log(IntSwap, "initially")

        await TestSwapContract.connect(impersonateSigner).swap(
            DAIAddress,
            WETHAddress,
            AMOUNT_IN,
            AMOUNT_OUT_MIN,
            TO,
        )

        const TokenInBal_2 = await DaiAddressContract.balanceOf(impersonateSigner.address)
        const SwapBal = await DaiAddressContract.balanceOf(TO);
        const IntSwapBal = ethers.utils.formatUnits(SwapBal)
        console.log(`Swapped balance: ${IntSwapBal}`)
        expect(TokenInBal.gt(TokenInBal_2)).to.be.true;
    })
})
