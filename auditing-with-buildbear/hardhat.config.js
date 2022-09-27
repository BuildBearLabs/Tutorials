require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {},
    buildbear: {
      url: 'https://backend.buildbear.io/node/affectionate-fermat-d1d223',
      accounts: [process.env.privatekey]
    }
  }
};
