import { ethers } from "hardhat";

async function main() {
  const [admin1, admin2, admin3] = await ethers.getSigners();
  const multisigFactory = await ethers.getContractFactory("Multisig");

  console.log("Deploying the Multisig Wallet contract...");
  const multisig = await multisigFactory.deploy([admin1, admin2, admin3], 2);

  console.log(
    `Simple with deployed to ${await multisig.getAddress()} by ${
      admin1.address
    }`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
