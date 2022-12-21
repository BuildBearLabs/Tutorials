
require('dotenv').config();
const { ethers, BigNumber } = require("ethers");


async function main() {
  const DAITokenAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  const buildbearProvider=new ethers.providers.JsonRpcProvider(process.env.BuildBear_MAINNET_FORK_RPC_URL)

  const myWallet = new ethers.Wallet(process.env.MYWALLET_PRIVATE_KEY,buildbearProvider);
  const approvedAccount= "0xD31950cD762281b9849c33bfa5CE9A42B756155a";

  const domainName = "Dai Stablecoin" // put your token name 
  const domainVersion = "1" 
  const chainId = 1 // this is the chain ID of the chain you are using
  const contractAddress = DAITokenAddress

  const DAIContractABI = [
    "function nonces(address owner) view returns (uint256)"
  ]

  const DAITokenConrtact = new ethers.Contract(DAITokenAddress,DAIContractABI,myWallet);
  const currentBlockTimeStamp = (await buildbearProvider.getBlock("latest")).timestamp;
  const expiry = (BigNumber.from(currentBlockTimeStamp).add(BigNumber.from(100000)));
  const nonce = (await DAITokenConrtact.nonces(myWallet.address)).toString()
  const allowed = true;

  const domain = {
    name: domainName,
    version: domainVersion,
    chainId,
    verifyingContract: contractAddress,
  }

  const types = {
    Permit: [
      {
        name: "holder",
        type: "address",
      },
      {
        name: "spender",
        type: "address",
      },
      {
        name: "nonce",
        type: "uint256",
      },
      {
        name: "expiry",
        type: "uint256",
      },
      {
        name: "allowed",
        type: "bool",
      },
    ]
  }

  const message = {
    holder: myWallet.address,
    spender: approvedAccount,
    nonce: Number(nonce),
    expiry: expiry.toString(),
    allowed
  }
  
  await myWallet._signTypedData(domain, types, message).then((signature) => {
    const pureSig = signature.replace("0x", "")
    const r = new Buffer.from(pureSig.substring(0, 64), 'hex')
    const s = new Buffer.from(pureSig.substring(64, 128), 'hex')
    const v = new Buffer.from((parseInt(pureSig.substring(128, 130), 16)).toString());

    console.log("owner: ", (myWallet.address).toString()),
    console.log("spender: ", approvedAccount.toString()),
    console.log("nonce: " ,Number(nonce)),
    console.log("expiry: ",expiry.toString());
    console.log("allowed: ",allowed.toString());
    console.log(`r: 0x${r.toString('hex')},\ns: 0x${s.toString('hex')},\nv: ${v}`) 
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
