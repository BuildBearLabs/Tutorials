const { ethers } = require("hardhat");
const fs = require('fs/promises');

const main = async () => {
  const Factory = await ethers.getContractFactory("DeterministicDeployFactory");
  const factory = await Factory.deploy();
  await factory.deployed();
  const factoryAddress = factory.address
  const addressObject = {
    factory: factoryAddress
  }
  await fs.writeFile('./addresses/address.json', JSON.stringify(addressObject));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});