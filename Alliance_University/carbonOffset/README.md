# Smart Contract for Carbon Offset.
By [`deekshithpranav`](https://github.com/deekshithpranav)

**There are two smart contracts:**
1. carbonToken.sol
2. regulator.sol

**The smart contract that seeks to address the issue of environmental degradation caused by pollution. It is a simple yet impactful solution designed to tackle this pressing challenge.**

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

For swapping the tokens we can use the UniswapPool interface where we have to connect our wallet with which the carbon token holder contract was created so that the balance will be shown and we can also add the liquidity to the pool setting our price for the token swap. This way anybody can buy the tokens using the address.
But if you don't want the interface we can manually implement the token swap function in the solidity files by using the openzeppelin functions transferFrom and transfer so the transaction ends without any fraud.
[a pervious file named UniswapPool.js was present to add the carbon token to the network but it caused some error while adding liquidity, so the above method has been considered to ensure a complete deliverable.]

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
```
To interact with the contract connect to web3 with the role-specific address.

### Warning
In the interest of ensuring the success of this project, I would greatly appreciate any feedback regarding potential errors or issues that may arise.
