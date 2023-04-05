const { ethers } = require('hardhat');

// Deploy function
async function deploy() {
    [account] = await ethers.getSigners();
    deployerAddress = account.address;
    console.log(`Deploying contracts using ${deployerAddress}`);
    const simpleStorage = await ethers.getContractFactory('SimpleStorage');
    const simpleStorageInstance = await simpleStorage.deploy(
    );
    await simpleStorageInstance.deployed();
    await run(`verify:verify`, {
        address: simpleStorageInstance.address,
    });

}

deploy()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
