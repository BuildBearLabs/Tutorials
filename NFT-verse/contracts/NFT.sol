// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

// stores some basic implemented functions for NFTs
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Function counter increments/decrement based on token minted
import "@openzeppelin/contracts/utils/Counters.sol";

// our contract NDT inherits from openzeppelin's ERC721 contract
contract NFT is ERC721 {

    // importing and then declaring a counter
    // to keep a track of total tokens minted
    using Counters for Counters.Counter;
    Counters.Counter private tokenId;

    // our constructor function calls the ERC721 
    // passing two arguments for name and symbol respectively
    constructor() ERC721("UVLabs", "UVL") {}

    // defined function mint which is taking a valid recipient's address as argument
    function mint(address recipientAddress, sring memory tokenURI) 
    public returns (uint256) {
        // increments tokenId value by one
        tokenId.increment();
        uint256 newItemId = tokenId.current();
        // _safeMint is a private method 
        // which mints the next value of the counter
        _safeMint(recipientAddress, newItemId);
        // 'tokenURI' as URI of our NFT's metadata file
        _setTokenURI(newItemId, tokenURI);
        // returns a newly minted token's ID back to caller
        return newItemId;
    }
}