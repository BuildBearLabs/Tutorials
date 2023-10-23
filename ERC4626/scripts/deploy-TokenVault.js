const { ethers } = require("hardhat");
const ERC20ABI = require("./ERC20ABI.json");

// Deploy function
async function deploy() {
  [account] = await ethers.getSigners();
  deployerAddress = account.address;
  console.log(`Deploying contracts using ${deployerAddress}`);
  const tokenVault = await ethers.getContractFactory("TokenVault");
  const tokenVaultInstance = await tokenVault.deploy(
    "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "BuildBear",
    "BB"
  );
  await tokenVaultInstance.deployed();
  console.log("TokenVault contract deployed at", tokenVaultInstance.address);
  console.log(
    "1000 share token is equal to ",
    1000 / Number(await tokenVaultInstance.convertToShares(1)),
    "Asset"
  );
  const weth = new ethers.Contract(
    "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    ERC20ABI,
    account
  );
  console.log("Minting 1000 weth tokens");
  const test = await weth.deposit({ value: ethers.utils.parseEther("1000") });
  console.log("Approving  1000 weth tokens to TokenVault");
  const aaprove = await weth.approve(tokenVaultInstance.address, 1000);
  console.log("Depositing 1000 weth tokens to TokenVault");
  const dd = await tokenVaultInstance._deposit(1000);
  console.log("Lending the 1000 weth users Tokens on Aave pool");
  const invest = await tokenVaultInstance.lendOnAave(
    "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2",
    1000
  );
  console.log("Advancing Time for 1 Year");
  await ethers.provider.send("hardhat_mine", ["0x4AA25C2"]);
  console.log("Withdrawing the weth token from Aave contract");
  const withdraw = await tokenVaultInstance.withdrawFromAave(
    "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2"
  );
  console.log(
    "1000 share token is equal to ",
    1000 / Number(await tokenVaultInstance.convertToShares(1)),
    "Asset"
  );
}

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
