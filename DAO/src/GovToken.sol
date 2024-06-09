// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import {ERC20Votes} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

/**
 * @title GovToken
 * @dev This contract is an ERC20 token with additional features for voting and permit.
 */
contract GovToken is ERC20, ERC20Permit, ERC20Votes {
    constructor() ERC20("MyToken", "MTK") ERC20Permit("MyToken") {}

    /**
     * @dev Mints new tokens and adds them to the balance of the specified account.
     * @param to The account to receive the new tokens.
     * @param amount The amount of tokens to mint.
     */
    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }

    /**
     * @dev Hook that is called after any token transfer.
     * @param from The account that initiated the transfer.
     * @param to The account that received the transfer.
     * @param amount The amount of tokens that were transferred.
     */
    function _afterTokenTransfer(address from, address to, uint256 amount) internal override(ERC20, ERC20Votes) {
        super._afterTokenTransfer(from, to, amount);
    }

    /**
     * @dev Mints new tokens and adds them to the balance of the specified account.
     * @param to The account to receive the new tokens.
     * @param amount The amount of tokens to mint.
     */
    function _mint(address to, uint256 amount) internal override(ERC20, ERC20Votes) {
        super._mint(to, amount);
    }

    /**
     * @dev Burns tokens from the specified account.
     * @param account The account to burn tokens from.
     * @param amount The amount of tokens to burn.
     */
    function _burn(address account, uint256 amount) internal override(ERC20, ERC20Votes) {
        super._burn(account, amount);
    }
}
