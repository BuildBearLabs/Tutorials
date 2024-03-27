require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-foundry");
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks:{
    buildbear:{
      url: "https://rpc.dev.buildbear.io/literary-starlord-907951ef"
    }
  },
  etherscan: {
    apiKey: {
      buildbear: "verifyContract",
    },
    customChains: [
      {
        network: "buildbear",
        chainId: 1,
        urls: {
          apiURL: "https://rpc.dev.buildbear.io/verify/etherscan/literary-starlord-907951ef",
          browserURL: "https://explorer.dev.buildbear.io/literary-starlord-907951ef",
        },
      },
    ],
  }
};
