const hre = require('hardhat');

async function main() {
  // tokenURI represents unique identifier of 'token' looks like
  const tokenURI = "QmWZQJaPHtpRejG2Wc7KJjp1MFwuCepxa4SJ8fBmoyAEBr";
  // created contract factory of NFT contract
  const nftContractFactory = await hre.ethers.getContractFactory("NFT");
  // contract instance created using contract address, contract's abi
  const nftContractInstance = new hre.ethers.Contract(
    "0xC77c013F751883304023bc7195CAAEED670A8427", //insert contract address that gets deployed
    nftContractFactory.interface,
   
  )
  const signer = await hre.ethers.provider.getSigner();
  const signerAddress = await signer.getAddress()
  // const estimatedGas = await nftContractInstance.connect(signer).estimateGas.mint(signerAddress, tokenURI);
  // console.log(`estimatedGas in Ether is ${hre.ethers.utils.formatUnits(estimatedGas.toString(), "ether")}`);
  // console.log(`estimatedGas in Gwei is ${hre.ethers.utils.formatUnits(estimatedGas.toString(), "gwei")}`);
  nftContractInstance.connect(signer).mint(signerAddress, tokenURI)
  .then((e) => console.log(`Your transaction is confirmed! The transaction hash is ${e.hash}`))
  .catch((e) => console.log("something went wrong", e));
  
};


main();