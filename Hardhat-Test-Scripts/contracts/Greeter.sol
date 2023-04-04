//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract Greeter {
    mapping(address => uint256) public ownerToLuckyNumber;

    constructor() {
        console.log("Deployed Greeter by '%s'", msg.sender);
    }

    function sum(uint256 a, uint256 b) public pure returns (uint256) {
        return a + b;
    }

    function getMyLuckyNumber() external view returns (uint256) {
        return ownerToLuckyNumber[msg.sender];
    }

    modifier luckyNumberGuard() {
        /// @dev if it's not 0 then owner already has a lucky number
        require(
            ownerToLuckyNumber[msg.sender] == 0,
            "You already have a lucky number."
        );
        _;
    }

    modifier luckyNumberNotZero(uint256 _luckyNumber) {
        require(_luckyNumber != 0, "Lucky number should not be 0.");
        _;
    }

    function saveLuckyNumber(
        uint256 _luckyNumber
    ) external luckyNumberGuard luckyNumberNotZero(_luckyNumber) {
        ownerToLuckyNumber[msg.sender] = _luckyNumber;
    }

    modifier shouldMatchPreviousLuckyNumber(uint256 _luckyNumber) {
        require(
            ownerToLuckyNumber[msg.sender] == _luckyNumber,
            "Not your previous lucky number."
        );
        _;
    }

    function updateLuckyNumber(
        uint256 _luckyNumber,
        uint256 _newLuckyNumber
    ) external shouldMatchPreviousLuckyNumber(_luckyNumber) {
        ownerToLuckyNumber[msg.sender] = _newLuckyNumber;
    }
}
