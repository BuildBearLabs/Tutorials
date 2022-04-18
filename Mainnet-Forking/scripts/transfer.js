const { BigNumber, ethers } = require("ethers");

async function main() {
    const abi = [
        // Read-Only Functions
        "function balanceOf(address owner) view returns (uint256)",
        "function decimals() view returns (uint8)",
        "function symbol() view returns (string)",

        // Authenticated Functions
        "function transfer(address to, uint amount) returns (boolean)",

        // Events
        "event Transfer(address indexed from, address indexed to, uint amount)",
    ];

    const provider = new ethers.providers.JsonRpcProvider();

    // impersonating vitalik's account
    await provider.send("hardhat_impersonateAccount", [
        "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B",
    ]);

    const signer = await provider.getSigner(
        "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B"
    );

    // uniswap contract
    const uniToken = new ethers.Contract(
        "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
        abi,
        signer
    );
    const vitalik_Balance = (await uniToken.balanceOf("0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B")).toString()
    console.log(vitalik_Balance)
    // transferring ETH 
    const tx = await uniToken.transfer(
        "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        BigNumber.from(vitalik_Balance)
    );

    console.log(tx);
    console.log('Balance: ',(await uniToken.balanceOf("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")).toString());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });