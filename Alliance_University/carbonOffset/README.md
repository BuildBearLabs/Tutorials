# Smart Contract for Carbon Offset.
By [`deekshithpranav`](https://github.com/deekshithpranav)

**There are two smart contracts:**
1. carbonToken.sol
2. regulator.sol

### Structure
The overall structure of the smart contract is that there will be a carbonToken holder who will own the tokens which are minted by the
regulator on basis of real-world checklists followed. The regulator should also be able to burn tokens from the account which has 
swapped tokens for other crypto-currency(mumbai-matic) following the real-world checklist (1 carbon token represent 1 metric tonne of 
CO2 and other GHG gases released in environment) (yet to be implemented).

I have used hardhat for the solidity development environment, deployment and verification of contracts.

### Files
The carbonToken.sol file creates a ERC20 token named Carbon Token(CB) using openzeppelin libraries.
It has setup role access control to type Roles so that there is a regulator who can mint tokens, pause, unpause the contract operations.
The functions are setup such only the address who have their roles defined will be able to carry out their operations.

The regulator.sol file has the AccessControl to mint and burn the tokens and also pause and unpause operations.

For the swapping of tokens for some other cryptocurrency the project has uniswap interface as the medium. The createUniswapPool.js file hashave the script to 
create the pool.(**However there is some issue while identifying the carbon token where it shows 0 balance though the tokens are minted in the respective address and the proper contract 
address is provided**) Instead of using uniswap we can implement our own functions to swap tokens using the transferFrom and transfer functions from openzeppelin libraries. (Not done yet)

The arguments.js contains the argument to be provided to the carbonToken.sol contract during verification.

The environment variables file should have
```
API_URL // from alchemy to connect to the testnet
PRIVATE_KEY // of your MetaMask account
POLYGONSCAN_API_KEY // from polygon-mumbai to verify the contract
```
### Deployment
To Deploy the smart contract from your system:

```npm install
npx hardhat compile
npx hardhat run scripts/deploy.js --network mumbai-matic
npx hardhat verify --constructor-args arguments.js CONTRACT_ADDR --network mumbai-matic  //verify the carbonToken.sol contract
npx hardhat verify CONTRACT_ADDR --network mumbai-matic 	// verify the regulator.sol contract
node createUniswapPool.js 		// create a pool
```
To interact with the contract connect to web3 with the role-specific address.

### Warning
There are some error to be resolved in the project! It would be really helpful if anybody can figure out the errors and leave a PR for my learning and project's progress .

