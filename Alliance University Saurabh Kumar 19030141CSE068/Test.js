const SocialMedia = artifacts.require("SocialMedia");
const { expect } = require("chai");

contract("SocialMedia", accounts => {
  let socialMedia;

  before(async () => {
    socialMedia = await SocialMedia.deployed();
  });

  it("should create a post", async () => {
    const postContent = "This is my first post";
    await socialMedia.createPost(postContent);
    const post = await socialMedia.getPost(1);
    expect(post).to.equal(postContent);
  });

  it("should delete a post", async () => {
    const postContent = "This post will be deleted";
    await socialMedia.createPost(postContent);
    await socialMedia.deletePost(2);
    const postExists = await socialMedia.postExists(2);
    expect(postExists).to.be.false;
  });

  it("should return the correct post count", async () => {
    const postCount = await socialMedia.getPostCount();
    expect(postCount).to.equal(1);
  });
});
