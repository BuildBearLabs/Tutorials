import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import 'hardhat-watcher'

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    buildbear: {
      url: "https://rpc.buildbear.io/digital-warmachine-c06cda5f"//add your sandbox url
    }
  },
  etherscan: {
    apiKey: {
      buildbear: "verifyContract",
    },
    customChains: [
      {
        network: "buildbear",
        chainId: 137,
        urls: {
          apiURL: "https://rpc.buildbear.io/verify/etherscan/digital-warmachine-c06cda5f",
          browserURL: "https://explorer.buildbear.io/digital-warmachine-c06cda5f",
        },
      },
    ],
  },
  paths: {
    artifacts: "./artifacts",
  },
  watcher: {
    compilation: {
      tasks: ['compile'],
      files: ['./contracts'],
      ignoredFiles: ['**/.vscode'],
      verbose: true,
      clearOnStart: true,
      start: 'echo Running my compilation task now..',
    },
    ci: {
      tasks: [
        'clean',
        { command: 'compile', params: { quiet: true } }
      ],
    },
  },


};

export default config;
