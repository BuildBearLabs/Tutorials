# Social Media Smart Contract
- Note: This project include an [article](https://medium.com/@aycrown77/resolving-a-getcontractfactory-error-in-hardhat-a-step-by-step-guide-d901fc186815) on how I was able to resolve the deployment error I was facing.
## Overview

This Ethereum smart contract functions as a basic social media platform, allowing users to create posts, like posts created by others, and view their own and other users' posts.

## Prerequisites

- An Ethereum wallet and access to a blockchain network (i.e Buildbear Etherium testnet) with sufficient ETH for transaction fees.
- An Ethereum development environment, such as Remix or a development framework like Truffle.
- Solidity compiler version 0.8.13 or compatible.

## Contract Details

- **Solidity Version**: ^0.8.13
- **Owner**: The owner of this contract is set at deployment and is the Ethereum address that deploys it. The owner has special privileges, such as changing the maximum post length.

## Features

### 1. Create Post

- **Function**: `createPost(string memory _post)`
- Allows a user to create a new post.
- Verifies that the post length does not exceed the maximum allowed length (`MAX_POST_LENGHT`).
- Emits a `postCreated` event upon successful post creation.

### 2. Like Post

- **Function**: `likeTweet(address author, uint256 id) external`
- Allows a user to like a post created by another user.
- Emits a `postLiked` event upon successful liking.

### 3. Unlike Post

- **Function**: `unlikeTweet(address author, uint256 id) external`
- Allows a user to unlike a post they had previously liked.
- Emits a `postUnliked` event upon successful unliking.

### 4. Get Post

- **Function**: `getPost(uint _i) public view returns (Post memory)`
- Retrieves a specific post created by the calling user.

### 5. Get All Posts

- **Function**: `getAllPost(address _owner) public view returns (Post[] memory)`
- Retrieves all posts created by a specific user.

### 6. Change Post Length

- **Function**: `changePostLength(uint16 newPostLength) public onlyOwner`
- Allows the owner to change the maximum allowed post length.

## Events

- `postCreated(uint256 id, address author, string content, uint256 timestamp)`
  - Emitted when a new post is created.

- `postLiked(address liker, address postAuthor, uint256 postId, uint256 newLikeCount)`
  - Emitted when a post is liked.

- `postUnliked(address unliker, address postAuthor, uint256 postId, uint256 newLikedCount)`
  - Emitted when a like on a post is removed.

## Usage

1. **Deployment**
   - Deploy the contract using a compatible Ethereum development environment.
   - Due to the issues I faced while trying to deploy my smart contract, I wrote an article on how I was able to overcome the challenge
   - Here is the link to the article: https://medium.com/@aycrown77/resolving-a-getcontractfactory-error-in-hardhat-a-step-by-step-guide-d901fc186815

2. **Creating a Post**
   - Use the `createPost` function to create a new post.

3. **Liking a Post**
   - Use the `likeTweet` function, providing the author's address and the post ID.

4. **Unliking a Post**
   - Use the `unlikeTweet` function, providing the author's address and the post ID.

5. **Viewing Posts**
   - Use the `getPost` or `getAllPost` functions to view posts.

6. **Changing Post Length (Owner only)**
   - Use the `changePostLength` function to adjust the maximum post length.

## Notes

- Ensure that the maximum post length (`MAX_POST_LENGHT`) is set to a reasonable value to prevent excessive gas costs for long posts.

## Disclaimer

- This smart contract is provided as-is. The owners and developers are not responsible for any issues, bugs, or misuse that may occur while using this contract.

## License

This smart contract is released under the [MIT License](LICENSE).
