const { ethers } = require('hardhat');

// Deploy function
async function deployAll() {
    [account, account2] = await ethers.getSigners();
    deployerAddress = account.address;
    console.log(`Deploying contracts using ${deployerAddress}`);
    const token = await ethers.getContractFactory('Token');
    const tokenInstance = await token.deploy(1000);
    await tokenInstance.deployed();


    const simpleStorage = await ethers.getContractFactory('SimpleStorage');
    const simpleStorageInstance = await simpleStorage.deploy(
    );
    await simpleStorageInstance.deployed();


    const greeter = await ethers.getContractFactory('Greeter');
    const greeterInstance = await greeter.deploy(
    );
    await greeterInstance.deployed();


    const gameitem = await ethers.getContractFactory('GameItem');
    const gameitemInstance = await gameitem.deploy(
    );
    await gameitemInstance.deployed();


    const artwork = await ethers.getContractFactory('Artwork');
    const artworkInstance = await artwork.deploy("Artwork Contract", "ART");
    await artworkInstance.deployed();


    const multiSigWallet = await ethers.getContractFactory('MultiSigWallet');
    const multiSigWalletInstance = await multiSigWallet.deploy([account.address, account2.address], 2, 1111);
    await multiSigWalletInstance.deployed();

    const TestERC1155 = await ethers.getContractFactory('TestERC1155');
    const testERC1155Instance = await TestERC1155.deploy(
    );
    await testERC1155Instance.deployed();


}

deployAll()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
