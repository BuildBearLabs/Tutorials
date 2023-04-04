// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.13;
import "./MultiSigWalletModifiers.sol";
import "./MultiSigWalletLogics.sol";

contract MultiSigWallet is MultiSigWalletModifiers, MultiSigWalletLogics {
    constructor(
        address[] memory _owners,
        uint64 _minimumApproversRequired,
        uint64 _freeCancelPeriod
    ) {
        uint8 ownersCount = uint8(_owners.length);
        require(ownersCount > 0, "owner required");
        require(
            _minimumApproversRequired > 0 &&
                _minimumApproversRequired <= ownersCount,
            "invalid minimum approvers count"
        );
        require(_freeCancelPeriod > 0, "freeCancelPeriod should be gt 0");

        for (uint8 i; i < ownersCount; i++) {
            address owner = _owners[i];
            require(!isOwner[owner], "owner is already added");
            require(owner != address(0), "invalid owner");

            owners.push(owner);
            ownerId[msg.sender] = i + 1;
            isOwner[owner] = true;
        }
        minimumApproversRequired = _minimumApproversRequired;
        freeCancelPeriod = _freeCancelPeriod;
    }

    fallback() external payable {
        availableBalance = availableBalance + msg.value;
        emit Deposit(msg.value, msg.sender, msg.data);
    }

    receive() external payable {
        availableBalance = availableBalance + msg.value;
        emit Deposit(msg.value, msg.sender, "");
    }

    function submit(
        address _to,
        uint256 _value,
        bytes calldata _data
    ) external onlyOwners {
        _submit(_to, _value, _data);
    }

    function approve(uint64 _txId) external onlyOwners {
        _approve(_txId);
    }

    function cancel(uint64 _txId) external onlyOwners {
        _cancel(_txId);
    }

    function execute(uint64 _txId) external onlyOwners {
        _execute(_txId);
    }
}
