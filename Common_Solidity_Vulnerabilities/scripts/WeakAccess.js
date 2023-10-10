const { ethers } = require("hardhat");

// Deploy function
async function deploy() {
  [account, account2] = await ethers.getSigners();
  deployerAddress = account.address;
  console.log(`Deploying contracts using ${deployerAddress}`);

  const vulnerableContract = await ethers.getContractFactory("WeakAccess");
  const vulnerableContractInstance = await vulnerableContract.deploy();
  console.log(
    "vulnerable contract deployed at",
    vulnerableContractInstance.address
  );

  console.log(
    "Owner of the contract",
    await vulnerableContractInstance.owner()
  );
  await vulnerableContractInstance.connect(account2).mySensitiveFunction();
  await console.log(
    "Owner of the contract After the User called the mySensitiveFunction",
    await vulnerableContractInstance.owner()
  );
  console.log("Using the ownable Contract");
  const safeguard = await ethers.getContractFactory("safeguard");
  const safeguardInstance = await safeguard.deploy();
  console.log("safeguard contract deployed at", safeguardInstance.address);

  console.log("Owner of the contract", await safeguardInstance.owner());

  try {
    await safeguardInstance
      .connect(account2)
      .mySensitiveFunction(account2.address);
  } catch (error) {
    console.log(
      "Calling the mySensitiveFunction by non-owner, Transaction Reverted",
      error
    );
  }
}

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
