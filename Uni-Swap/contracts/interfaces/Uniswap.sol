pragma solidity ^0.8;


interface IUniswapV2Router {
    function swapExactTokenforTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);
}