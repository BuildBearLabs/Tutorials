// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import the SafeMath library
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract UsingSafeMath {
    using SafeMath for uint;

    uint public balance;

    constructor(){
        balance = type(uint256).max;
    }

    function deposit() public payable {
        balance.add(msg.value);
    }

    function withdraw(uint256 _amount,address payable owner) public {
        require(balance >= _amount, "Insufficient balance");
        balance.sub(_amount);
        owner.transfer(_amount);
    }

    function getbalance() public view returns(uint){
        return balance;
    }
}