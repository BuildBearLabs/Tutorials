// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.13;

interface IMultiSigWallet {
    struct Transaction {
        uint256 value;
        bytes data;
        uint64 genesisDate;
        address to;
        uint8 creatorId;
        bool isExecuted;
        bool isCancelled;
        bool isFailed;
    }

    event Submit(
        uint256 indexed value,
        bytes indexed data,
        uint64 indexed txId,
        uint32 date,
        address to
    );
    event Approve(uint64 indexed txId, address indexed approver, uint32 date);
    event Cancel(uint64 indexed txId, uint32 date);
    event Execute(uint64 indexed txId, bytes10 indexed status, uint32 date);
    event Deposit(uint256 indexed value, address indexed sender, bytes data);
}
