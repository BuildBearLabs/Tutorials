use hex::encode;
use rand::{thread_rng, Rng};
use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};

#[derive(Debug, Clone, Default, Serialize, Deserialize, Hash, PartialEq, Eq)]
pub struct Txn {
    pub id: String,
    pub sender: String,
    pub receiver: String,
    pub amount: u32,
}

#[allow(dead_code)]
impl Txn {
    pub fn new(sender: String, receiver: String, amount: u32) -> Txn {
        let id = Self::calculate_id(&sender, &receiver, &amount);
        Txn {
            id,
            sender,
            receiver,
            amount,
        }
    }

    pub fn with_id(id: String, sender: String, receiver: String, amount: u32) -> Self {
        Self {
            id,
            sender,
            receiver,
            amount,
        }
    }

    fn calculate_id(sender: &str, receiver: &str, amount: &u32) -> String {
        let mut random = thread_rng();
        let noise = random.gen::<u32>();
        let mut hasher = Sha256::new();
        hasher.update(&sender.as_bytes());
        hasher.update(&receiver.as_bytes());
        hasher.update(&amount.to_string().as_bytes());
        hasher.update(&noise.to_string().as_bytes());
        let hash = hasher.finalize().as_slice().to_owned();
        let hash = hex::encode(hash);
        hash
    }

    pub fn generate_txns(num: usize) -> Vec<Txn> {
        let mut rng = thread_rng();

        let txns = (0..num)
            .map(|_| {
                let mut sen = [0u8; 32];
                let mut rec = [0u8; 32];

                rng.fill(&mut sen[..]);
                rng.fill(&mut rec[..]);

                let value = rng.gen::<u32>();

                Self::new(
                    format!("0x{}", encode(sen)),
                    format!("0x{}", encode(rec)),
                    value,
                )
            })
            .collect::<Vec<Txn>>();

        txns
    }
}

#[derive(Debug, Clone, Serialize, Deserialize, Hash, PartialEq, Eq)]
pub struct CoinbaseTxn {
    pub amount: u8,
    pub validator: String,
}

impl CoinbaseTxn {
    pub fn new() -> Self {
        Self {
            amount: 0,
            validator: String::new(),
        }
    }
}
