// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DecentralizedSocialMedia {

    struct Post {
        address owner;
        string content;
        uint256 timestamp;
        bool isDeleted;
    }

    mapping (uint256 => Post) public posts;
    uint256 public postCount;

    function createPost(string memory _content) public {
        require(bytes(_content).length > 0, "Content cannot be empty");
        
        postCount++;
        posts[postCount] = Post(msg.sender, _content, block.timestamp, false);
    }

    function deletePost(uint256 _postId) public {
        require(posts[_postId].owner == msg.sender, "Only the owner can delete the post");
        require(!posts[_postId].isDeleted, "Post has already been deleted");
        
        posts[_postId].isDeleted = true;
    }

    function getPost(uint256 _postId) public view returns (address, string memory, uint256) {
        require(_postId <= postCount && _postId > 0, "Invalid post ID");

        Post memory post = posts[_postId];
        require(!post.isDeleted, "Post has been deleted");

        return (post.owner, post.content, post.timestamp);
    }
}