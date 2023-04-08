const { ethers } = require('ethers')
const axios = require('axios')
require('dotenv').config()

const UNISWAP_V3_FACTORY_ADDRESS = '0x1F98431c8aD98523631AE4a59f267346ea31F984'

const MATIC_PROVIDER = new ethers.providers.JsonRpcProvider(process.env.API_URL)

const WALLET_SECRET = process.env.PRIVATE_KEY
const carbonToken = ''
const MyToken = ''

const wallet = new ethers.Wallet(WALLET_SECRET)
const connectedWallet = wallet.connect(MATIC_PROVIDER)


async function main(){

    //setup v3 factory
    const apiKey = ''
    const url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${UNISWAP_V3_FACTORY_ADDRESS}`
    const res = await axios.get(url)
    const abi = JSON.parse(res.data.result)

    const factoryContract = new ethers.Contract(
        UNISWAP_V3_FACTORY_ADDRESS,
        abi,
        MATIC_PROVIDER
    )
    

    //creating the pool
    const tx = await factoryContract.connect(connectedWallet).createPool(
        carbonToken,
        MyToken,
        500
    )
    const receipt = await tx.wait()
    console.log('receipt', receipt);

    //get the pool address
    const newPoolAddress = await factoryContract.getPool(
        carbonToken,
        MyToken,
        500
    )

    console.log('newPoolAddress', newPoolAddress)

    
}
main()