// SPDX-License-Identifier: MIT
// web3 Social media smart contract
pragma solidity ^0.8.13;

contract SocialMedia {

    uint16 public MAX_POST_LENGHT = 200;
    address public owner;

    // define Post struct
    struct Post {
        uint256 id;
        address author;
        string content;
        uint256 timestamp;
        uint256 likes;
    }
    // maps user to post
    mapping(address => Post[]) public posts;

    // Define the events
    event postCreated(uint256 id, address author, 
                    string content, uint256 timestamp);
    event postLiked(address liker, address postAuthor, 
                    uint256 postId, uint256 newLikeCount);
    event postUnliked(address unliker, address postAuthor, 
                    uint256 postId, uint256 newLikedCount);

    //constructor to set an owner of the contract
    constructor() {
        owner = msg.sender;
    }

    //Modifier to verify the real owner
    modifier onlyOwner() {
        require(msg.sender == owner, "YOU ARE NOT THE OWNER OF THE CONTRACT");
        _;
    }

    // Adds a post to the user
    function createPost(string memory _post) public {
        //check if post length <= 200, continue, otherwise revert
        require(bytes(_post).length <= MAX_POST_LENGHT, "Post too long!");
        Post memory newPost = Post({
            id: posts[msg.sender].length,
            author: msg.sender,
            content: _post,
            timestamp: block.timestamp,
            likes: 0
        });
        posts[msg.sender].push(newPost);

        emit postCreated(newPost.id, newPost.author, newPost.content, newPost.timestamp);
    }

    // like a post
    function likeTweet(address author, uint256 id) external {
        require(posts[author][id].id == id, "post does not exist");
        posts[author][id].likes++;
        uint256 newLikeCount = posts[author][id].likes;

        emit postLiked(msg.sender, author, id, newLikeCount);
    }

    // Unlike the post
    function unlikeTweet(address author, uint256 id) external {
        require(posts[author][id].id == id, "Post does not exist");
        require(posts[author][id].likes > 0, "Post has no likes");
        
        posts[author][id].likes--;

        uint256 newLikeCount = posts[author][id].likes;
        emit postUnliked(msg.sender, author, id, newLikeCount);
    }

    // Gets post from the user
    function getPost(uint _i) public view returns (Post memory){
        return posts[msg.sender][_i];
    }

    // Gets all post from the user
    function getAllPost(address _owner) public view returns (Post[] memory){
       return posts[_owner];
    }

    // Changes the length of post
    function changePostLength(uint16 newPostLength) public onlyOwner{
        MAX_POST_LENGHT = newPostLength;
    }

}