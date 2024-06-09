## Sourcify Verification using BuildBear Sourcify Plugin

1. Clone this repository
2. Change Directory to DAO


### Build

```shell
$ forge build
```

 Add the Sandbox details to your Foundry.toml file:
Example:
```shell
$  [rpc_endpoints]
buildbear = "https://rpc.buildbear.io/sanam"
[etherscan]
buildbear = { key = "verifyContract", url="https://rpc.buildbear.io/verify/etherscan/sanam" }
  
```

### Deploy and Verify

```shell
$  forge script script/Deploy.s.sol --r
pc-url buildbear --private-key "YOUR PRIVATE KEY" --verify --
verifier sourcify --verifier-url https://rpc.buildbear.io/verify/sourcify/server/<YOUR NODE ID> -vvvv --broadcast --slow
  
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```
