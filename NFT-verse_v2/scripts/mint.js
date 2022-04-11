const hre = require('hardhat');

async function main() {
  const tokenURI = "https://gateway.pinata.cloud/ipfs/Qmc4ywZjPsHAb67PVNPjRpjKgcqEAhxwy1FzkdPHoo5e4h"; 
	// this is URL that you will get from Pinata

  const nftContractFactory = await ethers.getContractFactory("NFT");
  const nftContractInstance = new ethers.Contract(
    "0x4D89D079aCfef45b7cDA107533A89d5c44DCFb94", //insert contract address that gets deployed
    nftContractFactory.interface,
  )
  const signer = await ethers.provider.getSigner();
  const signerAddress = await signer.getAddress()
  const txn = await nftContractInstance.connect(signer).mint(signerAddress, tokenURI)
  txn.wait();
  console.log(`Your transaction has been successfully broadcasted! The transaction hash is ${txn.hash}`);
  if (hre.network.config.url != 'http://127.0.0.1:8545') {
    console.log(`\nPlease follow this link https://testnets.opensea.io/${signerAddress}`);
  };
};

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});