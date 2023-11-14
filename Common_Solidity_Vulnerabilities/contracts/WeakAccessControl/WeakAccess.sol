// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract WeakAccess {
    address public owner;

    // Setting the owner as the deployer of the contract.
    constructor() {
        owner = msg.sender; 
    }

    function mySensitiveFunction() public {
        owner= msg.sender;
    }
}