require("@nomiclabs/hardhat-waffle");
require("dotenv").config({path: ".env"});

const BUILDBEAR_API_KEY_URL = process.env.BUILDBEAR_API_KEY_URL;
const Mainnet_API_KEY = process.env.Mainnet_API_KEY;
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.10",
  networks: {
    hardhat: {
      forking: {
        url: Mainnet_API_KEY,
      },
    },
    buildbear: {
      url: BUILDBEAR_API_KEY_URL
    }
  },
};
