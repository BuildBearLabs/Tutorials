# How to interact with a Smart Contract, when it is not verified: Smart Hack Coding #1

Web3, Blockchain, Ethereum these are some of the hottest topics in tech right now. So Its no wonder that many people including me are trying to explore this domain. 

Amateur or a veteran, you are going to or already coding in Solidity, which you might already being knowing is a programming language for creating smart contracts. Learning the basics of Solidity helped me to at least gave a vague understanding of Ethereum and how it works. 

Now, this article’s focus is not to teach anyone anything, basic or complicated, about Solidity.  For that you already have multiple resources out there.  This article (or hopefully a series of articles) will focus on the ***quick hacks*** to play around with smart contracts. The idea is to share with you how to do smarter, faster and efficient coding job.

## Smart Hack #01: Interacting with smart contracts using Remix

I am presuming you have heard and play around with [Remix](https://remix.ethereum.org/).  If you haven’t then fear not; I will take you through some of the basics anyway.  If you have, then you already know that it is one of the most powerful smart contract online-IDEs out there that lets you code your smart contracts, compile them and deploy them too.

### Problem: How to interact with an unverified Smart Contract

I am going to demonstrate on how you could use Remix to interact with a Smart Contract that is deployed on a EVM blockchain, that is not verified.  The issue over here is this: 👇

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/9390820a-f84d-4a38-8d3a-ee4bcfc75b2d/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220628%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220628T113746Z&X-Amz-Expires=86400&X-Amz-Signature=d3664e45e2844b307d5495b30cf46151a3f7ae50a623c732edfe6207fc08e70a&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

As you will notice, it is smart contract on the blockchain, but we do not have the standard Read and Write functions available on the explorer, for us to interact with the contract.

For the purpose of this demonstration, I have deployed a contract to Ropsten test network over 👉 [here](https://ropsten.etherscan.io/address/0xe33b254e1d91e9f2b8c0bb04f555308e925c3ce9).

As you can see the block explorer provides us some relevant information regarding our deployed contract, but since the contract’s ABI was not submitted to the block explorer (albeit on purpose), there is no way for us to interact with the contract through the explorer. So even if we have the source code of the deployed contract, we can’t call its functions or interact with it in anyway … 
…. or can we?

![https://media.giphy.com/media/l3vRaak6fltTSi6xW/giphy.gif](https://media.giphy.com/media/l3vRaak6fltTSi6xW/giphy.gif)

### Solution: Remix, to the rescue

Yes, it can be done using Remix. Remix supports a wide variety of features and it can even allow us to interact with deployed contracts. So lets see how it works.

**Step 1: Getting access to the source code of the contract**
First we would need the source code of our contract, it can be found [here](https://github.com/UV-Labs/Tutorials/blob/Jagannathes-patch-1/ContractInteraction/Hogwarts.sol). 

If you go through the source code you can see that its a simple contract which keeps track of the points of Hogwarts houses and also there are some function to add points to the houses.

**Step 2: Importing it in Remix** 

Now open [Remix](https://remix.ethereum.org) in a new tab. 

Create a new file inside the contracts folder of Remix interface and the only thing that you have to do is import the contract like this:

*import “https://github.com/UV-Labs/Tutorials/blob/main/ContractInteraction/Hogwarts.sol”;*

After the importing, your file should look like this:

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/03018715-04a4-4be3-9473-409353fa89b3/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220628%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220628T113542Z&X-Amz-Expires=86400&X-Amz-Signature=7aef414eee0a92507a6311905efe70ab4dbe816456f14347f0277cf46d9476a6&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

**Step 3: Connecting to the Contract**

- Now we need to connect to the deployed smart contract, for doing that click on the “Deploy and Run Transactions” icon on the left hand side of Remix interface.  The last icon in the snapshot below.

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/03092f62-3e7a-4a9a-8c14-91bd6049d0fd/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220628%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220628T113405Z&X-Amz-Expires=86400&X-Amz-Signature=848feb67e65c2aa717132da45a20ea55f370610af7a233052973c8bd9efa5d1b&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

- Then choose the “environment” as “injected web3”.  This will basically pick-up the network that your Metamask is connected to.  Hence, choose the Ropsten network in your Metamask.
- Now all we have to do is to copy the contract address: `0xe33b254e1d91e9f2b8c0Bb04F555308E925C3Ce9`  and paste it at the “At Address” section and then click on the “At Address” button

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/32ed1b8c-6ab1-4b23-b13c-9e96278912e0/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220628%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220628T113619Z&X-Amz-Expires=86400&X-Amz-Signature=888618d49b878a8a4a2da2096ed18827479b9c69ef8dfd9ecc6f4f2d03977fa1&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

- This would generate a new entry in the deployed contracts section at the bottom left, upon expanding it we would be able to see something like this:

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/d9415b60-08e9-48aa-96f9-1ced748bd3cf/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220628%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220628T113655Z&X-Amz-Expires=86400&X-Amz-Signature=cba131adb0398422c87fbaf36c9ef6d637220d1c72120063eb36350a835fa1ba&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

**Voila** 🎉🎊

You will notice the functions of our contract. As you can see there are four read methods for getting the points of each Hogwarts houses and also there are four state change methods (one for each house) for adding 10 points to the house. 

You are now ready to play around by calling these methods and maybe you can try to add more points to your favourite Hogwarts House 😉 

### Conclusion

By following these steps you can interact with any smart contract if you have its address and source code. One thing to be noted is that you cannot access the contract without compiling it and then switching to its deployed environment. If you try to directly paste the contract address you’ll find the “At Address” button to be disabled.

### Requests

All the above code is sitting over here: [Link to GitHub.](https://github.com/UV-Labs/Tutorials) ☁️ 💻 🔗.  You are more than welcome to use the existing code base. Do give us a star 🙏 if you like what we are doing.

This is my first article on Medium. If you liked my work, please do clap and follow me as a sign of encouragement.  

Also, please do follow [@uv_labs](https://twitter.com/uv_labs) on Twitter and our publication: [https://medium.com/uv-labs](https://medium.com/uv-labs), to keep me and a lot of my fellow beginners some tap on the back.

Authors (open to feedback): 👇

[Jagan](https://medium.com/@jagannatheshahi), under some guidance from [Amateur-Dev](https://medium.com/u/9cd26cbd96b9?source=post_page-----5311a13d173-----------------------------------)
