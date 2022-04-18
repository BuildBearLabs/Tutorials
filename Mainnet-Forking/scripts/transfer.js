const { BigNumber, ethers } = require("hardhat");

async function main() {
    const abi = [
        // Read-Only Functions
        "function balanceOf(address owner) view returns (uint256)",

        // Authenticated Functions
        "function transfer(address to, uint amount) returns (boolean)",
    ];

    const vitalik_address = "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B";
    const uniToken_address = "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984";
    const my_address = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";


    // //  impersonating vitalik's account
    await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [vitalik_address],
    });

    const signer = await ethers.getSigner(
        vitalik_address
    );

    // uniswap contract
    const uniToken = new ethers.Contract(
       uniToken_address,
        abi,
        signer
    );
    const vitalik_Balance = (await uniToken.balanceOf(vitalik_address)).toString()

    // transferring ETH 
    await uniToken.transfer(
        my_address,
        ethers.BigNumber.from(vitalik_Balance)
    );
    
    if((await uniToken.balanceOf(my_address) == vitalik_Balance)) {
        console.log(`Wohoo!! You now have ${ethers.utils.formatEther(vitalik_Balance)} UNI Tokens!`)
    }
    
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });