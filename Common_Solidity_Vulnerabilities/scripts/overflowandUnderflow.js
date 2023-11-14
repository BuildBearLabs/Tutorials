const { ethers } = require("hardhat");

// Deploy function
async function deploy() {
  [account, account2] = await ethers.getSigners();
  deployerAddress = account.address;
  console.log(`Deploying contracts using ${deployerAddress}`);
  const vulnerableContract = await ethers.getContractFactory("OverflowExample");
  const vulnerableContractInstance = await vulnerableContract.deploy();
  console.log(
    "Vulnerable contract deployed at",
    vulnerableContractInstance.address
  );
  console.log(
    "Balance of the contract",
    Number(await vulnerableContractInstance.getbalance())
  );
  await vulnerableContractInstance.deposit({
    value: ethers.utils.parseEther("1.0"), // depositing 1 Ether
  });
  console.log(
    "Balance of the contract after depositing 1 Ether",
    Number(await vulnerableContractInstance.getbalance())
  );

  console.log("using safeMath libary"); //using SafeMath Libary in the contract
  const SafeMathContract = await ethers.getContractFactory("UsingSafeMath");
  const SafeMathContractInstance = await SafeMathContract.deploy();
  console.log(
    "safeMath contract deployed at",
    SafeMathContractInstance.address
  );
  console.log(
    "Balance of the contract",
    Number(await SafeMathContractInstance.getbalance())
  );

  try {
    await SafeMathContractInstance.deposit({
      value: ethers.utils.parseEther("1.0"), // depositing 1 Ether
    });
  } catch (error) {
    console.log(error);
  }

  console.log(
    "Since we are using safeMath Libary, the deposit Trax is Reverted with: the OverFlow Reason"
  );
}

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
