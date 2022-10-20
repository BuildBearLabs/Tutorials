const {expect, assert} = require("chai");
const {BigNumber} = require("ethers");
const {ethers, waffle, artifacts} = require("hardhat");
const hre = require("hardhat");

const {DAI, DAI_WHALE, POOL_ADDRESS_PROVIDER} = require("../constants");

describe("Deploy a Flash Loan", function () {
  it("Should take a flash loan and be able to return it", async function () {
    const flashLoanExample = await ethers.getContractFactory(
      "FlashLoanExample"
    );

    const _flashLoanExample = await flashLoanExample.deploy(
      // Address of the PoolAddressProvider: you can find it here: https://docs.aave.com/developers/deployed-contracts/v3-mainnet/polygon
      POOL_ADDRESS_PROVIDER
    );
    await _flashLoanExample.deployed();

    // using Hardhat's extended ethers version, we call the function getContractAt to get the instance of DAI deployed
    // on Polygon Mainnet. Remember Hardhat will simulate Polygon Mainnet, so when you get the contract at the address
    // of DAI which you had specified in the constants/index.js, Hardhat will actually create an instance of DAI contract
    // which matches that of Polygon Mainnet.
    const token = await ethers.getContractAt("IERC20", DAI);
    const BALANCE_AMOUNT_DAI = ethers.utils.parseEther("2000");

    // Impersonate the DAI_WHALE account to be able to send transactions from that account
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [DAI_WHALE],
    });
    const signer = await ethers.getSigner(DAI_WHALE);

    // Now after that we create a signer for DAI_WHALE so that we can call the simulated DAI contract with the
    // address of DAI_WHALE and transfer some DAI to FlashLoanExample Contract. We need to do this so we can pay
    // off the loan with premium, as we will otherwise not be able to pay the premium. In real world applications,
    // the premium would be paid off the profits made from arbitrage or attacking a smart contract.
    await token
      .connect(signer)
      .transfer(_flashLoanExample.address, BALANCE_AMOUNT_DAI); // Sends our contract 2000 DAI from the DAI_WHALE

    const tx = await _flashLoanExample.createFlashLoan(DAI, 1000); // Borrow 1000 DAI in a Flash Loan with no upfront collateral
    await tx.wait();
    const remainingBalance = await token.balanceOf(_flashLoanExample.address); // Check the balance of DAI in the Flash Loan contract afterwards
    expect(remainingBalance.lt(BALANCE_AMOUNT_DAI)).to.be.true; // We must have less than 2000 DAI now, since the premium was paid from our contract's balance
  });
});
