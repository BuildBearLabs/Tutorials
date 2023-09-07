require("@nomiclabs/hardhat-waffle");
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  defaultNetwork:"buildbear",
  // RPC_url : "https://rpc.buildbear.io/few-eeth-koth-23ee20ff",
  networks: {
    buildbear: {
      url: "https://rpc.buildbear.io/few-eeth-koth-23ee20ff" ,
    },
  },
  etherscan: {
    apiKey: {
      buildbear: "verifyContract",
    },
    customChains: [
      {
        network: "buildbear",
        chainId: 10966,
        urls: {
          apiURL: "https://rpc.buildbear.io/verify/etherscan/few-eeth-koth-23ee20ff",
          browserURL: "https://explorer.buildbear.io/few-eeth-koth-23ee20ff",
        },
      },
    ],
  }
};


