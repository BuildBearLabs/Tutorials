// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SafeVault {
    mapping(address => uint) private balance;

    function deposit() public payable {
        balance[msg.sender] += msg.value;
    }

    function withdraw() public {
        uint amount = balance[msg.sender];
        require(amount > 0 ether ,"0 balance");
        balance[msg.sender] = 0;                     // Effects
        require(payable(msg.sender).send(amount));  // Interactions
    }
}