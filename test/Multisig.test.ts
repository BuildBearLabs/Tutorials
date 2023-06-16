import { ethers } from "hardhat";

describe("Multisig", function () {
  async function deployMultisigFixture() {
    const [admin1, admin2, admin3, other1, other2, other3] =
      await ethers.getSigners();
    const multisigFactory = await ethers.getContractFactory("Multisig");
    const multisigContract = await multisigFactory.deploy(
      [admin1, admin2, admin3],
      2
    );

    return {
      multisigContract,
      multisigFactory,
      admin1,
      admin2,
      admin3,
      other1,
      other2,
      other3,
    };
  }
  describe("Deployment", function () {});
});
