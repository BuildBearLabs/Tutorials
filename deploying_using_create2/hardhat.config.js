require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
const {
  API_URL_URL1,
  API_URL_URL2,
  PRIVATE_KEY,
} = process.env;


module.exports = {
  solidity: "0.8.9",
  networks: {
    buildBear_polygonfork: {
      url: API_URL_URL1,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    buildBear_mainnetfork: {
      url: API_URL_URL2,
      accounts: [`0x${PRIVATE_KEY}`],
    }
  },
};

