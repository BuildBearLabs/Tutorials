// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Vulnerable Contract using tx.origin
contract VulnerableContract {
    address public owner;

    constructor() {
        owner = msg.sender;
    }
    
    function updateOwner() public {
        // Vulnerability: Using tx.origin to authenticate the caller
        if (tx.origin == owner) {
            owner = msg.sender;
        } 
    }
}