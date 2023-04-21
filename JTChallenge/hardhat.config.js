require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");


task("deploy", "Deploys a contract and verifies it on Etherscan")
  .addParam("contract", "The contract's name")
  .setAction(async (taskArgs, hre) => {
    console.log(`Deploying ${taskArgs.contract}...`);
    const Contract = await hre.ethers.getContractFactory(taskArgs.contract);
    const contract = await Contract.deploy();
    await contract.deployed();
    console.log(`Contract ${taskArgs.contract} deployed at ${contract.address}`);
    return contract;
  });


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "buildbear",
  networks: {
    buildbear: {
      url: "https://rpc.buildbear.io/furious-palpatine-14d74001",
    }
  },
  etherscan: {
    apiKey: {
      buildbear: "verifyContract",
    },
    customChains: [
      {
        network: "buildbear",
        chainId: 1,
        urls: {
          apiURL: "https://rpc.buildbear.io/verify/etherscan/Continental_Ayla_Secura_7cfde626",
          browserURL: "https://explorer.buildbear.io/Continental_Ayla_Secura_7cfde626",
        },
      },
    ],
  },
  mocha: {
    timeout: 100000,
  },
};
