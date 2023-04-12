const hre = require("hardhat");

async function main() {

  const Maincontract = await hre.ethers.getContractFactory("MainContract");
  const maincontract = await Maincontract.deploy();
  await maincontract.deployed();

  // await run(`verify:verify`, {
  //   address: maincontract.address,
  // });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});