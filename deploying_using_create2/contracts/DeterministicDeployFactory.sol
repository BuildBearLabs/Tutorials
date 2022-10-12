// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract DeterministicDeployFactory {
    event Deploy(address addr);

    function deployUsingCreate2(bytes memory bytecode, string memory _salt) external returns (address) {
        address addr;
        assembly {
            addr := create2(0, add(bytecode, 0x20), mload(bytecode), _salt)
            if iszero(extcodesize(addr)) {
        revert(0, 0)
        }
    }

    emit Deploy(addr);
    return addr;
    }
}

// This contract can be deployed on multiple EVM Chains.  However, it MUST be deployed using the same nonce; the nonce will impact the address at which this contract will get deployed.  The address of this factory contract will impact the address of any other contract that this factory contract deploys using the "deployUsingCreate2"