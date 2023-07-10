// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

// Import the SafeCast library
import "@openzeppelin/contracts/utils/math/SafeCast.sol";

// safe downcasting
contract safeDownCasting {
    using SafeCast for uint256; // Use SafeCast for uint256

    uint public LuckyNumber;

    function setLuckyNumber(uint256 _amount) public {
        // Use the `toUint8()` function from `SafeCast` to safely downcast `amount`.
        // If `amount` is greater than `type(uint8).max`, it will revert.
        // or keep the same uint256 with amount.
        uint8 amount = _amount.toUint8(); // or keep uint256
        LuckyNumber = amount;
    }

    function getLuckyNumber() public view returns (uint) {
        return LuckyNumber;
    }
}
