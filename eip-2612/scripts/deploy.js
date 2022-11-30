const hre = require("hardhat");


async function main() {
  const ERC20 = await hre.ethers.getContractFactory("token");
  const ERC20permit = await ERC20.deploy();

  await ERC20permit.deployed();
  console.log("ERC20 Contract has been deployed at ", ERC20permit.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
