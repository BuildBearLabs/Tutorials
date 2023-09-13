const hre = require("hardhat");

async function main() {
    const SocialMedia = await hre.ethers.getContractFactory("SocialMedia");
    const socialMedia = await SocialMedia.deploy();
  
    await socialMedia.deployed();
  
    console.log("SocialMedia deployed to:", socialMedia.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });