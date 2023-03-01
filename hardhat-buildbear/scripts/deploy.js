const { ethers } = require('hardhat');

// Deploy function
async function deploy() {
    [account] = await ethers.getSigners();
    deployerAddress = account.address;
    console.log(`Deploying contracts using ${deployerAddress}`);
    const token = await ethers.getContractFactory('Token');
    const tokenInstance = await token.deploy(
    );
    await tokenInstance.deployed();

    console.log(`Token :  ${tokenInstance.address}`);

    // await run(`verify:verify`, {
    //     address: tokenInstance.address,
    // });
}

deploy()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
