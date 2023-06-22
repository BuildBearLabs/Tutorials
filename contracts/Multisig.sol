// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;
import "./MultisigLib/MultisigCore.sol";

/**
 * @title Multisig Wallet
 */
contract Multisig is MultisigCore {
    // Functions //
    /**
     * @param _admins Admin addresses of the Multisig
     * @param _minApprovals Minimum Approvals required to execute
     */
    constructor(
        address[] memory _admins,
        uint8 _minApprovals
    ) MultisigCore(_admins, _minApprovals) {}

    receive() external payable {
        availableBalance += msg.value;
        emit Deposit(msg.sender, msg.value, "");
    }

    fallback() external payable {
        availableBalance += msg.value;
        emit Deposit(msg.sender, msg.value, msg.data);
    }

    /**
     * @notice Submit new Transaction
     * @param _to To address for the Transaction
     * @param _value Value to send in the Transaction
     * @param _data Data to send with the Transaction
     */
    function submit(
        address _to,
        uint256 _value,
        bytes calldata _data
    ) external onlyAdmin returns (uint256 txId) {
        txId = _submit(_to, _value, _data);
        return txId;
    }

    /**
     * @notice Approve a Transaction
     * @param _txId Transaction id
     * @dev onlyAdmin is not checked here, should be done while inheriting
     */
    function approve(uint256 _txId) external onlyAdmin {
        _approve(_txId);
    }

    /**
     * @notice Revoke an Approval for a Transaction
     * @param _txId Transaction id
     * @dev onlyAdmin is not checked here, should be done while inheriting
     */
    function revoke(uint256 _txId) external onlyAdmin {
        _revoke(_txId);
    }

    /**
     * @notice Execute an Approved Transaction
     * @param _txId Transaction id
     * @dev onlyAdmin is not checked here, should be done while inheriting
     */
    function execute(uint256 _txId) external onlyAdmin {
        _execute(_txId);
    }
}
