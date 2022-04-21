/**
 * @type import('hardhat/config').HardhatUserConfig
 */

 require('@nomiclabs/hardhat-ethers')
 require('dotenv').config();
 
 const { ALCHEMY_KEY } = process.env
module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
        forking: {
            url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_KEY}`,
            blockNumber: 14608000,
        },
    },
},
};
