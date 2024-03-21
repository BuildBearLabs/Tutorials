//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract Greeter {
    address payable public owner;
       string public message;

    mapping(address => uint256) public ownerToLuckyNumber;

    constructor(address _owner) {
        console.log("Deployed Greeter by '%s'", msg.sender);
        owner = payable(_owner);
    }

   function setMessage(string memory _msg) external {
        if (bytes(message).length > 0) return;
        message = _msg;
    }

}