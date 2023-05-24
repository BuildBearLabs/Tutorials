const hre = require("hardhat");

const RentNFTAddress = require("../deployments/buildbear/RentableNFT.json").address;
const DAY = 1 * 24 * 60 * 60;
async function main() {
  const [owner, addr1, addr2] = await ethers.getSigners();
  const rentableNFT = await hre.ethers.getContractAt("RentableNFT", RentNFTAddress);
  console.log("Minting NFT");
  const mintTxReceipt = await rentableNFT.nftMint();
  mintTxReceipt.wait();
  const nftid = await rentableNFT.totalSupply();
  console.log("Minted NFT id: ", nftid.toString());
  const currentBlock = await ethers.provider.getBlockNumber();
  const rent_expire_time = (await ethers.provider.getBlock(currentBlock)).timestamp + DAY;
  console.log("Renting NFT", nftid.toString(), "to", addr1.address, "for 1 Day");
  const approvalTx = await rentableNFT.setUser(nftid, addr1.address, rent_expire_time, { "from": owner.address })
  await approvalTx.wait();
  console.log("NFT", nftid.toString(), "Rented to", await rentableNFT.userOf(nftid), "Successfuly for 1 Day");

}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
