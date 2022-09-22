const hre = require('hardhat');

async function main() {

    const Campaign = await hre.ethers.getContractFactory("Campaign")
    const campaignContract = await Campaign.deploy("Campaign for Dogs", 10000000000000, "This campaign will help all the stray dogs by providing them food and shelter", "0xD5142501AE71b570024938370ef197623AF055A1", 3663835457);

    await campaignContract.deployed();

    console.log("Factory deployed to:", campaignContract.address);
}   

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });