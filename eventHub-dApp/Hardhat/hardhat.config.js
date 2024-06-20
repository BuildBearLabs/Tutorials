require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

const { ALCHEMY_RPC_URL, PRIVATE_KEY, BUILDBEAR_RPC_URL } = process.env;

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: ALCHEMY_RPC_URL,
      accounts: [PRIVATE_KEY],
    },
    buildbear: {
      url: BUILDBEAR_RPC_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};
