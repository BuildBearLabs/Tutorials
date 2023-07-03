const { verify } = require("../hardhat.config");

module.exports = async ({ getNamedAccounts, deployments, run }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
    const erc6551account = await deploy('ERC6551Account', {
        from: deployer,
        log: true,
    });

};
module.exports.tags = ['ERC6551Account'];