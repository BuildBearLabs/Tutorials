// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "contracts/Greeter.sol";


contract GreeterTest is Test{
    Greeter public greeter;

    function setUp() public {
        greeter = new Greeter();
        greeter.sum(2,3);
    }

     function testSaveLuckyNumber() public {
        uint256 luckyNumber = 5;
        greeter.saveLuckyNumber(luckyNumber);
        assertEq(greeter.getMyLuckyNumber(), luckyNumber);
    }

    function testUpdateLuckyNumber() public {
        uint256 oldLuckyNumber = 5;
        uint256 newLuckyNumber = 9;
        greeter.saveLuckyNumber(oldLuckyNumber);
        greeter.updateLuckyNumber(oldLuckyNumber, newLuckyNumber);
        assertEq(greeter.getMyLuckyNumber(), newLuckyNumber);
    }

  

}