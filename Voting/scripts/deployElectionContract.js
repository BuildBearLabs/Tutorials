const hre = require("hardhat");
// importing the json file from ../deployments/buildbear/MainContract.json
const mainContractAddress = require("../deployments/buildbear/MainContract.json").address;

async function main() {
  const maincontract = await hre.ethers.getContractAt("MainContract", mainContractAddress);
  const newElectionTransaction = await maincontract.createElection(["class leader election", "to select the class leader"], ["Chandan", "Rahul", "Micky"]);
  const events =  (await newElectionTransaction.wait()).events;
  console.log("Election created");
  // read the events of the transaction and fetch the election address
  console.log(events[0].args);
  const id = String(events[0].args[0]);
  const electionAddress = await maincontract.Elections(id);

  await run(`verify:verify`, {
    address: electionAddress,
    constructorArguments: [
      ["class leader election", "to select the class leader"], ["Chandan", "Rahul", "Micky"]
    ],
  });

}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
