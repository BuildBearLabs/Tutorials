import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";


const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
 
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const nftcontract = await deploy("NestableNFT", {
    from: deployer,
    // Contract constructor arguments
    args: [],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  await hre.run("verify:verify", {
    address: nftcontract.address,
    constructorArguments: [],
  });

  // Get the deployed contract
  // const yourContract = await hre.ethers.getContract("YourContract", deployer);
};

export default deployYourContract;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployYourContract.tags = ["NestableNFT"];
