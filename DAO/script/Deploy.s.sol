// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "forge-std/Script.sol";
import "forge-std/console.sol";
import "../src/GovToken.sol";
import "../src/MyGovernor.sol";
import "../src/TimeLock.sol";
import "../src/Box.sol";

contract DeployScript is Script {
    function run() public {
        vm.startBroadcast();
        address[] memory proposers = new address[](1);
        address[] memory executors = new address[](1);

        proposers[0] = 0xbdc1E0633A558Dd63Df72E377154F96b7E18b429;
        executors[0] = 0x0e5Dc14A229DfB4356102D57823b5D549Cc3FfF8;
        //Deploy Timelock
         TimeLock timeLock = new TimeLock(3600,proposers,executors);
         console.log("TimeLock deployed to:", address(timeLock));
        //Deploy Box
        Box box = new Box();
        console.log("Box deployed to:", address(box));
        // Deploy GovToken
        GovToken govToken = new GovToken();
        console.log("GovToken deployed to:", address(govToken));
        // // Deploy MyGovernor
        MyGovernor myGovernor = new MyGovernor(govToken,timeLock);
        console.log("MyGovernor deployed to:", address(myGovernor));
      
        vm.stopBroadcast();
    }
}