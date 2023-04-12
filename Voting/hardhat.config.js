require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require('hardhat-deploy');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  defaultNetwork:"hardhat",
  networks: {
    buildbear: {
      url: "https://rpc.dev.buildbear.io/Previous_Wedge_Antilles_6d9263d2",
    },
  },
  namedAccounts: {
    deployer: 0
  },
  etherscan: {
    apiKey: {
      buildbear: "test1",
    },
    customChains: [
      {
        network: "buildbear",
        chainId: 1,
        urls: {
          apiURL:
            "https://rpc.buildbear.io/verify/etherscan/Previous_Wedge_Antilles_6d9263d2",
          browserURL: "https://explorer.buildbear.io/Previous_Wedge_Antilles_6d9263d2",
        },
      },
    ],
  },
};
