import node from "./sandbox.json";
import { defineChain } from "viem";
import * as chains from "viem/chains";

export const BuildBear = defineChain({
  id: node.chainId,
  name: "BuildBear",
  network: "BuildBear",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: [node.rpcUrl],
    },
    public: {
      http: [node.rpcUrl],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: node.explorerUrl },
  },
  contracts: {
    // multicall3: {
    //   address: '0xcA11bde05977b3631167028862bE2a173976CA11',
    //   blockCreated: 5882,
    // },
  },
});
export type ScaffoldConfig = {
  targetNetworks: readonly chains.Chain[];
  pollingInterval: number;
  alchemyApiKey: string;
  walletConnectProjectId: string;
  onlyLocalBurnerWallet: boolean;
  walletAutoConnect: boolean;
};

const scaffoldConfig = {
  // The networks on which your DApp is live
  targetNetworks: [node.sandboxId ? BuildBear : chains.hardhat],

  // The interval at which your front-end polls the RPC servers for new data
  // it has no effect if you only target the local network (default is 4000)
  pollingInterval: 30000,

  // This is ours Alchemy's default API key.
  // You can get your own at https://dashboard.alchemyapi.io
  // It's recommended to store it in an env variable:
  // .env.local for local testing, and in the Vercel/system env config for live apps.
  alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF",

  // This is ours WalletConnect's default project ID.
  // You can get your own at https://cloud.walletconnect.com
  // It's recommended to store it in an env variable:
  // .env.local for local testing, and in the Vercel/system env config for live apps.
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "3a8170812b534d0ff9d794f19a901d64",

  // Only show the Burner Wallet when running on hardhat network
  onlyLocalBurnerWallet: true,

  /**
   * Auto connect:
   * 1. If the user was connected into a wallet before, on page reload reconnect automatically
   * 2. If user is not connected to any wallet:  On reload, connect to burner wallet if burnerWallet.enabled is true && burnerWallet.onlyLocal is false
   */
  walletAutoConnect: true,
} as const satisfies ScaffoldConfig;

export default scaffoldConfig;
