require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    localganache: {
      url: "HTTP://127.0.0.1:7545",
      accounts: ["0x82f6fc957142a47acb231a830bc4e0d06a30bb9eac6db9debaa2005ee5e8f206"]
    },
    hardhat: {},
    buildbear: {
      url: "https://rpc.buildbear.io/Xenophobic_Eeth_Koth_546d53b5",
    },
  },

  etherscan: {
    apiKey: {
      buildbear: "verifyContract",
    },
    customChains: [
      {
        network: "buildbear",
        chainId: 8654,
        urls: {
          apiURL: "https://rpc.buildbear.io/verify/etherscan/Xenophobic_Eeth_Koth_546d53b5",
          browserURL: "https://explorer.buildbear.io/Xenophobic_Eeth_Koth_546d53b5",
        },
      },
    ],
  },
};
