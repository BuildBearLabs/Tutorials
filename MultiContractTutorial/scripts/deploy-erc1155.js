const { ethers } = require('hardhat');

// Deploy function
async function deploy() {
    [account] = await ethers.getSigners();
    deployerAddress = account.address;
    console.log(`Deploying contracts using ${deployerAddress}`);
    const TestERC1155 = await ethers.getContractFactory('TestERC1155');
    const testERC1155Instance = await TestERC1155.deploy(
    );
    await testERC1155Instance.deployed();
    await run(`verify:verify`, {
        address: testERC1155Instance.address,
    });

}

deploy()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
