const hre = require('hardhat');

async function main() {
  // tokenURI represents unique identifier of 'token' looks like
  const tokenURI = "QmRPYdhsAUuTAYxcrdJYDn9dFNNe7JWmv3tBcumW41q9yW";
  // created contract factory of NFT contract
  const nftContractFactory = await hre.ethers.getContractFactory("NFT");
  // contract instance created using contract address, contract's abi
  const nftContractInstance = new hre.ethers.Contract(
    "0x33bfac9567f6aded080082079afec0a0f0cdd54e", //insert contract address that gets deployed
    nftContractFactory.interface,
    nftContractFactory.signer
   
  )
  const signer = await hre.ethers.provider.getSigner();
  const signerAddress = await signer.getAddress()
  const estimatedGas = await nftContractInstance.connect(signer).estimateGas.mint(signerAddress, tokenURI);
  console.log(`estimatedGas in Ether is ${hre.ethers.utils.formatUnits(estimatedGas.toString(), "ether")}`);
  console.log(`estimatedGas in Gwei is ${hre.ethers.utils.formatUnits(estimatedGas.toString(), "gwei")}`);
  
  nftContractInstance.mint(signerAddress, tokenURI)
  .then(console.log(`Your transaction is confirmed!`))
  
      .catch((e) => console.log("something went wrong", e));
};


main();