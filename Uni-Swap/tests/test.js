const { BigNumber } = require("@ethersproject/bignumber");
const { expect } = require("chai");
const { ethers } = require("hardhat");

const V2FactoryABI = require("../artifacts/contracts/Assignment.sol/V2Factory.json").abi; 
const pairContractABI = require("../artifacts/contracts/Assignment.sol/pairContract.json").abi;
const routerContractABI = require("../artifacts/contracts/interfaces/IUniswapV2Router02.sol/IUniswapV2Router02.json").abi;


const ERC20ABI = require("@uniswap/v2-core/build/ERC20.json").abi;

describe("Basic Swap", function () {
  let signers;
  let AssignmentContract;
  let uniFactory;
  let sushiFactory;
  
  const sushiswapFactoryAddress = "0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac";
  const uniswapV2FactoryAddress = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";
  const uniswapV2RouterAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
  const sushiswapV2RouterAddress = "0xd9e1ce17f2641f24ae83637ab66a2cca9c378b9f";
  const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  const WETH9Address = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
  const DAIHolder = "0x93c08a3168fc469f3fc165cd3a471d19a37ca19e";

  let tokenInQty = BigNumber.from("4300000000000000000000");


  beforeEach(async () => {
    signers = await ethers.getSigners();
    let AssignmentFactory = await ethers.getContractFactory("Assignment");
    AssignmentContract = await AssignmentFactory.deploy();
    await AssignmentContract.deployed();
    uniFactory = new ethers.Contract(uniswapV2FactoryAddress, V2FactoryABI, signers[0]);
    sushiFactory = new ethers.Contract(sushiswapFactoryAddress, V2FactoryABI, signers[0]);
  })

  it("getting quote", async function () {
    const daiWethUniPairContractAddress = await uniFactory.getPair(DAIAddress, WETH9Address);
    const daiWethSushiPairContractAddress = await sushiFactory.getPair(DAIAddress, WETH9Address);
    const uniPairContract = new ethers.Contract(daiWethUniPairContractAddress, pairContractABI, signers[0]);
    const sushiPairContract = new ethers.Contract(daiWethSushiPairContractAddress, pairContractABI, signers[0]);
    const uniReserves = await uniPairContract.getReserves();
    const sushiReserves = await sushiPairContract.getReserves();
    const uniRouter = new ethers.Contract(uniswapV2RouterAddress, routerContractABI, signers[0]);
    const sushiRouter = new ethers.Contract(sushiswapV2RouterAddress, routerContractABI, signers[0]);
    const uniPrice = await uniRouter.quote(tokenInQty, uniReserves._reserve0, uniReserves._reserve1);
    const sushiPrice = await sushiRouter.quote(tokenInQty, sushiReserves._reserve0, sushiReserves._reserve1);
    const quote = await AssignmentContract.callStatic.getQuote(
      DAIAddress, WETH9Address, tokenInQty);
    if (uniPrice.gt(sushiPrice)) {
      expect(quote.isUniBetter).to.be.true;
      expect((quote.tokenOutQty).eq(uniPrice)).to.be.true;
    } else {
      expect(quote.isUniBetter).to.be.false;
      expect((quote.tokenOutQty).eq(sushiPrice)).to.be.true;
    }
  });

  it("simple swap tokens with tokens", async function () {
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [DAIHolder],
    });
    const mockedSigner = await ethers.getSigner(DAIHolder);
    const DAIContract = new ethers.Contract(DAIAddress, ERC20ABI, mockedSigner);
    const balance = await DAIContract.connect(mockedSigner).balanceOf(DAIHolder);
    await DAIContract.connect(mockedSigner).approve(AssignmentContract.address, balance);
    const WETHContract = new ethers.Contract(WETH9Address, ERC20ABI, mockedSigner);
    const wethBal_1 = await WETHContract.balanceOf(mockedSigner.address);
    const latest_blockTimeStamp = (await ethers.provider.getBlock()).timestamp;
    const param_timestamp = (BigNumber.from(latest_blockTimeStamp)).add(1000);
    try {
      const tx = await AssignmentContract.connect(mockedSigner).swapExactTokensForTokens(
        DAIAddress,
        WETH9Address,
        tokenInQty,
        param_timestamp,
        BigNumber.from("50")
      )  
    } catch (error) {
      if ((String(error)).includes("INSUFFICIENT_OUTPUT_AMOUNT")) throw Error ("increase slippage, current slippage too low")
    }
    const wethBal_2 = await WETHContract.balanceOf(mockedSigner.address);
    expect(wethBal_2.gt(wethBal_1)).to.be.true;
  });
});