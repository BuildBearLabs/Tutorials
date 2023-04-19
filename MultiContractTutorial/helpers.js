const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { BB_BACKEND_URL } = require('./constants');

function readNodes() {
  let nodes = null;

  try {
    nodes = JSON.parse(
      fs.readFileSync(path.join(__dirname, './nodes.json')).toString().trim()
    );
  } catch (e) {}

  return nodes;
}

async function confirmAndStoreNodeData(node, forkingChainId, apiKey) {
  await waitForLiveNode(node, apiKey);

  node.forkingChainId = forkingChainId;

  fs.writeFileSync(
    path.join(__dirname, './nodes.json'),
    JSON.stringify(node, null, 2)
  );

  console.log('Node details stored in nodes.json');
}

async function waitForLiveNode(node, apiKey) {
  const ora = (await import('ora')).default;
  const spinner = ora('Waiting for the node to be live').start();

  const config = {
    method: 'get',
    url: `${BB_BACKEND_URL}/user/container/${node.nodeId}`,
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  };

  async function checkLoop() {
    try {
      const response = await axios(config);
      const data = response.data;

      if (data.status === 'live') {
        spinner.succeed('Node is live');
      } else if (data.status === 'started') {
        await timeout(2000);
        await checkLoop();
      } else {
        spinner.fail('Node has stopped');
      }

      return null;
    } catch (err) {
      if (err.response.data.error === 'Node is started') {
        await timeout(2000);
        await checkLoop();
      } else console.log(err);
    }
  }

  await checkLoop();
}

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function deleteNode(node, apiKey) {
  const ora = (await import('ora')).default;
  const spinner = ora(`Deleting node ${node.nodeId}`).start();

  const config = {
    method: 'delete',
    url: `${BB_BACKEND_URL}/user/container/${node.nodeId}`,
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  };

  try {
    await axios(config);

    fs.unlinkSync(path.join(__dirname, './nodes.json'));

    spinner.succeed('Node deleted successfully');
  } catch (err) {
    spinner.fail(err.message);
  }
}

module.exports = { readNodes, confirmAndStoreNodeData, deleteNode };
