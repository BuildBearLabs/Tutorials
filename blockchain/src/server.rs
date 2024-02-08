use lib::node::Node;

use clap::Parser;
use std::net::{IpAddr, Ipv4Addr, SocketAddr};
use tokio::task::JoinHandle;

#[derive(Parser)]
#[clap(
    author = "Rajesh",
    version = "0.1.0",
    about = "CLI utility for nodes to respond to client requests"
)]
struct Cli {
    #[clap(short, long, value_parser, value_name = "NUM", default_value_t = 1730)]
    port: u16,

    #[clap(short, long, value_parser, value_name="NUM", default_value_t=IpAddr::V4(Ipv4Addr::LOCALHOST))]
    address: IpAddr,
}

#[tokio::main]
async fn main() {
    simple_logger::SimpleLogger::new().env().init().unwrap();

    let cli = Cli::parse();

    let server_address = SocketAddr::new(cli.address, cli.port);

    let server = init_node(server_address).await;

    server.await.unwrap();
}

async fn init_node(server: SocketAddr) -> JoinHandle<()> {
    let mut node = Node::new(server).await;
    let node_handle = tokio::spawn(async move {
        node.run().await;
    });

    node_handle
}
