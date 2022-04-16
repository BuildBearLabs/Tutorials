/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.7.3",
  networks: {
    hardhat: {
        forking: {
            url:'https://eth-mainnet.alchemyapi.io/v2/j4mtMyHHXPxOy8_D6hswF2Z7VGnI2Bno',
            blockNumber: 12505760,
        },
        chainId: 1,
    },
},
};
