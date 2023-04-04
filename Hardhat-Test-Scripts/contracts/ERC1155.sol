pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract TestERC1155 is ERC1155, Ownable, Pausable {
    constructor() ERC1155("Test") {
        //        _mint(msg.sender, 0, 1000 * 10 ** 18, "");
        //        _mint(msg.sender, 1, 1, "");
    }

    mapping(uint => string) private _tokenURIs;

    function mint(
        address _recipient,
        uint _amount,
        uint _tokenId,
        string memory _tokenUrl
    ) public returns (uint _mintTokenId) {
        require(bytes(_tokenUrl).length > 0, "The _tokenUrl must be have");
        require(_amount > 0, "The _amount must be have");
        uint newTokenId = _tokenId;
        _mint(_recipient, newTokenId, _amount, "");
        _tokenURIs[newTokenId] = _tokenUrl;
        return newTokenId;
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
