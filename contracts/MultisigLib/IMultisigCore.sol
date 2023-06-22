// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

interface IMultisigCore {
    // Errors //
    /** @notice Throw if submited Txn value > availableBalance */
    error InvalidTxnValue();

    /** @notice Throw if minApproval > admins.length */
    error InvalidMinApproval();

    /**
     * @notice Throw if not Admin
     * @param caller Caller of the function
     */
    error NotAdmin(address caller);

    /**
     * @notice Throw if Txn is Already Executed
     * @param txId Transaction id
     */
    error AlreadyExecuted(uint256 txId);

    /**
     * @notice Throw if Txn is Already Approved
     * @param txId Transaction id
     * @param admin Admin that called the function
     */
    error AlreadyApproved(uint256 txId, address admin);

    /**
     * @notice Throw if Txn is Not Approved Yet
     * @param txId Transaction id
     * @param admin Admin that called the function
     */
    error NotApprovedYet(uint256 txId, address admin);

    /**
     * @notice Throw if Txn does not have enough approvals
     * @param txId Transaction id
     */
    error NotEnoughApprovals(uint256 txId);

    // Events //
    /**
     * @notice Emitted when someone deposits to contract
     * @param sender Transaction id
     * @param value Value deposited
     * @param data Data from of deposit transaction
     */
    event Deposit(address indexed sender, uint256 indexed value, bytes data);

    /**
     * @notice Emitted when new Transaction is Submited
     * @param txId Transaction id
     * @param admin Admin that called the function
     */
    event Submit(uint256 indexed txId, address indexed admin);

    /**
     * @notice Emitted when an admin Approves a Transaction
     * @param txId Transaction id
     * @param admin Admin that called the function
     */
    event Approve(uint256 indexed txId, address indexed admin);

    /**
     * @notice Emitted when an admin Revokes the Approval of a Transaction
     * @param txId Transaction id
     * @param admin Admin that called the function
     */
    event Revoke(uint256 indexed txId, address indexed admin);

    /**
     * @notice Emitted when an admin Executes an Approved Transaction
     * @param txId Transaction id
     * @param success Success from transaction execution call
     * @param data Data from transaction execution call
     */
    event Execute(
        uint256 indexed txId,
        bool indexed success,
        bytes indexed data
    );
}
