/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-etherscan');

// Change private keys accordingly - ONLY FOR DEMOSTRATION PURPOSES - PLEASE STORE PRIVATE KEYS IN A SAFE PLACE
// Export your private key as
//       export PRIVKEY=0x.....


module.exports = {
  defaultNetwork: 'hardhat',

  networks: {
    hardhat: {},
    buildbear: {
      url: "https://rpc.dev.buildbear.io/Tired_Han_Solo_b402f0a0",
      accounts: ["Your private key"],

    },
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/ABBCrqeJjURZ41iDRmGmwnBr8mmdS0FQ",
      accounts: ["Your private key"],
    },
    Sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/8yDK8aSXmvlci6GelXW-JsZBEmPiS6x6",
      accounts: ["Your private key"],
    },
  },
  solidity: {
    compilers: [
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
        version: '0.5.0',
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
      {
        version: '0.5.5',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },

  etherscan: {
    apiKey: {
      buildbear: "5ded353f2a028fdb93ee",
    },
    customChains: [
      {
        network: "buildbear",
        chainId: 8499,
        urls: {
          apiURL:
            "https://rpc.dev.buildbear.io/verify/etherscan/Tired_Han_Solo_b402f0a0",
          browserURL: "https://explorer.dev.buildbear.io/Tired_Han_Solo_b402f0a0",
        },
      },
    ],
  },
  paths: {
    sources: './contracts',
    cache: './cache',
    artifacts: './artifacts',
  },
  mocha: {
    timeout: 20000000000,
  },
};
