// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Box
 * @dev This contract allows an owner to store and retrieve a single unsigned integer value.
 */
contract Box is Ownable {
    uint256 private s_number;

    /**
     * @dev Emitted when the stored number is changed.
     * @param number The new number that was stored.
     */
    event NumberChanged(uint256 number);

    /**
     * @dev Stores a new number in the contract.
     * @param newNumber The new number to store.
     * @notice Only the contract owner can call this function.
     */
    function store(uint256 newNumber) public onlyOwner {
        s_number = newNumber;
        emit NumberChanged(newNumber);
    }

    /**
     * @dev Returns the currently stored number.
     * @return The stored number.
     */
    function getNumber() external view returns (uint256) {
        return s_number;
    }
}