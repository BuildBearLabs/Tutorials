
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {


  const Attacker = await hre.ethers.getContractFactory("Attacker");
  const attacker = await Attacker.deploy('0x064C7aA6A83ec1F2D71AbCA5A8f0eAf7D5DdF63F');

  await attacker.deployed();

  console.log(
    "attacker contract deployed to:", attacker.address
  );
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
