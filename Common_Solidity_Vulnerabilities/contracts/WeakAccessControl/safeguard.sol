// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

contract safeguard is Ownable {

    function mySensitiveFunction(address newowner) public onlyOwner {
        // Some sensitive code here...
        transferOwnership(newowner);
    }
}