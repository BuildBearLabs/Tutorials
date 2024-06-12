## Implementation of a blockchain based on pows consensus

- This blockchain operates on a proof-of-work mechanism, employing dedicated threads for critical tasks such as mining and updating the database with the latest state (i.e., the most recent block). This design enables asynchronous computation and significantly improves performance of blockchain node.

- Logging is configured to capture information at all levels (debug, info, warn) to monitor the blockchain node, query server and query client.

- A transaction, or a block can be queried using the transaction id and the block index respectively using the query server which binds to a separate port listening for requests and assigns the separate thread for each query making the server highly scalable and performant.

### How to run?

#### Run a Node

```rust
cargo run --bin node 
```

This runs with the default address for node which is 127.0.0.1:1730.

To run the node with port of your choice,

```rust
cargo run --bin node -- -p <PORT>
```

#### Run the query server

```rust
cargo run --bin query 
```

This runs with the default address for query server which is 127.0.0.1:7291

To run the server with port of your choice,

```rust
cargo run --bin query -- -p <PORT>
```

#### Run the client (with query)

```rust
cargo run --bin query_client
```

This runs by connecting with the default query server port. So if you are running the query server with the port of your choice, 

```rust
cargo run --bin query_client -- -p <PORT>
```

- To query a transaction,

    ```rust
    cargo run --bin query_client -- txn <Transaction ID>
    ```
- To query a block,

    ```rust
    cargo run --bin query_client -- block <Block Index>
    ```

### Limitations

- It randomly generates transactions and add to the block. As project submission is time constrained, I cannot add the functionality of accepting transactions from say, a client which is just another port.

- Also, this blockchain can only be run by a single node. That is, peer-to-peer communication is not enabled for the same reason due to time constraint.