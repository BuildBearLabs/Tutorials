# Learnweb3.io - Flash Loans

Example to check how we can start a flash loan. Note we wont be actually doing an arbitrage here, because finding profitable arbitrage opportunities is the hardest part and not related to the code, but will esssentially just learn how to execute a flash loan.

We use a feature of Hardhat known as Mainnet Forking which can simulate having the same state as mainnet, but it will work as a local development network. That way you can interact with deployed protocols and test complex interactions locally.

```javascript
module.exports = {
  solidity: "0.8.10",
  networks: {
    hardhat: {
      forking: {
        url: ALCHEMY_API_KEY_URL,
      },
    },
  },
};
```

Since we are not actually executing any arbitrage, and therefore will not be able to pay the premium if we run the contract as-is, we use another Hardhat feature called impersonation that lets us send transactions on behalf of any address, even without their private key. However, of course, this only works on the local development network and not on real networks. Using impersonation, we will steal some DAI from the DAI_WHALE so we have enough DAI to pay back the loan with premium.

```typescript
// Impersonate the DAI_WHALE account to be able to send transactions from that account
await hre.network.provider.request({
  method: "hardhat_impersonateAccount",
  params: [DAI_WHALE],
});
const signer = await ethers.getSigner(DAI_WHALE);
await token
  .connect(signer)
  .transfer(_flashLoanExample.address, BALANCE_AMOUNT_DAI); // Sends our contract 2000 DAI from the DAI_WHALE
```
