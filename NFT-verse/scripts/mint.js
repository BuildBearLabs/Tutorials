require('dotenv').config();
require('@nomiclabs/hardhat-ethers');

// var representing contract's ABI 
// ABI enables our script to interact with smart contract
const contract = require('../artifacts/contracts/NFT.sol/NFT.json');
const contractInterface = contract.abi;