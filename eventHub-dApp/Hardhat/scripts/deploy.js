const { ethers } = require("hardhat");

const main = async () => {
  console.log("Deploying contract...");

  const contractFactory = await ethers.getContractFactory("EventHub");
  const contract = await contractFactory.deploy();

  await contract.waitForDeployment();

  const contractAddress = contract.target;
  console.log("EventHub contract address:", contractAddress);
  console.log("Contract deployed successfully.");
};

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
