import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.18",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  defaultNetwork: "hardhat",
  networks: {
    buildbear: {
      url: "https://rpc.buildbear.io/psychological-san-hill-5768d44d", // RPC_URL from buildbear dashboard
    },
    hardhat: {},
  },
  etherscan: { // Copy from bulidbear dashboard
    apiKey: {
      buildbear: "verifyContract",
    },
    customChains: [
      {
        network: "buildbear",
        chainId: 9753,
        urls: {
          apiURL:
            "https://rpc.buildbear.io/verify/etherscan/psychological-san-hill-5768d44d",
          browserURL:
            "https://explorer.buildbear.io/psychological-san-hill-5768d44d",
        },
      },
    ],
  },
};

export default config;
