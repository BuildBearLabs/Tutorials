const hre = require("hardhat");

const MarketplaceAddress = require("../deployments/buildbear/Marketplace.json").address;
const basicNFTAddress = require("../deployments/buildbear/BasicNft.json").address;
const PRICE = ethers.utils.parseEther("1");
const listing_price = ethers.utils.parseEther("0.0001");
async function main() {

  const basicNFT = await hre.ethers.getContractAt("BasicNft", basicNFTAddress);
  console.log("Minting NFT");
  const mintTxReceipt = await basicNFT.mintNft();
  mintTxReceipt.wait();
  const tokenid = 0;
  console.log("Minted NFT with tokenId: ", tokenid);

  console.log("Approving NFT to marketplace contract");
  const approvalTx = await basicNFT.approve(MarketplaceAddress, tokenId)
  await approvalTx.wait(1);
  console.log("listing NFT on marketplace contract");

  const marketplace = await hre.ethers.getContractAt("Marketplace", MarketplaceAddress);
  const createListingTx = await marketplace.listNft(basicNFTAddress, tokenId, PRICE, { value: listing_price });
  await createListingTx.wait(1);
  console.log("NFT Listed on marketplace");

}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
