// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

interface IERC721 {
    function transferFrom(
        address _from,
        address _to,
        uint _nftId
    ) external;
}

contract DutchAuction {
    uint private constant DURATION = 2 days;
    IERC721 public immutable nft;
    uint public immutable nftId;
    address public immutable seller;
    uint public immutable startingPrice;
    uint public immutable startAt;
    uint public immutable expiresAt;
    uint public immutable discountRate;

    constructor(
        uint _startingPrice,
        uint _discountRate,
        address _nft,
        uint _nftId
    ) {
        seller = payable(msg.sender);
        startingPrice = _startingPrice;
        discountRate = _discountRate;
        startAt = block.timestamp;
        expiresAt = block.timestamp + DURATION;

        require(
            _startingPrice >= _discountRate * DURATION,
            "Discount is greater than the Starting Price Dude!!"
        );

        nft = IERC721(_nft);
        nftId = _nftId;
    }


    function currentPrice() public view returns (uint) {
        uint timeElapsed = block.timestamp - startAt;
        uint discount = discountRate * timeElapsed;
        return startingPrice - discount;
    }

    function buyNow() external payable {
        require(block.timestamp < expiresAt, "Auction expired! :(");
        uint price = currentPrice();
        require(msg.value >= price, "ETH < Price");
        nft.transferFrom(seller, msg.sender, nftId);
        selfdestruct(payable(seller));
    }
}