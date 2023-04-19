/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const fs = require('fs');
const path = require('path');
const { BB_RPC_URL } = require('./constants');
const { createFork } = require('./forking');
const { deleteNode } = require('./helpers');
require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-etherscan');

// Change private keys accordingly - ONLY FOR DEMOSTRATION PURPOSES - PLEASE STORE PRIVATE KEYS IN A SAFE PLACE
// Export your private key as
//       export PRIVKEY=0x.....

// Modify this config to create a forked testnet in Buildbear
const bbForkConfig = {
  chainId: '1', // provide chainId to choose the forking network, (chainId 1 => Ethereum mainnet)
  // blockNumber: 17073302, // (optional) provide blockNumber to create a fork from the given blockNumber
  // apiKey: 'BB_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // apiKey should be created from your Buildbear dashboard
};

let bbNode;
try {
  bbNode = JSON.parse(
    fs.readFileSync(path.join(__dirname, './nodes.json')).toString().trim()
  );
} catch {}

module.exports = {
  defaultNetwork: bbNode ? 'buildbear' : 'localhost',

  networks: {
    hardhat: {},
    buildbear: {
      url: `${BB_RPC_URL}/${bbNode && bbNode.nodeId ? bbNode.nodeId : ''}`,
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

task('fork-bb', async function () {
  await createFork(bbForkConfig);
});

task('test', async function (taskArguments, hre, runSuper) {
  return runSuper().finally(async () => {
    if (bbNode) await deleteNode(bbNode, bbForkConfig.apiKey);
  });
});
