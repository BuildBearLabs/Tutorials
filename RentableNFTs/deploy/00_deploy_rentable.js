const { verify } = require("../hardhat.config");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
    const rentableNFT = await deploy('RentableNFT', {
        from: deployer,
        log: true,
    });
    await run(`verify:verify`, {
        address: rentableNFT.address,

    });

};
module.exports.tags = ['RentableNFT'];