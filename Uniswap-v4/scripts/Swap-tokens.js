const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function deploy() {
  [account] = await ethers.getSigners();
  deployerAddress = account.address;
  console.log(`Deploying contracts using ${deployerAddress}`);
  const swapexample = await ethers.getContractFactory("PoolSwapTest");
  const swapexampleInstance = await swapexample.deploy('0xB78268C0E401Cc5Eedf41a8eF9818C638f9cF784');
  await swapexampleInstance.deployed();
  console.log("swap contract deployed at", swapexampleInstance.address);

  await run(`verify:verify`, {
    address: swapexampleInstance.address,
    constructorArguments: ['0xB78268C0E401Cc5Eedf41a8eF9818C638f9cF784'],
  });

  fs.writeFileSync(
    path.join(__dirname, "./address.json"),
    JSON.stringify({ address: swapexampleInstance.address })
  );
}

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });