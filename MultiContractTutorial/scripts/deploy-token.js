const { ethers } = require('hardhat');

// Deploy function
async function deploy() {
    [account] = await ethers.getSigners();
    deployerAddress = account.address;
    console.log(`Deploying contracts using ${deployerAddress}`);
    const token = await ethers.getContractFactory('Token');
    const tokenInstance = await token.deploy(1000
    );
    await tokenInstance.deployed();
    await run(`verify:verify`, {
        address: tokenInstance.address,
        constructorArguments: [1000],
    });

}

deploy()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
