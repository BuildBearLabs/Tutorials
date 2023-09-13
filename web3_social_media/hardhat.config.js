require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.13",
  networks: {
    buildbear: {
      url: "https://rpc.buildbear.io/marxist-rugor-nass-cbb8c77f",
    },
  },
};