use crate::transaction::*;
use rand::{thread_rng, Rng};
use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};

pub const DIFFICULTY: u8 = 10;
pub static mut BLOCK_INDEX: u32 = 0;

#[derive(Debug, Serialize, Deserialize, Clone, Hash)]
pub struct Body {
    pub txn_data: Vec<Txn>,
}

#[derive(Debug, Clone, Serialize, Deserialize, Hash)]
pub struct BlockHeader {
    pub index: u32,
    pub previous_hash: String,
    pub timestamp: u64,
    pub current_hash: String,
    pub coinbase_txn: CoinbaseTxn,
    pub merkle_root: String,
    pub nonce: u32,
    pub difficulty: u8,
}

#[derive(Debug, Clone, Serialize, Deserialize, Hash)]
pub struct Block {
    pub block_header: BlockHeader,
    pub body: Body,
}

impl Block {
    pub fn new(previous_hash: String, txn_data: Vec<Txn>) -> Block {
        let random = thread_rng().gen::<u32>();
        let block_header = BlockHeader {
            timestamp: std::time::SystemTime::now()
                .duration_since(std::time::UNIX_EPOCH)
                .unwrap()
                .as_secs(),
            index: update_index(),
            previous_hash,
            current_hash: String::new(),
            coinbase_txn: CoinbaseTxn::new(),
            merkle_root: MerkleRoot::new(),
            nonce: random,
            difficulty: DIFFICULTY,
        };

        let body = Body { txn_data };

        Block { block_header, body }
    }
}

#[derive(Debug)]
pub struct MerkleRoot;

impl MerkleRoot {
    pub fn new() -> String {
        String::new()
    }

    pub fn from(txns: Vec<Txn>) -> String {
        let mut txns = txns;
        if txns.is_empty() {
            let mut hasher = Sha256::new();
            hasher.update(String::default().as_bytes());
            let hash = hasher.finalize().as_slice().to_owned();
            return hex::encode(hash);
        }

        if txns.len() % 2 != 0 {
            txns.push(txns[txns.len() - 1].clone());
        }

        let hashed_txns = txns
            .iter()
            .map(|txn| {
                let mut hasher = Sha256::new();
                hasher.update(&txn.sender.as_bytes());
                hasher.update(&txn.receiver.as_bytes());
                hasher.update(&txn.amount.to_string().as_bytes());
                let hash = hasher.finalize().as_slice().to_owned();
                hex::encode(hash)
            })
            .collect::<Vec<String>>();

        Self::construct_root(hashed_txns)
    }

    fn construct_root(hashed_leaves: Vec<String>) -> String {
        let mut merkle_root = String::new();

        let mut hashes = hashed_leaves;

        while hashes.len() > 1 {
            let mut nodes = hashes.clone();
            let mut parent_nodes = Vec::<String>::new();
            for i in 0..nodes.len() / 2 {
                let index = 2 * i;
                let left = nodes[index].clone();
                let right = nodes[index + 1].clone();

                let mut hasher = Sha256::new();
                hasher.update(&left.as_bytes());
                hasher.update(&right.as_bytes());
                let hash = hasher.finalize().as_slice().to_owned();
                let hash = hex::encode(hash);
                parent_nodes.push(hash);
            }

            nodes = parent_nodes;
            if nodes.len() == 1 {
                merkle_root = nodes[0].clone();
                break;
            }

            if nodes.len() % 2 != 0 {
                nodes.push(nodes[nodes.len() - 1].clone());
            }

            hashes = nodes;
        }

        merkle_root
    }
}

fn update_index() -> u32 {
    unsafe {
        let pre_level = BLOCK_INDEX;
        BLOCK_INDEX += 1;
        pre_level
    }
}
