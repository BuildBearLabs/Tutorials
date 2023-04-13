pragma solidity ^0.8.9;

import "./Election.sol";

contract MainContract {
    uint public electionId = 0;
    mapping(uint => address) public Elections;

    event ElectionCreated(uint id);

    function createElection(
        string[] memory _nda,
        string[] memory _candidates
    ) public returns(uint id) {
        Election election = new Election(_nda, _candidates);
        Elections[electionId] = address(election);
        id = electionId++;
        emit ElectionCreated(id);
        return id;
    }
}
