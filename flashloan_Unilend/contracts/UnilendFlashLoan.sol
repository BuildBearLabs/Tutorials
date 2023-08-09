pragma solidity 0.8.0;
// SPDX-License-Identifier: MIT


import "./UnilendFlashLoanReceiverBase.sol";



contract Flashloan is UnilendFlashLoanReceiverBase {
    using SafeMath for uint256;
    
    constructor() {}
    
    
    function executeOperation(
        address _reserve,
        uint256 _amount,
        uint256 _fee,
        bytes calldata _params
    )
        external
    {
        require(_amount <= getBalanceInternal(address(this), _reserve), "Invalid balance, was the flashLoan successful?");
        _params;
        
        //
        // Your logic goes here.
        // !! Ensure that *this contract* has enough of `_reserve` funds to payback the `_fee` !!
        //
        
        
        uint totalDebt = _amount.add(_fee);
        transferInternal(getUnilendCoreAddress(), _reserve, totalDebt);
    }
    
    function flashloan(address _asset, uint _amount) payable external {
        bytes memory data;
        
        flashLoan(address(this), _asset, _amount, data);
    }
}
