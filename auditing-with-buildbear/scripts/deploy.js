
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {


  const LendingPool = await hre.ethers.getContractFactory("LenderPool");
  const lenderPool = await LendingPool.deploy();

  await lenderPool.deployed();

  console.log(
    "Lender Pool contract deployed to:", lenderPool.address
  );
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
