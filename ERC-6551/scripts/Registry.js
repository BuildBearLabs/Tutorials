const hre = require("hardhat");
const { ethers } = require('hardhat');
// importing the json file from ../deployments/buildbear/MainContract.json
const NFTAddress = require("../deployments/buildbear/Nft.json").address;
const RegistryAddress = require("../deployments/buildbear/ERC6551Registry.json").address;
const ERC6551AccountAddress = require("../deployments/buildbear/ERC6551Account.json").address;
const UsdcABI = require("../public/USDCabi.json");
async function main() {

    const [deployer, account2] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const NFT = await hre.ethers.getContractAt("NFT", NFTAddress);
    const Registry = await hre.ethers.getContractAt("ERC6551Registry", RegistryAddress);
    const ERC6551Account = await hre.ethers.getContractAt("ERC6551Account", ERC6551AccountAddress);
    // nft mint
    console.log("Minting NFT");
    const mint = await NFT.safeMint(deployer.address, "https://ipfs//CID");
    console.log("Minting NFT Successfuly");
    //Should create TokenBoundAccount successfuly
    console.log("Creating a TokenBoundAccount using NFT");

    const newAccount = await Registry.callStatic.createAccount(
        ERC6551Account.address, // implementation contract
        1, //  chainId
        NFT.address, // parent NFT
        1, // token ID
        1, // salt
        "0x" // init calldata
    );
    console.log("TokenBoundAccount Created Address:", newAccount);
    //new account address 
    const NewAccountaddress = await Registry.account(
        ERC6551Account.address, // implementation contract
        1, // chainId
        NFT.address, // parent NFT
        1, // token ID
        1, // salt
    );
    console.log("Transfering ETh to the TokenBoundAccount");

    //sending Eth to the New account  
    const sendEth = await deployer.sendTransaction({
        to: NewAccountaddress,
        value: ethers.utils.parseEther("1.0")
    });

    //get the balance of the new account
    const balance = await ethers.provider.getBalance(NewAccountaddress);
    console.log("Eth Balance Of TokenBoundAccount:", balance.toString());

    console.log("Transfering 1 USDC to the TokenBoundAccount");

    // Transfer USDC tokens to the newly created account
    const usdcContractAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
    const usdcContract = new ethers.Contract(usdcContractAddress, UsdcABI, deployer);
    const transferTx = await usdcContract.transfer(NewAccountaddress, "1000000"); // 1 USDC (6 decimals)
    await transferTx.wait();
    console.log("USDC tokens transferred successfully to TokenBoundAccount.");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
