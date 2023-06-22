// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./IMultisigCore.sol";

/**
 * @title Multisig Core
 */
contract MultisigCore is IMultisigCore {
    // Structs //
    struct Transaction {
        address to;
        uint256 value;
        bytes data;
        bool isExecuted;
    }

    // State Variables //
    address[] public admins;
    mapping(address => bool) public isAdmin;
    Transaction[] public transactions;

    uint8 internal minApprovals;
    uint256 public availableBalance;
    uint256 public nounce;

    mapping(uint256 => mapping(address => bool)) public isApprover;

    // Modifiers //
    /** @notice Requires caller to be Admin */
    modifier onlyAdmin() {
        // revert if not admin
        if (!isAdmin[msg.sender]) {
            revert NotAdmin(msg.sender);
        }
        _;
    }

    /** @notice Requires Transaction not executed already */
    modifier notExecuted(uint256 txId) {
        // revert if already executed
        if (transactions[txId].isExecuted) {
            revert AlreadyExecuted(txId);
        }
        _;
    }

    /** @notice Requires Transaction not approved already by the caller */
    modifier notApproved(uint256 txId) {
        // revert if already approved
        if (isApprover[txId][msg.sender]) {
            revert AlreadyApproved(txId, msg.sender);
        }
        _;
    }

    /** @notice Requires Transaction to be approved by the caller */
    modifier isApproved(uint256 txId) {
        // revert if not yet approved
        if (!isApprover[txId][msg.sender]) {
            revert NotApprovedYet(txId, msg.sender);
        }
        _;
    }

    // Functions //
    /**
     * @param _admins Admin addresses of the Multisig
     * @param _minApprovals Minimum Approvals required to execute
     */
    constructor(address[] memory _admins, uint8 _minApprovals) {
        admins = _admins;

        if (_minApprovals > _admins.length) {
            revert InvalidMinApproval();
        }
        minApprovals = _minApprovals;

        for (uint8 i; i < _admins.length; i++) {
            isAdmin[_admins[i]] = true;
        }
    }

    /**
     * @notice Submit new Transaction
     * @param _to To address for the Transaction
     * @param _value Value to send in the Transaction
     * @param _data Data to send with the Transaction
     * @dev onlyAdmin is not checked here, should be done while inheriting
     */
    function _submit(
        address _to,
        uint256 _value,
        bytes calldata _data
    ) internal returns (uint256 txId) {
        if (_value > availableBalance) {
            revert InvalidTxnValue();
        }
        transactions.push(
            Transaction({
                to: _to,
                value: _value,
                data: _data,
                isExecuted: false
            })
        );
        availableBalance -= _value;
        txId = transactions.length - 1;

        emit Submit(txId, msg.sender);
        return txId;
    }

    /**
     * @notice Approve a Transaction
     * @param _txId Transaction id
     * @dev onlyAdmin is not checked here, should be done while inheriting
     */
    function _approve(
        uint256 _txId
    ) internal notApproved(_txId) notExecuted(_txId) {
        isApprover[_txId][msg.sender] = true;
        emit Approve(_txId, msg.sender);
    }

    /**
     * @notice Revoke an Approval for a Transaction
     * @param _txId Transaction id
     * @dev onlyAdmin is not checked here, should be done while inheriting
     */
    function _revoke(
        uint256 _txId
    ) internal isApproved(_txId) notExecuted(_txId) {
        isApprover[_txId][msg.sender] = false;
        emit Revoke(_txId, msg.sender);
    }

    /**
     * @notice Execute an Approved Transaction
     * @param _txId Transaction id
     * @dev onlyAdmin is not checked here, should be done while inheriting
     */
    function _execute(uint256 _txId) internal notExecuted(_txId) {
        // revert if not enough approvals
        if (getApprovalCount(_txId) < minApprovals) {
            revert NotEnoughApprovals(_txId);
        }
        Transaction storage txn = transactions[_txId];
        txn.isExecuted = true;
        nounce++;

        (bool success, bytes memory data) = txn.to.call{value: txn.value}(
            txn.data
        );
        if (!success) {
            // We need to add the value back in the availableBalance else it will be locked forever
            availableBalance += txn.value;
        }
        emit Execute(_txId, success, data);
    }

    // Helpers //
    /**
     * @notice Get Approval Count for a Transaction
     * @param _txId Transaction id
     */
    function getApprovalCount(
        uint256 _txId
    ) internal view returns (uint8 count) {
        for (uint8 i; i < admins.length; i++) {
            if (isApprover[_txId][admins[i]]) {
                count++;
            }
        }
    }
}
