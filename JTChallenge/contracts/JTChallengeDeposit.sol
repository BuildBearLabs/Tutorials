pragma solidity ^0.8.17;

import "../node_modules/@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract JTChallengeDeposit {
    using SafeERC20 for IERC20;
    mapping (address => uint256) public deposits;

    event Desposit(address tokenAddress, address sender, uint256 amount);

    modifier noETH() {
        require(address(this).balance == 0, "Contract balance must be 0 ETH");
        _;
    }

    function deposit(address tokenAddress, uint256 amount) external noETH {
        require(tokenAddress != address(0), "Invalid token address");
        require(amount > 0, "Amount must be greater than 0");

        IERC20 token = IERC20(tokenAddress);
        token.safeTransferFrom(msg.sender, address(this), amount);
        deposits[msg.sender] += amount;
        emit Desposit(tokenAddress, msg.sender, amount);
    }
}
