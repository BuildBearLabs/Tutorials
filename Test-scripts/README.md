# This repository, contains TestScripts and deployment scripts for following contracts:
- Gameitem
- Greeter
- Simplestorage
- token
- Artwork

### To start using this repository, simply clone it or download the zip file. Once downloaded, run `npm install` to install all the necessary packages.

### To get your own Testnet head [builbear](https://buildbear.io/)
- Create a Testnet on BuildBear
- Copy the RPC and explorer link and add to the hardhat.config.js file
- Click on open Faucet ,connect you wallet and mint Native tokens. 
- Copy the Private key from the MetaMask and add in Hardhat.config.js file 

### To deploy all the contracts, run `npx hardhat run scripts/deployAll.js --network buildbear`.

### To run all the TestScripts, use the command `npx hardhat test`.

