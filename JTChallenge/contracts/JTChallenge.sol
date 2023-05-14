pragma solidity ^0.8.17;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract JTChallenge is ERC20 {
    // constructor function to initialize the name and symbol of the token
    constructor() ERC20("JTChallenge", "JTC"){
        // minting 1000000 tokens to the contract creator
        _mint(msg.sender, 1000000 * (10 ** uint256(decimals())));
    }
}