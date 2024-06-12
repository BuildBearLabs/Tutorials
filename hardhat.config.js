const { defaultAccounts } = require('ethereum-waffle');
const { network } = require('chai');

///**@type import('hardhat/config').HardhatUserConfig*/
module.exports= {
  solidity: {
    version: "0.8.0",
  }
  ,networks: {
    //hardhat: {},
    buildbear: {
      url: "https://rpc.buildbear.io/reliable-nute-gunray-bd316bf1",

    }
  },
  etherscan: {
    apiKey: {
      buildbear: "verifyContract",
    },
    customChains: [
      {
        network: "buildbear",
        chainId: 12512,
        urls: {
          apiURL: "https://rpc.buildbear.io/verify/etherscan/reliable-nute-gunray-bd316bf1",
          browserURL: "https://explorer.buildbear.io/reliable-nute-gunray-bd316bf1",
        },
      },
    ],
  }
}

