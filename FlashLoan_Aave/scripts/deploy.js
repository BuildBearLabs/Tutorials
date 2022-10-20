const hre = require('hardhat');

async function main() {

    const FlashLoanExample = await hre.ethers.getContractFactory("FlashLoanExample")
    const flashLoanExample = await FlashLoanExample.deploy('0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5');

    await flashLoanExample.deployed();

    console.log("Factory deployed to:", flashLoanExample.address);
}   

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });