const axios = require('axios');
const { ethers } = require('ethers');
const { BB_BACKEND_URL, networkData } = require('./constants');
const {
  confirmAndStoreNodeData,
  clearNodesFile,
  getUserDetails,
} = require('./helpers');

const SCAFFOLD_ETH_API_KEY = 'BB_a55d709e-9513-4f81-973a-6681d36e0970';

async function createTestnet(apiKey, createdNodes, aliveNodes) {
  const data = JSON.stringify({
    checked: false,
    allowUnlimitedContractSize: false,
    mining: {
      auto: true,
      interval: 0,
    },
    accounts: {
      // eslint-disable-next-line object-shorthand
      mnemonic: ethers.Wallet.createRandom().mnemonic.phrase,
    },
    options: {
      hardhat: {
        getStackTraceFailuresCount: true,
        addCompilationResult: true,
        impersonateAccount: true,
        intervalMine: false,
        getAutomine: false,
        stopImpersonatingAccount: true,
        reset: false,
        setLoggingEnabled: true,
        setMinGasPrice: false,
        dropTransaction: false,
        setBalance: false,
        setCode: false,
        setNonce: false,
        setStorageAt: false,
        setNextBlockBaseFeePerGas: false,
        setCoinbase: false,
        mine: true,
      },
      evm: {
        mine: true,
        increaseTime: true,
        setNextBlockTimestamp: true,
        revert: true,
        snapshot: true,
        setAutomine: false,
        setIntervalMining: false,
        setBlockGasLimit: true,
      },
      extra: {
        overrideGas: true,
      },
    },
  });

  const config = {
    method: 'post',
    url: `${BB_BACKEND_URL}/user/container`,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    data,
  };

  let node;

  try {
    const response = await axios(config);
    const resData = response.data;

    if (response.status === 200) {
      node = { nodeId: resData.nodeId };
    } else {
      console.log('Error in creating node, Error: ', resData);
    }
  } catch (err) {
    console.log('Error in creating node, Error: ', err);
  }

  if (node) {
    confirmAndStoreNodeData(node, apiKey, aliveNodes);
    createdNodes.push(node);
  }
}

async function createTestnets() {
  await getUserDetails();

  const ora = (await import('ora')).default;

  const createNodeSpinner = ora(`Creating testnets on Buildbear...`).start();

  const aliveNodes = [0];
  const createdNodes = [];
  const noOfNodes = 5;

  // clear nodes.json before creating new nodes
  await clearNodesFile();

  // loop to create testnets
  while (true) {
    if (createdNodes.length == noOfNodes) {
      createNodeSpinner.succeed('Testnets created on Buildbear');
      break;
    }

    await createTestnet(SCAFFOLD_ETH_API_KEY, createdNodes, aliveNodes);
  }

  console.log('Created nodes..');
  console.log(createdNodes);

  const waitAliveNodesSpinner = ora(`Waiting for nodes to be live...`).start();

  // interval to check whether nodes are live
  const waitAliveNodesInterval = setInterval(() => {
    if (aliveNodes[0] === noOfNodes) {
      waitAliveNodesSpinner.succeed('All nodes are live');
      clearInterval(waitAliveNodesInterval);
    }
  }, 100);
}

createTestnets();
