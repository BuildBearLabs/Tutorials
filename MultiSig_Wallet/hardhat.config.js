require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.13",
  networks: {
    buildbear: {
      url: process.env.BUILDBEAR_MAINNET_KEY,
    },
  }
};
