const BASE_URL = 'dev.buildbear.io';
const BB_BACKEND_URL = `https://backend.${BASE_URL}`;
const BB_RPC_URL = `https://rpc.${BASE_URL}`;

const networkData = {
  1: ['Ethereum Mainnet', 'https://rpc.ankr.com/eth'],
  56: ['Binance Smart Chain', 'https://rpc.ankr.com/bsc'],
  137: ['Polygon Mainnet', 'https://rpc.ankr.com/polygon'],
  80001: ['Polygon Testnet', 'https://rpc.ankr.com/polygon_mumbai'],
  5: ['Goerli Testnet', 'https://rpc.ankr.com/eth_goerli'],
  10: ['Optimism Mainnet', 'https://mainnet.optimism.io'],
  42161: ['Arbitrum Mainnet', 'https://rpc.ankr.com/arbitrum'],
  421613: ['Arbitrum Goerli', 'https://arbitrum-goerli.public.blastapi.io'],
  250: ['Fantom Mainnet', 'https://rpc.fantom.network'],
  4002: ['Fantom Testnet', 'https://rpc.testnet.fantom.network'],
  11155111: [
    'Sepolia Testnet',
    'https://eth-sepolia.g.alchemy.com/v2/G7CgTChMidejETAKvsK6OKzXainjomJW',
  ],
  43114: ['Avalanche Network', 'https://rpc.ankr.com/avalanche'],
  2222: ['Kava EVM Co-Chain', 'https://evm.kava.io'],
};

const networks = Object.keys(networkData);

module.exports = {
  BASE_URL,
  BB_BACKEND_URL,
  BB_RPC_URL,
  networkData,
  networks,
};
