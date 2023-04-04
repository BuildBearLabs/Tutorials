// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.13;

import "./MultiSigWalletContext.sol";

contract MultiSigWalletLogics is MultiSigWalletContext {
    function _submit(
        address _to,
        uint256 _value,
        bytes calldata _data
    ) internal {
        require(_value <= availableBalance, "balance is not enough");

        Transaction memory newTransaction = Transaction({
            value: _value,
            data: _data,
            genesisDate: uint64(block.timestamp),
            to: _to,
            creatorId: uint8(ownerId[msg.sender]),
            isExecuted: false,
            isCancelled: false,
            isFailed: false
        });
        transactions.push(newTransaction);
        uint256 txCounts = transactions.length - 1;
        _approve(txCounts);
        availableBalance = availableBalance - _value;
        emit Submit(
            _value,
            _data,
            uint64(txCounts),
            uint32(block.timestamp),
            _to
        );
    }

    function _approve(uint256 _txId) internal {
        Transaction memory txm = transactions[_txId];
        require(!txm.isCancelled, "this transaction is cancelled");
        require(!txm.isExecuted, "this transaction is excecuted");
        require(
            !isApprover[uint128(_txId)][msg.sender],
            "you already approved this transaction"
        );

        isApprover[uint128(_txId)][msg.sender] = true;
        emit Approve(uint64(_txId), msg.sender, uint32(block.timestamp));
    }

    function _cancel(uint256 _txId) internal {
        Transaction memory txm = transactions[_txId];
        require(!txm.isCancelled, "this transaction is already cancelled");
        require(!txm.isExecuted, "this transaction is already executed");

        uint8 senderId = uint8(ownerId[msg.sender]);
        require(
            txm.creatorId == senderId ||
                uint64(block.timestamp) - txm.genesisDate > freeCancelPeriod,
            "only creator can cancel this transaction or wait till freeCancelPeriod"
        );

        Transaction storage txs = transactions[_txId];
        txs.isCancelled = true;
        emit Cancel(uint64(_txId), uint32(block.timestamp));
    }

    function _execute(uint256 _txId) internal {
        require(_txId < transactions.length, "transaction doesn't exist");
        require(
            _approvalsCount(_txId) >= uint8(minimumApproversRequired),
            "transaction not approved by minimum required"
        );

        Transaction memory txm = transactions[_txId];
        require(!txm.isCancelled, "this transaction is cancelled");
        require(!txm.isExecuted, "this transaction is already executed");

        Transaction storage txs = transactions[_txId];
        txs.isExecuted = true;

        (bool success, ) = txm.to.call{value: txm.value}(txm.data);
        if (success) {
            nonce++;
            emit Execute(uint64(_txId), "Successful", uint32(block.timestamp));
        } else {
            emit Execute(uint64(_txId), "isReverted", uint32(block.timestamp));
        }
    }

    function _approvalsCount(uint256 _txId) internal view returns (uint8) {
        uint8 ownersCount = uint8(owners.length);
        uint8 approvalsCount;
        for (uint8 i; i < ownersCount; i++) {
            if (isApprover[_txId][owners[i]]) {
                approvalsCount++;
            }
        }
        return approvalsCount;
    }
}
