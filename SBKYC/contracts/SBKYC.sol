//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13; 

import "@openzeppelin/contracts@4.7.3/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts@4.7.3/access/Ownable.sol";
import "@openzeppelin/contracts@4.7.3/utils/Counters.sol";
/*
Can't Be Evil license from a16z https://a16zcrypto.com/wp-content/uploads/2022/08/Cant-Be-Evil-Licenses.pdf
License Version CBE-CC0 https://7q7win2vvm2wnqvltzauqamrnuyhq3jn57yqad2nrgau4fe3l5ya.arweave.net/_D9kN1WrNWbCq55BSAGRbTB4bS3v8QAPTYmBThSbX3A/0
*/
import {LicenseVersion, CantBeEvil} from "@a16z/contracts/licenses/CantBeEvil.sol";

contract SBKYC is ERC721Enumerable, Ownable, CantBeEvil(LicenseVersion.PUBLIC) {

    using Counters for Counters.Counter;
    Counters.Counter public _tokenIdCounter;

    address public admin;

    constructor() ERC721("SoulBoundToken", "SBT") {
        admin = msg.sender;
    }

//mapping pf user address to tokenID and tokenID to hash
    mapping(address => uint256) internal userToTokenId;
    mapping(uint256 => bytes32) internal tokenIdToHash;

//safeMint to mint tokens by owner of the contract to users
    function safeMint(address to) public payable onlyOwner {
        require(balanceOf(to) == 0, "Already Minted to Address!");

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        userToTokenId[to] = tokenId;
        _safeMint(to, tokenId);
    }

//signUp function that craetes token and hash
    function signUp(address to, string memory userName, string memory information) public returns (bytes32 hash) {
        to = msg.sender;
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        userToTokenId[to] = tokenId;
        hash = keccak256(abi.encodePacked(userName, to, information));
        tokenIdToHash[tokenId] = hash;
        _mint(to, tokenId);
        return hash;
    }

//signIn function that verifies if the user have a SBT or not
    function signIn(address user) public view returns (bool) {
        require(balanceOf(user) == 1, "You need to Sign-Up First!");
        return true;
    }

//revoke function that burns the token
    function burn(address user, bytes32 hash) public onlyOwner{
        require(balanceOf(user) == 1, "User Don't Exists!");
        uint256 tokenId = userToTokenId[user];
        if(tokenIdToHash[tokenId] == hash){
            _burn(tokenId);
        }
        delete tokenIdToHash[tokenId];
        delete userToTokenId[user];
    }

//supportsInterface as two or more base classes define function with same name and parameter types.
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721Enumerable, CantBeEvil)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

}
