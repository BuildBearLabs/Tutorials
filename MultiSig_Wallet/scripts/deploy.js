// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

const owners = ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", "0x889A3Ce9F119fA4b0e91172B25C7eE71A328B4F4", "0xC300720FF01E8F6c154dC4C3F2e4A4D297bCd325"];

async function main() {
  const MultiSig_Wallet = await hre.ethers.getContractFactory("multisig");
  const multisig = await MultiSig_Wallet.deploy(owners, 2);

  await multisig.deployed();
  console.log("MultiSig Wallet Contract has been deployed at ", multisig.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
