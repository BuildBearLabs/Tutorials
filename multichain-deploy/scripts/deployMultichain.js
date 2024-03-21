const { multichain, web3 } = require("hardhat");
  async function main() {
    const deployerAccounts = await web3.eth.getAccounts();
    const deployer = deployerAccounts[0];
    const networkArguments = {
    sepolia: {
          args: [deployer],
          initData: {
            initMethodName: "setMessage",
            initMethodArgs: ["sepolia"],
           },
          },
    mumbai: {
          args: [deployer],
          initData: {
            initMethodName: "setMessage",
            initMethodArgs: ["mumbai"],
           },
          },
    holesky: {
          args: [deployer],
          initData: {
            initMethodName: "setMessage",
            initMethodArgs: ["holesky"],
           },
          },
    };
    const deploymentResult = await multichain.deployMultichain("Greeter", networkArguments);

if (deploymentResult) {
    const { transactionHash, domainIDs } = deploymentResult;
    await multichain.getDeploymentInfo(transactionHash, domainIDs);
    }
 }

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

