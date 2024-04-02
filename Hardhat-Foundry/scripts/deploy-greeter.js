const { ethers } = require("hardhat");

// Deploy function
async function deploy() {
  [account] = await ethers.getSigners();
  deployerAddress = account.address;
  console.log(`Deploying contracts using ${deployerAddress}`);
  const greeter = await ethers.getContractFactory("Greeter");
  const greeterInstance = await greeter.deploy();
  await greeterInstance.deployed();
  console.log("contract deployed at", greeterInstance.address);

  await run(`verify:verify`, {
    address: greeterInstance.address,
  });
}

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
