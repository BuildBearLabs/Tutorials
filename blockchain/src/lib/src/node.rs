use crate::block::*;
use crate::chain::BlockChain;
use crate::transaction::{CoinbaseTxn, Txn};
use log::{debug, info, warn};
use rand::{thread_rng, Rng as _};
use sha2::{Digest as _, Sha256};
use std::collections::HashSet;
use std::net::SocketAddr;
use tokio::sync::mpsc;
use tokio::task::JoinHandle;

const REWARD: u8 = 50;

pub struct Miner {
    // Why task joinhandle required?
    // Because we need to have a control over the miner task.
    // For example, when we need to abort the mining task because another peer has already mined,
    // we need to abort the mining task running in the node.
    task: JoinHandle<()>,

    // Channel to send and receiver blocks.
    // Having them as field so that it can be used anywhere and need not to pass it as a function argument.
    block_sender: mpsc::UnboundedSender<Block>,
    block_receiver: mpsc::UnboundedReceiver<Block>,
}

impl Miner {
    // Attempts to find a nonce that is required to achieve the target.
    pub async fn mine(txns: Vec<Txn>, previous_block: Block, node_address: SocketAddr) -> Block {
        let merkle_root = MerkleRoot::from(txns.clone());
        let mut block = Block::new(previous_block.block_header.current_hash.clone(), txns);
        block.block_header.merkle_root = merkle_root;
        block.block_header.nonce = thread_rng().gen::<u32>();

        let difficulty = block.block_header.difficulty as usize;
        let target: String = vec!["0"; difficulty].join("").into();

        debug!("Target: {}", &target);

        loop {
            let block_hash = BlockChain::hash_block(block.clone());

            let hash_to_bits = block_hash.iter().fold(String::new(), |acc, byte| {
                let bits = format!("{byte:0>8b}");
                acc + bits.as_str()
            });

            if hash_to_bits.starts_with(target.as_str()) {
                debug!("Bits: {}", hash_to_bits);
                info!("{}", format!("Mined!⚡️"));
                block.block_header.coinbase_txn.amount = REWARD;
                block.block_header.coinbase_txn.validator = format!("{}", node_address);

                let mut hasher = Sha256::new();
                hasher.update(&serde_json::to_string(&block).unwrap().as_bytes());

                let hash = hex::encode(hasher.finalize().as_slice().to_owned());

                block.block_header.current_hash = hash;

                return block;
            }

            block.block_header.nonce += 1;
        }
    }

    pub fn mine_genesis(node_address: SocketAddr) -> Block {
        let nonce = thread_rng().gen::<u32>();
        let block_header = BlockHeader {
            timestamp: std::time::SystemTime::now()
                .duration_since(std::time::UNIX_EPOCH)
                .unwrap()
                .as_secs(),
            index: 0,
            previous_hash: "00000".to_string(),
            current_hash: String::new(),
            coinbase_txn: CoinbaseTxn::new(),
            merkle_root: MerkleRoot::new(),
            nonce,
            difficulty: DIFFICULTY,
        };
        let body = Body { txn_data: vec![] };

        let mut block = Block { block_header, body };

        let merkle_root = MerkleRoot::from(block.body.txn_data.clone());

        block.block_header.merkle_root = merkle_root;

        let difficulty = block.block_header.difficulty as usize;
        let target: String = vec!["0"; difficulty].join("").into();

        loop {
            let block_hash = BlockChain::hash_block(block.clone());

            let hash_to_bits = block_hash.iter().fold(String::new(), |acc, byte| {
                let bits = format!("{byte:0>8b}");
                acc + bits.as_str()
            });

            if hash_to_bits.starts_with(target.as_str()) {
                info!("{}", format!("Mined genesis!👀🎉"));
                block.block_header.coinbase_txn.amount = REWARD;
                block.block_header.coinbase_txn.validator = format!("{}", node_address);

                let mut hasher = Sha256::new();
                hasher.update(&serde_json::to_string(&block).unwrap().as_bytes());

                let hash = hex::encode(hasher.finalize().as_slice().to_owned());

                block.block_header.current_hash = hash;

                return block;
            }

            block.block_header.nonce += 1;
        }
    }
}

// Structure of a Node
pub struct Node {
    address: SocketAddr,   // address of the node
    mempool: HashSet<Txn>, // when a transaction is created, it is added to the mempool. Miner task picks up transactions from the mempool.
    state: BlockChain,     // local state copy of the node
    miner: Miner,
}

impl Node {
    pub async fn new(address: SocketAddr) -> Self {
        let (block_sender, block_receiver) = mpsc::unbounded_channel::<Block>();

        Self {
            address,
            mempool: HashSet::new(),
            state: BlockChain::new(),
            miner: Miner {
                task: tokio::spawn(async {}),
                block_sender,
                block_receiver,
            },
        }
    }

    pub async fn run(&mut self) -> JoinHandle<()> {
        self.run_miner();

        // Why select macro is used?
        // If we have many more tasks running, then select will look for any task that has been completed
        loop {
            tokio::select! {
                // Receive block from miner thread
                Some(block) = self.miner.block_receiver.recv() => {
                    info!("Block received from Miner task!");

                    info!("Block header: {:?}", block.block_header);
                    info!("Transactions added in the block: {:?}", block.body.txn_data);

                    if let Ok(new_state) = self.state.add_block(block).await {
                        info!("Updating state");
                        self.update_state(new_state).await;
                    }
                }
            }
        }
    }

    async fn update_state(&mut self, new_state: BlockChain) {
        self.state = new_state;

        self.mempool.retain(|txn| {
            !self
                .state
                .blocks
                .last()
                .unwrap()
                .body
                .txn_data
                .contains(txn)
        });

        // generating random transactions
        let txns = Txn::generate_txns(12);

        for txn in txns {
            self.mempool.insert(txn);
        }

        self.stop_and_restart().await;
    }

    async fn stop_and_restart(&mut self) {
        self.miner.task.abort();
        self.run_miner();
    }

    fn run_miner(&mut self) {
        match self.state.blocks.last() {
            Some(block) => {
                info!("Restarting miner thread...");
                let block = block.clone();

                // getting transactions from the mempool
                let txns = self.mempool.clone().into_iter().collect();

                // cloning this to send to miner thread. If found valid nonce, it is used to send the mined block to main thread.
                let block_sender = self.miner.block_sender.clone();
                let node_address = self.address;
                self.miner.task = tokio::spawn(async move {
                    let new_block = Miner::mine(txns, block, node_address).await;
                    if let Err(e) = block_sender.send(new_block) {
                        warn!("Can't send mined block to receiver: {}", e);
                    }
                });
            }

            // If None, then there is no block before. So, genesis block is mined.
            None => {
                info!("Mining genesis block!");
                let block_sender = self.miner.block_sender.clone();
                let node_address = self.address;
                self.miner.task = tokio::spawn(async move {
                    let new_block = Miner::mine_genesis(node_address);
                    if let Err(e) = block_sender.send(new_block) {
                        warn!("Can't send mined block to receiver: {}", e);
                    }
                });
            }
        }
    }
}
