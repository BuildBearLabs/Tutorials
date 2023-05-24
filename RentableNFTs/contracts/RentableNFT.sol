// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./IERC4907.sol";

contract RentableNFT is ERC721, IERC4907 {
    struct UserInfo {
        address user; // address of user role
        uint64 expires; // unix timestamp, user expires
    }
    event NFTMinted(address indexed user, uint256 indexed tokenId);

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    mapping(uint256 => UserInfo) private _users;

    constructor() ERC721("RentableNFT", "RNFT") {}

    /// @notice set the user and expires of a NFT
    /// @dev The zero address indicates there is no user
    /// Throws if `tokenId` is not valid NFT
    /// @param user  The new user of the NFT
    /// @param expires  UNIX timestamp, The new user could use the NFT before expires
    function setUser(
        uint256 tokenId,
        address user,
        uint64 expires
    ) public virtual override {
        require(
            _isApprovedOrOwner(msg.sender, tokenId),
            "ERC721: transfer caller is not owner nor approved"
        );
        require(userOf(tokenId) == address(0), "User already assigned");
        require(expires > block.timestamp, "expires should be in future");
        UserInfo storage info = _users[tokenId];
        info.user = user;
        info.expires = expires;
        emit UpdateUser(tokenId, user, expires);
    }

    /// @notice Get the user address of an NFT
    /// @dev The zero address indicates that there is no user or the user is expired
    /// @param tokenId The NFT to get the user address for
    /// @return The user address for this NFT
    function userOf(
        uint256 tokenId
    ) public view virtual override returns (address) {
        if (uint256(_users[tokenId].expires) >= block.timestamp) {
            return _users[tokenId].user;
        }
        return address(0);
    }

    /// @notice Get the user expires of an NFT
    /// @dev The zero value indicates that there is no user
    /// @param tokenId The NFT to get the user expires for
    /// @return The user expires for this NFT
    function userExpires(
        uint256 tokenId
    ) public view virtual override returns (uint256) {
        return _users[tokenId].expires;
    }

    /// @dev See {IERC165-supportsInterface}.
    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC721) returns (bool) {
        return
            interfaceId == type(IERC4907).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    /// @notice Mints a new NFT and assigns it to the caller
    /// @return The tokenId of the minted NFT
    function nftMint() public returns (uint256) {
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(msg.sender, tokenId);
        emit NFTMinted(msg.sender, tokenId);
        return tokenId;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal virtual override {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);

        if (
            from != to &&
            _users[tokenId].user != address(0) && //user present
            block.timestamp >= _users[tokenId].expires //user expired
        ) {
            delete _users[tokenId];
            emit UpdateUser(tokenId, address(0), 0);
        }
    }

    /// @notice Returns the total number of NFTs in existence
    /// @return The total supply of NFTs
    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter.current();
    }
}
