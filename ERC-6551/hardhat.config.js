require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require('hardhat-deploy');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: '0.8.16',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.8.4',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.8.9',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.8.13',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  defaultNetwork: "buildbear",
  networks: {
    buildbear: {
      url:  //rpc Url from BuildBear Dashboard
    }
  },
  namedAccounts: {
    deployer: 0
  },
  etherscan: {  // copy the Etherscan object from the verify Contracts secion on Dashboard 
    apiKey: {
      buildbear: "verifyContract",
    },
    customChains: [
      {
        network: "buildbear",
        chainId: 1,
        urls: {
          apiURL: "https://rpc.buildbear.io/verify/etherscan/grotesque-palpatine-970c2c15",
          browserURL: "https://explorer.buildbear.io/grotesque-palpatine-970c2c15",
        },
      },
    ],
  },
};
