require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.10",
  networks: {
    mainnet: {
      url: process.env.BUILDBEAR_MAINNET_KEY,
    },
  }
};
