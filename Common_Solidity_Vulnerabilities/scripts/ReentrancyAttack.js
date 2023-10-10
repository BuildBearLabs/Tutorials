const { ethers } = require("hardhat");

// Deploy function
async function deploy() {
  [account] = await ethers.getSigners();
  deployerAddress = account.address;
  console.log(`Deploying contracts using ${deployerAddress}`);

  const EtherStore = await ethers.getContractFactory("EtherStore");
  const EtherStoreInstance = await EtherStore.deploy();
  console.log("EtherStore contract deployed at", EtherStoreInstance.address);
  await EtherStoreInstance.deposit({ value: ethers.utils.parseEther("5.0") });
  const Attacker = await ethers.getContractFactory("Attacker");
  const AttackerInstance = await Attacker.deploy(EtherStoreInstance.address);
  console.log("Attacker contract deployed at", AttackerInstance.address);

  console.log(
    "Balance of the contract Before the attack",
    Number(await ethers.provider.getBalance(EtherStoreInstance.address))
  );
  console.log("Executing the Reentrancy Attack");
  await AttackerInstance.attack({
    value: ethers.utils.parseEther("1.0"),
  });
  console.log(
    "Balance of the contract After the attack",
    Number(await ethers.provider.getBalance(EtherStoreInstance.address))
  );
  console.log("Using the safe vault contract");
  const SafeVault = await ethers.getContractFactory("SafeVault");
  const SafeVaultInstance = await SafeVault.deploy();
  console.log("SafeVault contract deployed at", SafeVaultInstance.address);
  await SafeVaultInstance.deposit({ value: ethers.utils.parseEther("5.0") });
  const Attacker2 = await ethers.getContractFactory("Attacker2");
  const Attacker2Instance = await Attacker2.deploy(SafeVaultInstance.address);
  console.log("Attacker contract deployed at", Attacker2Instance.address);

  console.log(
    "Balance of the contract Before the attack:",
    Number(await ethers.provider.getBalance(SafeVaultInstance.address))
  );

  try {
    await Attacker2Instance.attack({
      value: ethers.utils.parseEther("1.0"),
    });
  } catch (error) {
    console.log("Executing the Reentrancy Attack failed", error);
  }

  console.log(
    "Balance of the contract After the attack:",
    Number(await ethers.provider.getBalance(SafeVaultInstance.address))
  );
}

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
