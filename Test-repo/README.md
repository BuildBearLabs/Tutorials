# This repo is used to Findout the average time that is required to deploy the smart contract on Ethereum Mainnet Fork created by BuildBear.io , Goerli and Sepolia Testnets

The smart contract is deployed 10 times to get the average time of deployment.

```
   deployerAddress = account.address;
    console.log(`Deploying contracts using ${deployerAddress}`);
    console.time();
    for (let i = 0; i < 10; i++) {
        const token = await ethers.getContractFactory('Token');
        const tokenInstance = await token.deploy(
        );
        await tokenInstance.deployed();
    }
    console.log("Time taken to deploy 10 smart contract on Buildbear  in  milliseconds");
    console.timeEnd();
```

# Results of testing 


| Network   | Average time taken for contract deployment |     |     |     |
| --------- | ------------------------------------------ | --- | --- | --- |
| Buildbear | 3.2s                                       |     |     |     |
| Goerli    | 2.3 Minutes                                |     |     |     |
| Seopila   | 13.5s                                      |     |     |     |

<> (This test is performed on 16-03-2023,and with network updates the deployments time may vary in the future)

# commands used


npx hardhat run scripts/deploy.js --network buildbear

npx hardhat run scripts/deploy.js --network Sepolia

npx hardhat run scripts/deploy.js --network goerli
