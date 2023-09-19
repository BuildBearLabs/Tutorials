const { verify } = require("../hardhat.config");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
    const unsafeDownCasting = await deploy('unsafeDownCasting', {
        from: deployer,
        log: true,
    });

    await run(`verify:verify`, {
        address: unsafeDownCasting.address,
    });


};
module.exports.tags = ['unsafeDownCasting'];

//Hello