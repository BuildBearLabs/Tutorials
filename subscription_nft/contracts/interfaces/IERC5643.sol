interface IERC5643 {
    /// @notice Emitted when a subscription expiration changes
    /// @dev When a subscription is canceled, the expiration value should also be 0.
    event SubscriptionUpdate(uint256 indexed tokenId, uint64 expiration);

    /// @notice Renews the subscription to an NFT
    /// Throws if `tokenId` is not a valid NFT
    /// @param tokenId The NFT to renew the subscription for
    function renewSubscription(uint256 tokenId, uint64 expiration) external;

    /// @notice Cancels the subscription of an NFT
    /// @dev Throws if `tokenId` is not a valid NFT
    /// @param tokenId The NFT to cancel the subscription for
    function cancelSubscription(uint256 tokenId) external;

    /// @notice Gets the expiration date of a subscription
    /// @dev Throws if `tokenId` is not a valid NFT
    /// @param tokenId The NFT to get the expiration date of
    /// @return The expiration date of the subscription
    function expiresAt(uint256 tokenId) external view returns(uint64);

    /// @notice Determines whether a subscription can be renewed
    /// @dev Throws if `tokenId` is not a valid NFT
    /// @param tokenId The NFT to get the expiration date of
    /// @return The renewability of a the subscription
    function isRenewable(uint256 tokenId) external view returns(bool);
}