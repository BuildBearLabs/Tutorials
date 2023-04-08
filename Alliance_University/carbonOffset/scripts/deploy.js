const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contract with the account: ", deployer.address);
    console.log("Account balance: ", (await deployer.getBalance()).toString());
    const  reg= await ethers.getContractFactory("regulator");
    const regDep = await reg.deploy();
    console.log("regulator address: ", regDep.address);
    const cToken = await ethers.getContractFactory("carbonToken");
    const token = await cToken.deploy(regDep.address);
    console.log("cToken address:", token.address)
}
main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});