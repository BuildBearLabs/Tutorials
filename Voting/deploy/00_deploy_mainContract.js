const { verify } = require("../hardhat.config");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
    const maincontract = await deploy('MainContract', {
        from: deployer,
        log: true,
    });
    await run(`verify:verify`, {
        address: maincontract.address,
    });

};
module.exports.tags = ['MainContract'];