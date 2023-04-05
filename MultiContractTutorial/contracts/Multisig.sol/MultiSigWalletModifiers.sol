// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.13;

import "./MultiSigWalletContext.sol";

contract MultiSigWalletModifiers is MultiSigWalletContext {
    modifier onlyOwners() {
        require(isOwner[msg.sender], "only owners can call");
        _;
    }
}
