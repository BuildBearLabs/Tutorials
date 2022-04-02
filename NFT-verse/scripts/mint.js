require('dotenv').config();
require('@nomiclabs/hardhat-ethers');

const { ethers } = require('hardhat');
// var representing contract's ABI 
// ABI enables our script to interact with smart contract
const contract = require('../artifacts/contracts/NFT.sol/NFT.json');
const contractInterface = contract.abi;

let provider = ethers.provider;


const tokenURI = "QmRPYdhsAUuTAYxcrdJYDn9dFNNe7JWmv3tBcumW41q9yW";
const privateKey = `0x${process.env.PRIVATE_KEY}`;
const wallet = new ethers.Wallet(privateKey);
const signer = wallet.connect(provider);


const nft = new ethers.Contract(
    process.env.CONTRACT_ADDRESS,
    contractInterface,
    signer
  );
  
  const main = () => {
    console.log("Waiting 5 blocks for confirmation...");
    nft
      .mint(process.env.PUBLIC_KEY, tokenURI)
      .then((tx) => tx.wait(5))
      .then((receipt) => console.log(`Your transaction is confirmed, its receipt is: ${receipt.transactionHash}`))
  
      .catch((e) => console.log("something went wrong", e));
  };
  
  main();