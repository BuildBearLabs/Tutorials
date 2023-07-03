const { verify } = require("../hardhat.config");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
    const safeDownCasting = await deploy('safeDownCasting', {
        from: deployer,
        log: true,
    });

    await run(`verify:verify`, {
        address: safeDownCasting.address,
    });


};
module.exports.tags = ['safeDownCasting'];