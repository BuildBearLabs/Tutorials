pragma solidity ^0.8;


interface IUniswapV2Router {
    function swapExactTokensForTokens(
        uint amounswapExactTokensForTokenstIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);
    function WETH() external pure returns (address);
    function getAmountsOut(uint amountIn, address[] memory path) external view returns (uint[] memory amounts);

}