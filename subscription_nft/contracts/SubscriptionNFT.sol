pragma solidity ^0.8.13;

import "./ERC/Modified_ERC5643.sol";

contract SubscriptionNFT is Modified_ERC5643 {

    constructor(string memory _name, string memory _symbol) Modified_ERC5643(_name, _symbol){}

    function mint(address to, uint256 tokenId, uint64 expiration) public onlyOwner {
        _mint(to, tokenId);
        renewSubscription(tokenId,expiration);
    }


}