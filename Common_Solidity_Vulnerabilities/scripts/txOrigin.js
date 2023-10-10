const { ethers } = require("hardhat");

// Deploy function
async function deploy() {
  [account] = await ethers.getSigners();
  deployerAddress = account.address;
  console.log(`Deploying contracts using ${deployerAddress}`);

  const vulnerableContract = await ethers.getContractFactory(
    "VulnerableContract"
  );
  const vulnerableContractInstance = await vulnerableContract.deploy();
  console.log(
    "vulnerable contract deployed at",
    vulnerableContractInstance.address
  );

  const Attacker = await ethers.getContractFactory("Delegate");
  const AttackerInstance = await Attacker.deploy(
    vulnerableContractInstance.address
  );
  console.log("Attacker contract deployed at", AttackerInstance.address);
  console.log(
    "Owner of the contract Before the attack",
    await vulnerableContractInstance.owner()
  );
  console.log("User calling the mint function in the attack contract");
  await AttackerInstance.mint();
  console.log(
    "Owner of the contract After the attack",
    await vulnerableContractInstance.owner()
  );
  console.log("using the msg.sender");
  const fixedContract = await ethers.getContractFactory("safeAuthentication");
  const fixedContractInstance = await fixedContract.deploy();
  console.log(
    "safeAuthentication contract deployed at",
    fixedContractInstance.address
  );

  const Attacker1 = await ethers.getContractFactory("Delegate");
  const Attacker1Instance = await Attacker1.deploy(
    fixedContractInstance.address
  );
  console.log("Attacker contract deployed at", Attacker1Instance.address);
  console.log(
    "Owner of the contract Before the attack",
    await fixedContractInstance.owner()
  );
  console.log("User calling the mint function in the attack contract");

  try {
    await Attacker1Instance.mint();
  } catch (error) {
    console.log(error);
  }
}

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
