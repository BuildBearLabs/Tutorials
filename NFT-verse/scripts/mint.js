const hre = require('hardhat');

async function main() {
  const tokenURI = "QmRPYdhsAUuTAYxcrdJYDn9dFNNe7JWmv3tBcumW41q9yW";
  const nftContractFactory = await hre.ethers.getContractFactory("NFT");
  const nftContractInstance = new hre.ethers.Contract(
    "0x33bfac9567f6aded080082079afec0a0f0cdd54e", //insert contract address that gets deployed
    nftContractFactory.interface
  )
  const signer = await hre.ethers.provider.getSigner();
  const signerAddress = await signer.getAddress()
  const estimatedGas = await nftContractInstance.connect(signer).estimateGas.mint(signerAddress, tokenURI);
  console.log(`estimatedGas in Ether is ${hre.ethers.utils.formatUnits(estimatedGas.toString(), "ether")}`);
  console.log(`estimatedGas in Gwei is ${hre.ethers.utils.formatUnits(estimatedGas.toString(), "gwei")}`);
};

main();