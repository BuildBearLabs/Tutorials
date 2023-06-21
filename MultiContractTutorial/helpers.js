const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { BB_BACKEND_URL } = require('./constants');
const execSync = require('child_process').execSync;

function readNodes() {
  let nodes = null;

  try {
    nodes = JSON.parse(
      fs.readFileSync(path.join(__dirname, './nodes.json')).toString().trim()
    );
  } catch (e) {}

  return nodes;
}

async function clearNodesFile() {
  try {
    fs.writeFileSync(
      path.join(__dirname, './nodes.json'),
      JSON.stringify([], null, 2)
    );
  } catch (e) {}
}

async function confirmAndStoreNodeData(node, apiKey, aliveNodes) {
  await waitForLiveNode(node, apiKey, aliveNodes);

  let nodes;

  try {
    nodes = JSON.parse(
      fs.readFileSync(path.join(__dirname, './nodes.json')).toString().trim()
    );
  } catch (e) {}

  try {
    fs.writeFileSync(
      path.join(__dirname, './nodes.json'),
      JSON.stringify([...nodes, node], null, 2)
    );
  } catch (e) {}
}

async function waitForLiveNode(node, apiKey, aliveNodes) {
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
        aliveNodes[0]++;
      } else if (data.status === 'started') {
        await timeout(2000);
        await checkLoop();
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

async function getUserDetails() {
  const inquirer = (await import('inquirer')).default;

  const userResponse = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Authorize Buildbear to read your Git username and email ?',
    },
  ]);

  const gitUsername = execSync('git config user.name').toString().trim();
  const gitEmail = execSync('git config user.email').toString().trim();

  var data = userResponse.confirm
    ? JSON.stringify({
        username: gitUsername ? gitUsername : 'Anonymous',
        email: gitEmail ? gitEmail : undefined,
      })
    : JSON.stringify({ username: 'Anonymous', email: undefined });

  var config = {
    method: 'post',
    url: `${BB_BACKEND_URL}/api/scaffold-eth`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  await axios(config);
  if (userResponse.confirm) console.log('Thanks from the Buildbear Team ❤️');
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

module.exports = {
  readNodes,
  clearNodesFile,
  confirmAndStoreNodeData,
  getUserDetails,
  deleteNode,
};
