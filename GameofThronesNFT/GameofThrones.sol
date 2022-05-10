// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC1155/ERC1155.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Strings.sol";

contract GameofThrones is ERC1155 {
    uint256 public constant JonSnow = 1;
    uint256 public constant CerseiLannister = 2;
    uint256 public constant DaenerysTargaryen = 3;
    uint256 public constant NightKing = 4;
    uint256 public constant TyrionLannister = 5;
    uint256 public constant AryaStark = 6;


    constructor() ERC1155("https://gateway.pinata.cloud/ipfs/QmXLdCoTPVZ8Vf5PrEZR1awPKR8PvxmyEakaR5ummPCPnh/{id}.json") {
        _mint(msg.sender, JonSnow, 100, "");
        _mint(msg.sender, CerseiLannister, 100, "");
        _mint(msg.sender, DaenerysTargaryen, 100, "");
        _mint(msg.sender, NightKing, 100, "");
        _mint(msg.sender, TyrionLannister, 100, "");
        _mint(msg.sender, AryaStark, 100, "");
    }

    function uri(uint256 _tokenId) override public view returns (string memory) {
        return string(
            abi.encodePacked(
                "https://gateway.pinata.cloud/ipfs/QmXLdCoTPVZ8Vf5PrEZR1awPKR8PvxmyEakaR5ummPCPnh/",
                Strings.toString(_tokenId),
                ".json"
            )
        );
    }
}