/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const fs = require('fs');
const path = require('path');
const { BB_RPC_URL } = require('./constants');
require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-etherscan');
require('@nomicfoundation/hardhat-chai-matchers');


let bbNodes;
try {
  bbNodes = JSON.parse(
    fs.readFileSync(path.join(__dirname, './nodes.json')).toString().trim()
  );
} catch { }

module.exports = {
  defaultNetwork: bbNodes[0] ? 'buildbear1' : 'localhost',

  networks: {
    hardhat: {},
    buildbear1: {
      url: `${BB_RPC_URL}/${bbNodes[0] && bbNodes[0].nodeId ? bbNodes[0].nodeId : ''
        }`,
    },
    buildbear2: {
      url: `${BB_RPC_URL}/${bbNodes[1] && bbNodes[1].nodeId ? bbNodes[1].nodeId : ''
        }`,
    },
    buildbear3: {
      url: `${BB_RPC_URL}/${bbNodes[2] && bbNodes[2].nodeId ? bbNodes[2].nodeId : ''
        }`,
    },
    buildbear4: {
      url: `${BB_RPC_URL}/${bbNodes[3] && bbNodes[3].nodeId ? bbNodes[3].nodeId : ''
        }`,
    },
    buildbear5: {
      url: `${BB_RPC_URL}/${bbNodes[4] && bbNodes[4].nodeId ? bbNodes[4].nodeId : ''
        }`,
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.8.16',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.8.4',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.8.9',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.5.0',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.8.13',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.5.5',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  etherscan: {
    //Insert the values from the buildbear dashboard
  },
  paths: {
    sources: './contracts',
    cache: './cache',
    artifacts: './artifacts',
  },
  mocha: {
    timeout: 20000000000,
  },
};
