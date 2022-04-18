/**
 * @type import('hardhat/config').HardhatUserConfig
 */

//  require('@nomiclabs/hardhat-ethers');
 require('dotenv').config();

const {ALCHEMY_KEY} = process.env
module.exports = {
  solidity: "0.7.3",
  networks: {
    hardhat: {
        forking: {
            url:`https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_KEY}`,
            blockNumber: 12505760,
        },
    },
},
};
