import inquirer from "inquirer";
import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
import { BB_BACKEND_URL, BB_API_KEY } from "./constants.mjs";
import ora from "ora";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function readNodes() {
  let nodes = null;

  try {
    nodes = JSON.parse(
      fs.readFileSync(path.join(__dirname, "./testnet.json")).toString().trim()
    );
  } catch (e) {}

  return nodes;
}

export async function createNewDeployment(node, forkingChainId) {
  await getUserDetails();

  await waitForLiveNode(node);

  // eslint-disable-next-line no-param-reassign
  node.forkingChainId = forkingChainId;

  fs.writeFileSync(
    path.join(__dirname, "./testnet.json"),
    JSON.stringify(node, null, 2)
  );

  console.log("Testnet details stored in testnet.json");
}

async function getUserDetails() {
  const userResponse = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirm",
      message: "Authorize Buildbear to read your Git username and email ?",
    },
  ]);

  const gitUsername = execSync("git config user.name").toString().trim();
  const gitEmail = execSync("git config user.email").toString().trim();

  var data = userResponse.confirm
    ? JSON.stringify({
        username: gitUsername ? gitUsername : "Anonymous",
        email: gitEmail ? gitEmail : undefined,
      })
    : JSON.stringify({ username: "Anonymous", email: undefined });

  var config = {
    method: "post",

    url: `${BB_BACKEND_URL}/api/scaffold-eth`,
    headers: {
      Authorization: `Bearer ${BB_API_KEY}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  await axios(config);
  if (userResponse.confirm) console.log("Thanks from the Buildbear Team ❤️");
}

async function waitForLiveNode(node) {
  const spinner = ora("Waiting for the Testnet to be live").start();
  const config = {
    method: "get",
    url: `${BB_BACKEND_URL}/v1/buildbear-sandbox/${node.testnetId}`,
    headers: {
      Authorization: `Bearer ${BB_API_KEY}`,
      "Content-Type": "application/json",
    },
  };

  async function checkLoop() {
    try {
      const response = await axios(config);
      const data = response.data;
      if (data.status === "live") {
        spinner.succeed("Testnet is live");
      } else if (data.status === "started") {
        await timeout(2000);
        await checkLoop();
      } else {
        spinner.fail("Testnet has stopped");
      }

      return null;
    } catch (err) {
      if (err.response.data.error === "Node is started") {
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
