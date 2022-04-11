const { ethers } = require("hardhat");
require('dotenv').config();

async function main() {
    const NFT = await ethers.getContractFactory("NFT");
    const deployedNFT = await NFT.deploy();
    console.log(`Contract deployed to address: ${deployedNFT.address}`)
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});