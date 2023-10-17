require("dotenv").config();
require("@nomiclabs/hardhat-ethers");

const { RPC_URL, PRIVATE_KEY } = process.env;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    buildbear: {
      url: RPC_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    },
  },
};

