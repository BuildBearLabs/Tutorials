require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {defaultNetwork: 'buildbear',

networks: {
  hardhat: {},
  buildbear: {
    url: "https://rpc.buildbear.io/Tough_Darth_Maul_b8516ccd",
  },

},
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
    buildbear: "test1",
  },
  customChains: [
    {
      network: "buildbear",
      chainId: 8643,
      urls: {
        apiURL: "https://rpc.buildbear.io/verify/etherscan/Tough_Darth_Maul_b8516ccd",
        browserURL: "https://explorer.buildbear.io/Tough_Darth_Maul_b8516ccd",
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
