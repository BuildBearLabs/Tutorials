const DB_PATH: &'static str = "/tmp/db";

use anyhow::Result;
use clap::Parser;
use lib::block::Block;
use lib::query_utils::{Command, Response};
use log::info;
use rocksdb::DB;
use tokio_util::codec::LengthDelimitedCodec;
use std::net::{IpAddr, Ipv4Addr, SocketAddr};
use std::time::Duration;
use tokio_util::codec::Framed;
use futures::stream::SplitSink;
use futures::SinkExt as _;
use futures::StreamExt as _;
use tokio::{
    io::{AsyncWriteExt, AsyncReadExt},
    net::{TcpListener, TcpStream},
};

#[derive(Parser)]
#[clap(
    author = "Rajesh",
    version = "0.1.0",
    about = "CLI utility to query blockchain"
)]
struct Cli {
    #[clap(short, long, value_parser, value_name = "NUM", default_value_t = 7291)]
    port: u16,

    #[clap(short, long, value_parser, value_name="NUM", default_value_t=IpAddr::V4(Ipv4Addr::LOCALHOST))]
    address: IpAddr,
}

// Responsible for handling each client stream
async fn handle(mut stream: TcpStream, remote_address: SocketAddr) -> Result<()> {
    let mut buffer = Vec::new();

    stream.read_to_end(&mut buffer).await?; 

    let db = loop {
        match DB::open_default(DB_PATH) {
            Ok(db) => {
                break db;
            },
            Err(_) => {
                tokio::time::sleep(Duration::from_millis(100)).await;
                continue;
            }
        }
    };
    
    info!("Opening database...");
    
    match bincode::deserialize(&buffer[..]).expect("Failed to deserialize the request") {
        Command::Txn { id } => {
            info!("Received txn query from client: {}", remote_address);
            let mut blocks = Vec::new();
            let mut block_index: u32 = 0;

            while let Some(block) = db.get(bincode::serialize(&block_index).unwrap())? {
                let block: Block = bincode::deserialize(&block)?;
                blocks.push(block);
                block_index += 1;
            }

            let mut txn_data = Vec::new();

            let block = blocks
                .into_iter()
                .filter(|block| {
                    let mut contains = false;

                    let _ = block.body.txn_data.iter().map(|txn| {
                        let has_txn = txn.id == id;
                        contains |= has_txn;

                        if has_txn {
                            txn_data.push(txn.clone());
                        }
                    });

                    contains
                })
                .collect::<Vec<Block>>();

            let block = block[0].clone();
            let txn = txn_data[0].clone();
            let response = Response::Txn { sender: txn.sender.clone(), receiver: txn.receiver.clone(), value: txn.amount, block_index: block.block_header.index, block_hash: block.block_header.current_hash.clone(), block_root: block.block_header.merkle_root.clone(), validator: block.block_header.coinbase_txn.validator.clone() };
            
            // serializes the response
            let msg = bincode::serialize(&response)?;
            
            // writes response into the client stream.
            stream.write_all(&msg[..]).await?;
        }

        Command::Block { index } => match db.get(bincode::serialize(&index).unwrap())? {
            Some(bytes) => {
                info!("Received block query from client: {}", remote_address);
                let block: Block = bincode::deserialize(&bytes)?;
                let response = Response::Block {
                    index: block.block_header.index,
                    block_hash: block.block_header.current_hash.clone(),
                    timestamp: block.block_header.timestamp,
                    coinbase_txn: block.block_header.coinbase_txn.clone(),
                    merkle_root: block.block_header.merkle_root.clone(),
                    txns: block.body.txn_data.clone(),
                };

                let msg = bincode::serialize(&response)?;

                stream.write_all(&msg[..]).await?;
            }

            // If None, 0 is sent indicating the failure of query.
            None => {
                stream.write_all(&[0u8]).await?;
            }
        },
    }

    // If reached here, either the response or zero is sent to the client. So, we log this.
    info!("Responded to {}", remote_address);

    Ok(())
}

#[tokio::main]
async fn main() {
    simple_logger::SimpleLogger::new().env().init().unwrap();

    let cli = Cli::parse();

    let server_address = SocketAddr::new(cli.address, cli.port);

    let listener = TcpListener::bind(server_address).await.unwrap();

    // Listening for new connection. Will create a separate thread for each connection and handles the request accordingly.
    // This is what makes the server more scalable and can handle massive connections smoothly.
    loop {
        match listener.accept().await {
            Ok((stream, address)) => {
                tokio::spawn(handle(stream, address));
            },

            // Just ignore the connection
            Err(_) => {
                continue;
            }
        }

    }
}
