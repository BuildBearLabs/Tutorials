require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    buildbear: {
      url: "https://rpc.buildbear.io/Previous_Wedge_Antilles_6d9263d2",
    },
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
