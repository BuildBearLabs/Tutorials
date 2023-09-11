// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

const owners = [
  "0x8fCA103AF6b79165943c4F9e40B9beFDAc21aA66",
  "0x7dc989B5cDe34DdDAD27f29f0367fa94C896701A",
  "0x0a712b7ab8910BCc95C35193A3739b55aE7c66e4",
];

async function main() {
  const MultiSig_Wallet = await hre.ethers.getContractFactory(
    "dynamicmultisig"
  );
  const dynamicmultisig = await MultiSig_Wallet.deploy(owners, 2);

  await dynamicmultisig.deployed();

  console.log(
    "Dynamic MultiSig Wallet Contract has been deployed at ",
    dynamicmultisig.address
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
