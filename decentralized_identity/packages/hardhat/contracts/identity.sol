// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DecentralizedIdentity is ERC721, Ownable {
    
    address public admin;
    struct Identity {
        string name;
        address owner;
        mapping(string => string) attributes;
    }
   
    mapping(address => Identity) public identities;
    uint256 private tokenIdTracker = 1;

    constructor(address _admin) ERC721("DecentralizedIdentity", "DID") {
        admin = _admin;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this operation");
        _;
    }

    function createIdentity(string memory name) public {
        require(identities[msg.sender].owner == address(0), "Identity already exists");
        identities[msg.sender].name = name;
        _safeMint(msg.sender, tokenIdTracker);
        tokenIdTracker++;
    }

    function setAttribute(string memory key, string memory value) public {
        identities[msg.sender].attributes[key] = value;
    }

    function getAttribute(address identityOwner, string memory key) public view returns (string memory) {
        return identities[identityOwner].attributes[key];
    }
}
