const { ethers } = require("hardhat");

// Deploy function
async function deploy() {
  [account] = await ethers.getSigners();
  deployerAddress = account.address;
  console.log(`Deploying contracts using ${deployerAddress}`);

  const incorrectCalculation = await ethers.getContractFactory(
    "IncorrectCalculation"
  );
  const IncorrectCalculationInstance = await incorrectCalculation.deploy();
  console.log(
    "correctCalculation contract deployed at",
    IncorrectCalculationInstance.address
  );
  console.log(
    "Dividing 10 by 4",
    Number(await IncorrectCalculationInstance.div(10, 4))
  );
  try {
    await IncorrectCalculationInstance.sub(4, 5);
  } catch (error) {
    console.log(
      "Sub 4-5 transaction failed with no proper revert reason:",
      error.errorName
    );
  }

  console.log("Use the contract with openzeppelin SafeMath libary");
  const correctCalculation = await ethers.getContractFactory(
    "CorrectCalculation"
  );
  const correctCalculationInstance = await correctCalculation.deploy();
  console.log(
    "correctCalculation contract deployed at",
    correctCalculationInstance.address
  );
  console.log(
    "Dividing 10 by 4",
    Number(await correctCalculationInstance.div(10, 4))
  );
  try {
    await correctCalculationInstance.sub(4, 5);
  } catch (error) {
    console.log("Sub 4-5 transaction reverted with a reason:", error.reason);
  }
}

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
