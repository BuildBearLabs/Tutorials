// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.7;
pragma abicoder v2;

import '@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol';
import '@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol';

contract Swap {

    ISwapRouter public immutable swapRouter;

    constructor(ISwapRouter _swapRouter) {
        swapRouter = _swapRouter;
    }

    function swapExactInputSingle(address token0, address token1, uint256 amountIn, uint24 poolFee) external returns (uint256 amountOut) {

        TransferHelper.safeTransferFrom(token0, msg.sender, address(this), amountIn);
        TransferHelper.safeApprove(token0, address(swapRouter), amountIn);

        ISwapRouter.ExactInputSingleParams memory params =
            ISwapRouter.ExactInputSingleParams({
                tokenIn: token0,
                tokenOut: token1,
                fee: poolFee,
                recipient: msg.sender,
                deadline: block.timestamp,
                amountIn: amountIn,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });

        amountOut = swapRouter.exactInputSingle(params);
    }

   
    function swapExactOutputSingle(address token0, address token1,uint256 amountOut, uint256 amountInMaximum,uint24 poolFee) external returns (uint256 amountIn) {
       
        TransferHelper.safeTransferFrom(token0, msg.sender, address(this), amountInMaximum);
        TransferHelper.safeApprove(token0, address(swapRouter), amountInMaximum);

        ISwapRouter.ExactOutputSingleParams memory params =
            ISwapRouter.ExactOutputSingleParams({
                tokenIn: token0,
                tokenOut: token1,
                fee: poolFee,
                recipient: msg.sender,
                deadline: block.timestamp,
                amountOut: amountOut,
                amountInMaximum: amountInMaximum,
                sqrtPriceLimitX96: 0
            });

        amountIn = swapRouter.exactOutputSingle(params);

        if (amountIn < amountInMaximum) {
            TransferHelper.safeApprove(token0, address(swapRouter), 0);
            TransferHelper.safeTransfer(token0, msg.sender, amountInMaximum - amountIn);
        }
    }
}