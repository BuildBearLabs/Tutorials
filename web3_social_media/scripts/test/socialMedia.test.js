const SocialMedia = artifacts.require("SocialMedia");

contract("SocialMedia", (accounts) => {
    let socialMediaInstance;

    beforeEach(async () => {
        socialMediaInstance = await SocialMedia.new();
    });

    it("should create a post", async () => {
        const content = "This is a test post.";

        await socialMediaInstance.createPost(content);

        const post = await socialMediaInstance.getPost(0);
        assert.equal(post.content, content, "Post content does not match");
    });

    it("should like a post", async () => {
        const content = "This is another test post.";
        await socialMediaInstance.createPost(content);

        await socialMediaInstance.likeTweet(accounts[0], 0);

        const post = await socialMediaInstance.getPost(0);
        assert.equal(post.likes, 1, "Post should have 1 like");
    });

    it("should unlike a post", async () => {
        const content = "Yet another test post.";
        await socialMediaInstance.createPost(content);

        await socialMediaInstance.likeTweet(accounts[0], 0);
        await socialMediaInstance.unlikeTweet(accounts[0], 0);

        const post = await socialMediaInstance.getPost(0);
        assert.equal(post.likes, 0, "Post should have 0 likes");
    });

    it("should change post length", async () => {
        const newPostLength = 300;

        await socialMediaInstance.changePostLength(newPostLength);

        const updatedPostLength = await socialMediaInstance.MAX_POST_LENGHT();
        assert.equal(updatedPostLength, newPostLength, "Post length should be updated");
    });
});
