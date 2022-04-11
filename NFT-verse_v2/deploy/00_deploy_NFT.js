const func = async function (hre) {
  const { getNamedAccounts, deployments } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;
  await deploy("NFT", {
    from: deployer,
    log: true,
  });

}
func.tags = ["NFT"];

module.exports = func;
