Let us see how we can integrate foundry into the hardhat project, for that we will be using **Hardhat x BuildBear** repository which lets you create your own private testnet, forked from the mainnet, with your own Native and ERC20 Token faucet and blockchain Explorer

**Note**: Make sure the foundry and hardhat are installed in your system.

- Fork and clone the **[Hardhat x BuildBear](https://github.com/BuildBearLabs/Hardhat-BuildBear)** repository.

```jsx
git clone <Paste the URL>
cd Hardhat-BuildBear
git init
npm install
```

- Add the following to the Hardhat Config file

```jsx
require("@nomicfoundation/hardhat-foundry");
```

- To initialize the foundry into your project, run the command

```jsx
npx hardhat init-foundry
```

- Create your private testnet and after the testnet is live the details of the sandbox will be stored in `testnet.json` file

```jsx
npm run createTestnet
```

```jsx
npx hardhat run scripts/deploy-greeter.js
```

After successful deployment, click on the explorer link to interact with the contract.
