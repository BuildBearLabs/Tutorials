// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract IncorrectCalculation {

    //functions that might cause incorrect calculation error
    function div(uint256 a, uint256 b) public pure returns(uint256){
        return a / b;
    }

    function sub(uint256 a, uint256 b) public pure returns(uint256){
        return (a - b);
    }

    function Average(uint256 a, uint256 b) public pure returns(uint256){
        return (a + b )/2;
    }
}