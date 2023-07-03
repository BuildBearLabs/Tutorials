const { verify } = require("../hardhat.config");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
    const basicNFT = await deploy('NFT', {
        from: deployer,
        log: true,
    });


};
module.exports.tags = ['NFT'];