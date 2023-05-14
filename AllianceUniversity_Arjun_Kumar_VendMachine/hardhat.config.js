require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    hardhat: {},
    buildbear: {
      url: "[Enter you RPC URL]"
    }
  },

  etherscan: {
    apiKey: {
      buildbear: "verifyContract"
    },
    customChains: [
      {
        network: "buildbear",
        chainId: 8654,
        urls: {
          apiURL: "https://rpc.buildbear.io/verify/etherscan/Xenophobic_Eeth_Koth_546d53b5",
          browserURL: "https://explorer.buildbear.io/Xenophobic_Eeth_Koth_546d53b5"
        }
      }
    ]
  }
};
