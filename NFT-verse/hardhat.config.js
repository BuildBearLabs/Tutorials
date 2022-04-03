/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('dotenv').config();
require('@nomiclabs/hardhat-ethers')

const {API_URL, PRIVATE_KEY} = process.env;

module.exports = {
  solidity: "0.8.1",
  networks: {
    hardhat: {},
    "ropsten": {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    'truffle': {
      url: "http://localhost:24012/rpc"
    }

  }
}