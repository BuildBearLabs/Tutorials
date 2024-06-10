// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/governance/TimelockController.sol";

/**
 * @title TimeLock
 * @dev This contract extends the OpenZeppelin TimelockController contract and adds additional functionality for specifying proposers and executors.
 */
contract TimeLock is TimelockController {
    /**
     * @dev Initializes the contract with the given minimum delay, proposers, executors, and default admin.
     * @param minDelay The minimum delay required before executing a proposal.
     * @param proposers The list of addresses that can propose new proposals.
     * @param executors The list of addresses that can execute proposals.
     */
    constructor(uint256 minDelay, address[] memory proposers, address[] memory executors)
        TimelockController(minDelay, proposers, executors, msg.sender)
    {}
}