const { verify } = require("../hardhat.config");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
    const royaltyNFT = await deploy('RoyaltyNFT', {
        from: deployer,
        args:[deployer,1000],
        log: true,
    });

    console.log("contract deployed at",royaltyNFT.address );

    await run(`verify:verify`, {
        address: royaltyNFT.address,
        constructorArguments:[deployer,1000],
    });


};
module.exports.tags = ['RoyaltyNFT'];