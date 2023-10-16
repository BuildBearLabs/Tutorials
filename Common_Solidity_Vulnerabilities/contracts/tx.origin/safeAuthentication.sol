// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Fixed Contract using msg.sender
contract safeAuthentication {
    address public owner;

    constructor() {
        owner = msg.sender;
    }
    
    function updateOwner() public {
        // Authenticating the caller using msg.sender
        require(msg.sender == owner,"caller not owner");
        // Perform some action only for the contract owner
        
    }
}