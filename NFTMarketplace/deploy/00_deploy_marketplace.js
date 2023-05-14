const { verify } = require("../hardhat.config");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
    const marketplace = await deploy('Marketplace', {
        from: deployer,
        log: true,
    });
    await run(`verify:verify`, {
        address: marketplace.address,
    });

};
module.exports.tags = ['Marketplace'];