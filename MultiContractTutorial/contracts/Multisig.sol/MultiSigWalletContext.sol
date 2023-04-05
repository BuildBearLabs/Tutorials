// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.13;

import "./IMultiSigWallet.sol";

contract MultiSigWalletContext is IMultiSigWallet {
    address[] public owners;
    uint128 public nonce;
    uint64 internal minimumApproversRequired;
    uint64 public freeCancelPeriod;
    uint256 public availableBalance;
    mapping(address => bool) public isOwner;
    mapping(address => uint256) public ownerId;
    mapping(uint256 => mapping(address => bool)) public isApprover;
    Transaction[] public transactions;
}
