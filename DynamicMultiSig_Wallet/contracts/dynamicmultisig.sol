// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract dynamicmultisig{
	event Deposit(address indexed sender, uint amount, uint balance);

	event SubmitTransaction(
		address indexed owner,
		uint indexed txIndex,
		address indexed to,
		uint value,
		bytes data
	);
	event SubmitProposal(address indexed owner, uint indexed ppsIndex);


	event ConfirmTransaction(address indexed owner, uint indexed txIndex);
	event ConfirmProposal(address indexed owner, uint indexed ppsIndex);

    event RevokeConfirmation(address indexed owner, uint indexed txIndex);
	event RevokeProposal(address indexed owner, uint indexed ppsIndex);

	event ExecuteTransaction(address indexed owner, uint indexed txIndex);
	event ExecuteProposal(address indexed owner, uint indexed ppsIndex);

	address[] public owners;
	mapping(address => bool) public isOwner;
	uint public numConfirmationsRequired;

	struct Transaction {
		address to;
		uint value;
		bytes data;
		bool executed;
		uint numConfirmations;
	}

	struct Proposal {
		address newOwner;
		bool executed;
		uint numConfirmations;
	}

	// mapping: map txIndex to owner address => tx confirmation
	mapping(uint => mapping(address => bool)) isConfirmed;

	// mapping: map ppsIndex to owner address => pps confirmation
	mapping(uint => mapping(address => bool)) ppsIsConfirmed;

	Transaction[] public transactions;
	Proposal[] public proposals;

	modifier onlyOwner() {
		require(isOwner[msg.sender], "not an owner");
		_;
	}

	modifier txExists(uint _txIndex){
		require(_txIndex < transactions.length, "transaction does not exist");
		_;
	}

	modifier ppsExists(uint _ppsIndex){
		require(_ppsIndex < proposals.length, "proposal does not exist");
		_;
	}

	modifier notExecuted(uint _txIndex){
		require(!transactions[_txIndex].executed, "transaction already executed");
		_;
	}

	modifier ppsNotExecuted(uint _ppsIndex){
		require(!proposals[_ppsIndex].executed, "proposal already executed");
		_;
	}

	modifier notConfirmed(uint _txIndex){
		require(!isConfirmed[_txIndex][msg.sender], "transaction already confirmed");
		_;
	}

	modifier ppsNotConfirmed(uint _ppsIndex){
		require(!ppsIsConfirmed[_ppsIndex][msg.sender], "proposal already confirmed");
		_;
	}

	constructor(address[] memory _owners, uint _numConfirmationsRequired){
		require(_owners.length > 0, "owners required!");
		require(
			_numConfirmationsRequired > 0 &&
			_numConfirmationsRequired < _owners.length,
			"invalid number of required confirmations"
		);

		for(uint i = 0; i < _owners.length; i++){
			address owner = _owners[i];

			require(owner != address(0), "invalid owner");
			require(!isOwner[owner], "owners must be unique!");

			isOwner[owner] = true;
			owners.push(owner);
		}

		numConfirmationsRequired = _numConfirmationsRequired;
	}

	// allow contract receive Ether
	receive() external payable {
		emit Deposit(msg.sender, msg.value, address(this).balance);
	}

	/** Submit Transaction
	 */
	function submitTransaction(
		address _to, 
		uint _value, 
		bytes memory _data
	) public onlyOwner {

		uint txIndex = transactions.length;

		transactions.push(
			Transaction({
				to: _to,
				value: _value,
				data: _data,
				executed: false,
				numConfirmations: 0
		}));

		emit SubmitTransaction(msg.sender, txIndex, _to, _value, _data);
	}

	// Propose new owner
	function addNewOwner(address _newOwner) 
	public
	onlyOwner
	{
		// require _newOwner not existing
		require(!isOwner[_newOwner], "Can't add existing owner");

		uint ppsIndex = proposals.length;

		proposals.push(
			Proposal({
				newOwner: _newOwner,
				executed: false,
				numConfirmations: 0
		}));

		emit SubmitProposal(_newOwner, ppsIndex);
	}

	function comfirmTransaction(uint _txIndex)
		public
		onlyOwner
		txExists(_txIndex)
        notExecuted(_txIndex)
        notConfirmed(_txIndex)
	{
		Transaction storage transaction = transactions[_txIndex];
		transaction.numConfirmations += 1;
        isConfirmed[_txIndex][msg.sender] = true;

        emit ConfirmTransaction(msg.sender, _txIndex);
	}

	function comfirmProposal(uint _ppsIndex)
		public
        onlyOwner
        ppsExists(_ppsIndex)
        ppsNotExecuted(_ppsIndex)
		ppsNotConfirmed(_ppsIndex)
	{
		Proposal storage proposal = proposals[_ppsIndex];
		proposal.numConfirmations += 1;
        ppsIsConfirmed[_ppsIndex][msg.sender] = true;

        emit ConfirmProposal(msg.sender, _ppsIndex);
		
	}

	function executeTransaction(uint _txIndex)
        public
        onlyOwner
        txExists(_txIndex)
        notExecuted(_txIndex)
    {
        Transaction storage transaction = transactions[_txIndex];

        require(
            transaction.numConfirmations >= numConfirmationsRequired,
            "cannot execute transaction"
        );

        transaction.executed = true;

        (bool success, ) = transaction.to.call{value: transaction.value}(
            transaction.data
        );
        require(success, "transaction failed");

        emit ExecuteTransaction(msg.sender, _txIndex);
    }

	function executeProposal(uint _ppsIndex)
        public
        onlyOwner
		ppsExists(_ppsIndex)
		ppsNotExecuted(_ppsIndex)
    {
        Proposal storage proposal = proposals[_ppsIndex];

        require(
            proposal.numConfirmations >= numConfirmationsRequired,
            "not enough confirmations!"
        );

		address _newOwner = proposal.newOwner;

		owners.push(_newOwner);
		isOwner[_newOwner] = true;
        proposal.executed = true;

		// Increment Number of Confirmations when a new owner is added
		numConfirmationsRequired = owners.length / 2;

		if (owners.length % 2 == 1) {
			numConfirmationsRequired++;
		}

        emit ExecuteProposal(msg.sender, _ppsIndex);
    }

	function revokeConfirmation(uint _txIndex)
        public
        onlyOwner
        txExists(_txIndex)
        notExecuted(_txIndex)
    {
        Transaction storage transaction = transactions[_txIndex];

        require(isConfirmed[_txIndex][msg.sender], "transaction not already confirmed");

        transaction.numConfirmations -= 1;
        isConfirmed[_txIndex][msg.sender] = false;

        emit RevokeConfirmation(msg.sender, _txIndex);
    }

	function revokeProposal(uint _ppsIndex)
        public
        onlyOwner
        ppsExists(_ppsIndex)
        ppsNotExecuted(_ppsIndex)
    {
        Proposal storage proposal = proposals[_ppsIndex];

        require(ppsIsConfirmed[_ppsIndex][msg.sender], "proposal not already confirmed");

        proposal.numConfirmations -= 1;
        ppsIsConfirmed[_ppsIndex][msg.sender] = false;

        emit RevokeConfirmation(msg.sender, _ppsIndex);
    }

	function getOwners() public view returns (address[] memory) {
        return owners;
    }

    function getTransactionCount() public view returns (uint) {
        return transactions.length;
    }

    function getProposalCount() public view returns (uint) {
        return proposals.length;
    }

    function getAllTransactions() public view returns (Transaction[] memory) {
        return transactions;
    }

    function getAllProposals() public view returns (Proposal[] memory) {
        return proposals;
    }

	/** Get Proposal
	 */
	function getProposal(uint _ppsIndex)
        public
        view
        returns (
            address newOwner,
            bool executed,
            uint numConfirmations
        )
    {
        Proposal storage proposal = proposals[_ppsIndex];

        return (
            proposal.newOwner,
            proposal.executed,
            proposal.numConfirmations
        );
    }

	/** Get Transaction
	 */
	function getTransaction(uint _txIndex)
        public
        view
        returns (
            address to,
            uint value,
            bytes memory data,
            bool executed,
            uint numConfirmations
        )
    {
        Transaction storage transaction = transactions[_txIndex];

        return (
            transaction.to,
            transaction.value,
            transaction.data,
            transaction.executed,
            transaction.numConfirmations
        );
    }
}