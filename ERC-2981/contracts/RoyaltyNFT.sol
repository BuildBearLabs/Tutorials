
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Royalty.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract RoyaltyNFT is ERC721Royalty,Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    constructor(address _receiver, uint96 feeNumerator) ERC721("Royalties", "RYLT") {
        _setDefaultRoyalty(_receiver, feeNumerator);
    }

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function setTokenRoyalty(uint256 tokenId,address receiver,uint96 feeNumerator)public onlyOwner{
     _setTokenRoyalty(tokenId, receiver, feeNumerator);
    }
}