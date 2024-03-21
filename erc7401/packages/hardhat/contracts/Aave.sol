// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.10;

import {IPool} from "@aave/core-v3/contracts/interfaces/IPool.sol";
import '@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol';

contract Aave {
  // using SafeERC20 for IERC20;
    IPool public constant pool = IPool(0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2);

    function supply(address token, uint256 amount) public {

      TransferHelper.safeApprove(token, address(pool), amount);
      pool.supply(token, amount, address(this), 0);
    }

    function withdraw(address asset, uint256 amount, address to) external returns (uint256) {
      return pool.withdraw(asset, amount, to);
    }

  function repay(address asset,
    uint256 amount,
    uint256 interestRateMode) external returns(uint256) {
      TransferHelper.safeApprove(asset, address(pool), amount);
    return pool.repay(asset, amount, interestRateMode,address(this));
  }

function borrow(
    address asset,
    uint256 amount,
    uint256 interestRateMode,
    uint16 referralCode,
    address onBehalfOf
  ) public {
    pool.borrow(asset,amount,interestRateMode,referralCode,onBehalfOf);
  }
}