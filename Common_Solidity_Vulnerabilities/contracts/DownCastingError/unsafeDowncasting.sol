// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

// unsafe downcasting
contract unsafeDownCasting {
    uint8 public LuckyNumber;

    function setLuckyNumber(uint256 amount) public {
        // Here's the unsafe downcast. If the `amount` is greater than type(uint8).max
        // (which is 255), then only the least significant 8 bits are stored in balance.
        // This could lead to unexpected results due to overflow.
        uint8 number = uint8(amount);

        // store the balance
        LuckyNumber = number;
    }

    function getLuckyNumber() public view returns (uint8) {
        return LuckyNumber;
    }
}