const { ethers } = require("hardhat");
const fs = require('fs/promises');

const main = async () => {
  const Factory = await ethers.getContractFactory("DeterministicDeployFactory");
  const factoryAddress = (JSON.parse(await fs.readFile('./addresses/address.json'))).factory;
  const factory = await Factory.attach(factoryAddress);
  const HW = await ethers.getContractFactory("HelloWorld");
  const byteCode = HW.bytecode;

  await factory.deployUsingCreate2(byteCode,"buildbear");
  factory.once("Deploy", async (address) => {
    const helloWorldContract = HW.attach(address);
    console.log("hello world contract has been deployed at ", address);
    const greeting = await helloWorldContract.greeting();
    console.log(greeting);
  })
  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});