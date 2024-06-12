use clap::Parser;

use anyhow::bail;
use lib::query_utils::{Command, Response};
use log::info;
use std::net::{IpAddr, Ipv4Addr, SocketAddr};
use tokio::io::AsyncReadExt;
use tokio::io::AsyncWriteExt;
use tokio::net::TcpStream;

#[derive(Parser)]
#[clap(
    author = "Rajesh",
    version = "0.1.0",
    about = "CLI utility to query blockchain"
)]
struct Cli {
    #[clap(subcommand)]
    command: Command,

    #[clap(short, long, value_parser, value_name = "NUM", default_value_t = 7291)]
    port: u16,

    #[clap(short, long, value_parser, value_name="NUM", default_value_t=IpAddr::V4(Ipv4Addr::LOCALHOST))]
    address: IpAddr,
}

#[tokio::main]
async fn main() {
    simple_logger::SimpleLogger::new().env().init().unwrap();

    let cli = Cli::parse();

    // creates address from the given port and host.
    let server = SocketAddr::new(cli.address, cli.port);

    // Attempts to connect to the server. If connection cannot be made, it retries every 100ms.
    let mut stream = loop {
        match TcpStream::connect(server).await {
            Ok(stream) => {
                break stream;
            }

            Err(_) => {
                tokio::time::sleep(Duration::from_millis(100)).await;
                continue;
            }
        }
    };

    info!("connected to query server: {}", server);

    let message = bincode::serialize(&cli.command).expect("Failed to deserialize message");

    // Sends the request message to the query server.
    if let Err(err) = stream.write_all(&message).await {
        eprintln!("Failed to send request message to node: {}", err);
    }

    info!("Sent request");

    let mut response = Vec::new();

    // Reads response from the server stream.
    if let Err(err) = stream.read_to_end(&mut response).await {
        eprintln!("Failed to receive response: {}", err);
    }

    info!("Received response");

    // Attempts to deserialize the response.
    let get_resp: Response = bincode::deserialize(&response).expect(
        "Failed to deserialize the response. Maybe the data you requested is not available!",
    );

    println!("{:?}", get_resp);
}
