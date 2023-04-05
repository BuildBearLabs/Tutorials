const { ethers } = require('hardhat');

// Deploy function
async function deploy() {
    [account, account2] = await ethers.getSigners();
    deployerAddress = account.address;
    console.log(`Deploying contracts using ${deployerAddress}`);
    const multiSigWallet = await ethers.getContractFactory('MultiSigWallet');
    const multiSigWalletInstance = await multiSigWallet.deploy([account.address, account2.address], 2, 1111);
    await multiSigWalletInstance.deployed();
    await run(`verify:verify`, {
        address: multiSigWalletInstance.address,
        constructorArguments: [[account.address, account2.address], 2, 1111],
    });

}

deploy()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
