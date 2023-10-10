const { ethers } = require("hardhat");

// Deploy function
async function deploy() {
  [account] = await ethers.getSigners();
  deployerAddress = account.address;
  console.log(`Deploying contracts using ${deployerAddress}`);
  const unsafeDownCasting = await ethers.getContractFactory(
    "unsafeDownCasting"
  );
  const unsafeDownCastingInstance = await unsafeDownCasting.deploy();
  await unsafeDownCastingInstance.deployed();

  console.log(
    "unsafe Downcasting contract deployed at",
    unsafeDownCastingInstance.address
  );
  const luckynumber = 300;
  console.log("setting the lucky number to", luckynumber);
  await unsafeDownCastingInstance.setLuckyNumber(luckynumber);
  const storedLuckyNumber = await unsafeDownCastingInstance.getLuckyNumber();

  console.log("LuckyNumber stored is", storedLuckyNumber);

  console.log("Use the contract with openzeppelin SafeCast libary");
  const safeDownCasting = await ethers.getContractFactory("safeDownCasting");
  const safeDownCastingInstance = await safeDownCasting.deploy();
  await safeDownCastingInstance.deployed();

  console.log(
    "safe Downcasting contract deployed at",
    safeDownCastingInstance.address
  );

  console.log("setting the lucky number to", luckynumber);
  try {
    await safeDownCastingInstance.setLuckyNumber(luckynumber);
  } catch (error) {
    console.log(error.data.message);
  }
  console.log("Since we are using safeCase Libary, the Traxs has reverted");
}

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
