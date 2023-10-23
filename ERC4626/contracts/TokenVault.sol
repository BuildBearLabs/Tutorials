//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@aave/core-v3/contracts/interfaces/IPool.sol";

contract TokenVault is ERC4626,Ownable{
    mapping(address => uint256) public shareHolders;


    constructor(
        ERC20 _asset,
        string memory _name,
        string memory _symbol
    ) ERC4626(_asset) ERC20(_name, _symbol){}

    /**
     * @notice function to deposit assets and receive vault tokens in exchange
     * @param _assets amount of the asset token
     */
    function _deposit(uint _assets) public {
        require(_assets > 0, "Deposit less than Zero");
        shareHolders[msg.sender] = shareHolders[msg.sender] + deposit(_assets, msg.sender);
    }

    /**
     * @notice Function to allow msg.sender to withdraw their deposit plus accrued interest
     * @param _shares amount of shares the user wants to convert
     * @param _receiver address of the user who will receive the assets
     */
    function _withdraw(uint _shares, address _receiver) public {
        require(_shares > 0, "withdraw must be greater than Zero");
        require(_receiver != address(0), "Zero Address");
        require(shareHolders[msg.sender] >= _shares, "Not enough shares");
        redeem(_shares, _receiver, msg.sender);
        shareHolders[msg.sender] -= _shares;
    }

    /**
     * @notice Returns the total balance of a user
     * @param _user Address of the user
     */
    function totalAssetsOfUser(address _user) public view returns (uint256) {
        return shareHolders[_user];
    }

    function _decimalsOffset() internal pure override returns (uint8) {
        return 3;
    }

    function lendOnAave(address aaveV3, uint256 asset_amount)public onlyOwner{
        SafeERC20.safeApprove(IERC20(asset()) , aaveV3, asset_amount);
        IPool(aaveV3).supply(asset(),asset_amount,address(this),0);
    }

    function withdrawFromAave(address aaveV3)public onlyOwner{
        IPool(aaveV3).withdraw(asset(),type(uint).max,address(this));  
    }
}