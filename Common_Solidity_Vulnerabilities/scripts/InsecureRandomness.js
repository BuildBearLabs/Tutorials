const { ethers } = require("hardhat");

// Deploy function
async function deploy() {
  [account] = await ethers.getSigners();
  deployerAddress = account.address;
  console.log(`Deploying contracts using ${deployerAddress}`);

  const insecureRandomness = await ethers.getContractFactory(
    "InsecureRandomness"
  );
  const insecureRandomnessInstance = await insecureRandomness.deploy({
    value: ethers.utils.parseEther("1.0"),
  });
  console.log(
    "InsecureRandomness contract deployed at",
    insecureRandomnessInstance.address
  );

  const maliciousContract = await ethers.getContractFactory(
    "MaliciousContract"
  );
  const maliciousContractInstance = await maliciousContract.deploy();
  console.log(
    "Malicious contract deployed at",
    maliciousContractInstance.address
  );
  console.log(
    "Balance of the contract Before the attack",
    Number(await ethers.provider.getBalance(insecureRandomnessInstance.address))
  );
  console.log(
    "using the Malicious contract to calculate the _guess and submit value to the contract"
  );
  await maliciousContractInstance.attack(insecureRandomnessInstance.address);
  console.log(
    "Balance of the contract After the attack",
    Number(await ethers.provider.getBalance(insecureRandomnessInstance.address))
  );
}

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
