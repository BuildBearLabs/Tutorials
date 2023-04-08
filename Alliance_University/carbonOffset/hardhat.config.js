/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('dotenv').config();
require('hardhat-deploy');
require('@nomiclabs/hardhat-ethers')
require('@nomiclabs/hardhat-waffle')
require('@nomiclabs/hardhat-etherscan')
const {API_URL, PRIVATE_KEY} = process.env;
module.exports = {
  solidity: "0.8.9",
  networks: {
    hardhat: {},
    "mumbai-matic": {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: '',
  }
}