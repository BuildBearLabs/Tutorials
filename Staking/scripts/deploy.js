
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {


  const Staking = await hre.ethers.getContractFactory("Staking");
  const staking = await Staking.deploy({value: ethers.utils.parseEther('10')});

  await staking.deployed();

  console.log(
    "Staking contract deployed to:", staking.address
  );
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
