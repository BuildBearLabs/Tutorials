const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function deploy() {
  [account] = await ethers.getSigners();
  deployerAddress = account.address;
  console.log(`Deploying contracts using ${deployerAddress}`);
  const uniswapexample = await ethers.getContractFactory("PoolManager");
  const uniswapexampleInstance = await uniswapexample.deploy(10000000000000);
  await uniswapexampleInstance.deployed();
  console.log("contract deployed at", uniswapexampleInstance.address);

  await run(`verify:verify`, {
    address: uniswapexampleInstance.address,
    constructorArguments: [1000000000000],
  });

  fs.writeFileSync(
    path.join(__dirname, "./address.json"),
    JSON.stringify({ address: uniswapexampleInstance.address })
  );
}

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });