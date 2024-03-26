use crate::transaction::{CoinbaseTxn, Txn};
use clap::Parser;
use serde::Deserialize;
use serde::Serialize;

// Response Variants
#[derive(Debug, Serialize, Deserialize)]
pub enum Response {
    Txn {
        sender: String,
        receiver: String,
        value: u32,
        block_index: u32,
        block_hash: String,
        block_root: String,
        validator: String,
    },

    Block {
        index: u32,
        timestamp: u64,
        block_hash: String,
        coinbase_txn: CoinbaseTxn,
        merkle_root: String,
        txns: Vec<Txn>,
    },
}

// Request Variants
#[derive(Parser, Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub enum Command {
    Txn { id: String },

    Block { index: u32 },
}
