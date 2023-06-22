const { ethers } = require('hardhat');

// Deploy function
async function deploy() {
    [account] = await ethers.getSigners();
    deployerAddress = account.address;
    console.log(`Deploying contracts using ${deployerAddress}`);
    const gameitem = await ethers.getContractFactory('GameItem');
    const gameitemInstance = await gameitem.deploy(
    );
    await gameitemInstance.deployed();


}

deploy()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
