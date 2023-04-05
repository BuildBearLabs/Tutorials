const { ethers } = require('hardhat');

// Deploy function
async function deploy() {
    [account] = await ethers.getSigners();
    deployerAddress = account.address;
    console.log(`Deploying contracts using ${deployerAddress}`);
    const artwork = await ethers.getContractFactory('Artwork');
    const artworkInstance = await artwork.deploy("Artwork Contract", "ART");
    await artworkInstance.deployed();
    await run(`verify:verify`, {
        address: artworkInstance.address,
        constructorArguments: ["Artwork Contract", "ART"],
    });

}

deploy()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
