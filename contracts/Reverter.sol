// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract Reverter {
    error YouAreWrong();

    uint256 revertCount;
    uint256 successCount;

    receive() external payable {}

    fallback() external payable {}

    function giveError() external payable {
        revertCount++;
        revert YouAreWrong();
    }

    function noError() external payable {
        successCount++;
    }
}
