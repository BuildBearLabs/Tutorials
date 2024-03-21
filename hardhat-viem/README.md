1. Clone and install necessary dependencies

```jsx
git clone https://github.com/BuildBearLabs/Hardhat-Viem.git
cd Hardhat-Viem
npm install
```

1. To install hardhat-viem, run

```jsx
npm install @nomicfoundation/hardhat-viem
```

1. Add the plugin to your hardhat config file

```jsx
require("@nomicfoundation/hardhat-viem");
```

1. Create a [SandBox](https://home.buildbear.io/), copy and paste the RPC URL to the config file under the buildbear network.
2. Use the script for deploying Smart Contract using viem

```jsx
import { formatEther, parseEther } from "viem";
import hre from "hardhat";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = BigInt(currentTimestampInSeconds + 60);

  const lockedAmount = parseEther("0.001");

  const lock = await hre.viem.deployContract("Lock", [unlockTime], {
    value: lockedAmount,
  });

  console.log(
    `Lock with ${formatEther(
      lockedAmount
    )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

1. To deploy contract, run

```jsx
npx hardhat run scripts/deploy.ts --network buildbear
```

Congratulations! We just deployed smart contract using hardhat-viem plugin. See transaction details by navigating to the BuildBear explorer.