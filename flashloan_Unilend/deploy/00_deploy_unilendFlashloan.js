const { verify } = require("../hardhat.config");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
    const unilendFlashLoan = await deploy('Flashloan', {
        from: deployer,
        args:[],
        log: true,
    });

    console.log("contract deployed at",unilendFlashLoan.address );

};
module.exports.tags = ['UnilendFlashLoan'];