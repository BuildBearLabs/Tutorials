// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";
import "./carbonToken.sol";
contract regulator is ERC20PresetMinterPauser {
    constructor() ERC20PresetMinterPauser("Carbon", "CB") {}
    uint price=1;


    function mint(address to, uint256 amount) public virtual override{
        require(hasRole(MINTER_ROLE, _msgSender()), "ERC20PresetMinterPauser: must have minter role to mint");
        super._mint(to, amount);
    }   

    function burn(address from,uint256 amount) public virtual {
        require(hasRole(MINTER_ROLE, _msgSender()), "ERC20PresetMinterPauser: must have burner role to burn");
        super._burn(from, amount);
    }

    function pause() public virtual override {
        require(hasRole(PAUSER_ROLE, _msgSender()), "ERC20PresetMinterPauser: must have pauser role to pause");
        super._pause();
    }

    function unpause() public virtual override{
        require(hasRole(PAUSER_ROLE, _msgSender()), "ERC20PresetMinterPauser: must have pauser role to unpause");
        super._unpause();
    }


}
