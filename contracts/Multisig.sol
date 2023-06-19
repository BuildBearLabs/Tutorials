// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

/**
 * @title Multisig Wallet
 */
contract Multisig {
    // Errors //
    error InvalidTxnValue();
    error InvalidMinApproval();
    error NotAdmin(address caller);
    error AlreadyExecuted(uint256 txId);
    error AlreadyApproved(uint256 txId, address admin);
    error NotApprovedYet(uint256 txId, address admin);
    error NotEnoughApprovals(uint256 txId);

    // Events //
    event Deposit(address indexed sender, uint256 indexed value, bytes data);
    event Submit(uint256 indexed txId, address indexed admin);
    event Approve(uint256 indexed txId, address indexed admin);
    event Revoke(uint256 indexed txId, address indexed admin);
    event Execute(
        uint256 indexed txId,
        bool indexed success,
        bytes indexed data
    );

    // State Variables //
    address[] public admins;
    mapping(address => bool) public isAdmin;

    struct Transaction {
        address to;
        uint256 value;
        bytes data;
        bool isExecuted;
    }
    Transaction[] public transactions;

    uint8 internal minApprovals;
    uint256 public availableBalance;
    uint256 public nounce;

    mapping(uint256 => mapping(address => bool)) isApprover;

    // Modifiers //
    modifier onlyAdmin() {
        // revert if not admin
        if (!isAdmin[msg.sender]) {
            revert NotAdmin(msg.sender);
        }
        _;
    }

    modifier notExecuted(uint256 txId) {
        // revert if already executed
        if (transactions[txId].isExecuted) {
            revert AlreadyExecuted(txId);
        }
        _;
    }

    modifier notApproved(uint256 txId) {
        // revert if already approved
        if (isApprover[txId][msg.sender]) {
            revert AlreadyApproved(txId, msg.sender);
        }
        _;
    }

    modifier isApproved(uint256 txId) {
        // revert if not yet approved
        if (!isApprover[txId][msg.sender]) {
            revert NotApprovedYet(txId, msg.sender);
        }
        _;
    }

    // Functions //
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

    receive() external payable {
        availableBalance += msg.value;
        emit Deposit(msg.sender, msg.value, "");
    }

    fallback() external payable {
        availableBalance += msg.value;
        emit Deposit(msg.sender, msg.value, msg.data);
    }

    function submit(
        address _to,
        uint256 _value,
        bytes calldata _data
    ) external onlyAdmin returns (uint256 txId) {
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

    function approve(
        uint256 _txId
    ) external onlyAdmin notApproved(_txId) notExecuted(_txId) {
        isApprover[_txId][msg.sender] = true;
        emit Approve(_txId, msg.sender);
    }

    function revoke(
        uint256 _txId
    ) external onlyAdmin isApproved(_txId) notExecuted(_txId) {
        isApprover[_txId][msg.sender] = false;
        emit Revoke(_txId, msg.sender);
    }

    function execute(uint256 _txId) external onlyAdmin notExecuted(_txId) {
        // revert if not enough approvals
        if (getApprovalCount(_txId) < minApprovals) {
            revert NotEnoughApprovals(_txId);
        }
        Transaction storage txn = transactions[_txId];
        txn.isExecuted = true;

        (bool success, bytes memory data) = txn.to.call{value: txn.value}(
            txn.data
        );
        if (success) {
            nounce++;
        }
        emit Execute(_txId, success, data);
    }

    // Helpers //
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
