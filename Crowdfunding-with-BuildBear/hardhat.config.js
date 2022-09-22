require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.10",
  networks: {
    buildbear: {
      url: "https://backend.buildbear.io/node/affectionate-fermat-d1d223",
      accounts: ['fb65ea61c393dc095494126d2def8a1551ece1045c6780e488336e8175da1f36']
    }
  }
};
