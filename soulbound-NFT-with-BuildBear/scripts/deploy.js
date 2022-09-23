const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  const Soulbound = await hre.ethers.getContractFactory("Soulbound");
  const soulbound = await Staking.deploy();

  await soulbound.deployed();

  console.log(
    "Soulbound contract deployed to:", soulbound.address
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});