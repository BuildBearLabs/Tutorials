const hre = require("hardhat");
const { ethers } = require('hardhat');
// importing the json file from ../deployments/buildbear/MainContract.json
const UnilendAddress = require("../deployments/buildbear/Flashloan.json").address;
async function main() {

    const [deployer, account2] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const Flashloan = await hre.ethers.getContractAt("Flashloan", UnilendAddress);
   
    const flashloantx= await Flashloan.flashloan("0xeD43f81C17976372Fcb5786Dd214572e7dbB92c7", 100);
    flashloantx.wait();
    console.log(flashloantx);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
