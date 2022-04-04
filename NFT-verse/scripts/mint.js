const hre = require('hardhat');

async function main() {
  // tokenURI represents unique identifier of 'token' looks like
  const tokenURI = "QmaVGuuJWQYEAmAEG5UD2BeMR82ZPMjHqadXbAg9ddLEzt";
  // created contract factory of NFT contract
  const nftContractFactory = await hre.ethers.getContractFactory("NFT");
  // contract instance created using contract address, contract's abi
  const nftContractInstance = new hre.ethers.Contract(
    "0x01555d8b14553019E4d4B19b3DAf1C84A6911F7B", //insert contract address that gets deployed
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
  // nftContractInstance.mint(signerAddress, tokenURI)
  // .then(console.log(`Your transaction is confirmed!`))
  
  //     .catch((e) => console.log("something went wrong", e));
};


main();