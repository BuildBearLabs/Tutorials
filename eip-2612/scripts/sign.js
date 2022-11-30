const hre = require("hardhat");
const { ethers } = require("ethers");

const deployedContractAddress = "0x563e58726B6eDa7bfC1e13F645af4D1C11DAC702";
const value = 1000;
const nonce = 0;
const deadline = "2661766724";

async function main() {
  const signers = await hre.ethers.getSigners();
  const spenderSigner = signers[0];
  const ownerSigner = signers[1];
  console.log(signers);

  
  const ERC20Contract = await hre.ethers.getContractAt("token", deployedContractAddress, spenderSigner);

  const domainName = "BuildBear" // put your token name 
  const domainVersion = "1" 
  const chainId = 8430 // this is the chain ID of the chain you are using
  const contractAddress = deployedContractAddress

  const domain = {
    name: domainName,
    version: domainVersion,
    verifyingContract: contractAddress,
    chainId
  }

  const types = {
    Permit: [
      {
        name: 'owner',
        type: 'address',
      },
      {
        name: 'spender',
        type: 'address',
      },
      {
        name: 'value',
        type: 'uint256',
      },
      {
        name: 'nonce',
        type: 'uint256',
      },
      {
        name: 'deadline',
        type: 'uint256',
      },
    ]
  }

  const values = {
    owner: ownerSigner.address,
    spender: spenderSigner.address,
    value: value,
    nonce: nonce,
    deadline: deadline
  }

  const signature = await ownerSigner._signTypedData(domain, types, values);

  const splitSig = (signature) => {
    // splits the signature to r, s, and v values.
    const pureSig = signature.replace("0x", "")

    const r = new Buffer.from(pureSig.substring(0, 64), 'hex')
    const s = new Buffer.from(pureSig.substring(64, 128), 'hex')
    const v = new Buffer.from((parseInt(pureSig.substring(128, 130), 16)).toString());
    console.log(`r: 0x${r.toString('hex')}, s: 0x${s.toString('hex')}, v: ${v}`)  
  }

  splitSig(signature);
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
