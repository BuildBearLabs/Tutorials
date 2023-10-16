// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

//overflow vulnerability Example contract
contract OverflowExample {
    uint public balance;
    function deposit() public payable {
        balance += msg.value;
    }
    constructor(){
        balance = type(uint256).max;
    }

    function withdraw(uint256 _amount,address payable owner) public {
        require(balance >= _amount, "Insufficient balance");
        balance -= _amount;
        owner.transfer(_amount);
    }

    function getbalance() public view returns(uint){
        return balance;
    }
}