const { ethers } = require('hardhat');

// Deploy function
async function deployAll() {
    [account] = await ethers.getSigners();
    deployerAddress = account.address;
    console.log(`Deploying contracts using ${deployerAddress}`);
    const token = await ethers.getContractFactory('Token');
    const tokenInstance = await token.deploy(1000);
    await tokenInstance.deployed();
    await run(`verify:verify`, {
        address: tokenInstance.address,
        constructorArguments: [1000],
    });

    const simpleStorage = await ethers.getContractFactory('SimpleStorage');
    const simpleStorageInstance = await simpleStorage.deploy(
    );
    await simpleStorageInstance.deployed();
    await run(`verify:verify`, {
        address: simpleStorageInstance.address,
    });

    const greeter = await ethers.getContractFactory('Greeter');
    const greeterInstance = await greeter.deploy(
    );
    await greeterInstance.deployed();
    await run(`verify:verify`, {
        address: greeterInstance.address,
    });

    const gameitem = await ethers.getContractFactory('GameItem');
    const gameitemInstance = await gameitem.deploy(
    );
    await gameitemInstance.deployed();
    await run(`verify:verify`, {
        address: gameitemInstance.address,
    });

    const artwork = await ethers.getContractFactory('Artwork');
    const artworkInstance = await artwork.deploy("Artwork Contract", "ART");
    await artworkInstance.deployed();
    await run(`verify:verify`, {
        address: artworkInstance.address,
        constructorArguments: ["Artwork Contract", "ART"],
    });

}

deployAll()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
