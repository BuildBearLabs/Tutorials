require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.0",
  networks: {
    buildbear: {
      url: "https://rpc.buildbear.io/shocked-mystique-963771ae",
      accounts: [process.env.privatekey]
    }
  }
};
