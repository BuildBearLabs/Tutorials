// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";

contract token is ERC20, ERC20Permit {
    constructor() ERC20("BuildBear", "BB") ERC20Permit("BuildBear") {}

    function mint(address to, uint256 value) external {
        _mint(to, value);
    }
}