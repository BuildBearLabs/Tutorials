const hre = require("hardhat");
const { ethers } = require('hardhat');
// importing the json file from ../deployments/buildbear/MainContract.json
const MarketplaceAddress = require("../deployments/buildbear/Marketplace.json").address;
const basicNFTAddress = require("../deployments/buildbear/BasicNft.json").address;
const PRICE = ethers.utils.parseEther("1"); //price of nft in wei


async function main() {

    const [deployer, account2] = await hre.ethers.getSigners();

    const marketplace = await hre.ethers.getContractAt("Marketplace", MarketplaceAddress);
    console.log("Getting listing for NFT on marketplace");
    const listing = await marketplace.getListedNfts();
    console.log("Buying NFT on marketplace");
    const buy = await marketplace.connect(account2).buyNft(basicNFTAddress, listing[0].tokenId, { value: PRICE });
    await buy.wait(1);
    console.log("Bought NFT on marketplace");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
