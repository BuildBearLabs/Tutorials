// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@aave/core-v3/contracts/flashloan/base/FlashLoanSimpleReceiverBase.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract FlashLoanExample is FlashLoanSimpleReceiverBase {
  using SafeMath for uint;
  event Log(address asset, uint val);

  constructor(IPoolAddressesProvider provider)
    public
    FlashLoanSimpleReceiverBase(provider)
  {}

  function createFlashLoan(address asset, uint amount) external {
      address reciever = address(this);
      bytes memory params = ""; // use this to pass arbitary data to executeOperation
      uint16 referralCode = 0;

      POOL.flashLoanSimple(
       reciever,
       asset,
       amount,
       params,
       referralCode
      );
  }

   function executeOperation(
    address asset,
    uint256 amount,
    uint256 premium,
    address initiator,
    bytes calldata params
  ) external returns (bool){
    // do things like arbitrage here
    // abi.decode(params) to decode params
    
    uint amountOwing = amount.add(premium);
    IERC20(asset).approve(address(POOL), amountOwing);
    emit Log(asset, amountOwing);
    return true;
  }
}