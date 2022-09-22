require("@nomiclabs/hardhat-waffle");
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.0",
  },
  networks: {
    hardhat: {},
    buildbear: {
      url: 'https://backend.buildbear.io/node/thirsty-einstein-e6514b',
      accounts: [process.env.privatekey]
    }
  }
};
