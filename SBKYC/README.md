# SBT-KYC-Auth

### [Presentation](https://docs.google.com/presentation/d/1Fcf1lC6J4vdP6oc1TCIHirN9pf2cwoO9BckHRsigY3M/edit#slide=id.g185ef17b570_1_17)

### Deployed on Polygon Mumbai Testnet: [0x83b7D4ADc0dF14904F1a68DAE210489BE4ff19B4](https://mumbai.polygonscan.com/address/0xhttps://a16zcrypto.com/introducing-nft-licenses/83b7d4adc0df14904f1a68dae210489be4ff19b4)

### [NFT Licenses](https://a16zcrypto.com/introducing-nft-licenses/)

## Two Step Authentication Using Soul Bound Tokens  

#### Sign-Up  

##### New Users,  
Users will be signing up with their name and a information,  
Users will be minting a Soul Bound NFT that will be later using as a verifying proof,  
Smart Contract will create a hash using addressOfUser, nameOfUser, informationOfUser,  
And the hash is mapped with the Soul Bound NFT tokenID.  

#### Sign-In  

##### Existing Users,  
If users have already signed-up then they will be able to access the platform,  
If not they will be redirected to sign-up,  
In the smart contract we are using a Soul Bound KYC proof to verify,  
So that no user can bypass the SBT.

## Motivation:  
On-chain verification is becoming indispensable across web3 (particularly in DeFi, DAO, and governance) as it is needed not only by the government for regulatory purposes, but also by protocols to whitelist users fulfilling certain criteria.  
This created the necessity of building on-chain verification of the addresses for token transfers (like stablecoin providers checking for blacklisted entities for the destination address, limited utility tokens for a DAO community, etc).  
Finally, the existing proposals are based on a trusted entity creating on-chain/off-chain signatures to manage a whitelist and are thus not decentralized protocols.  
To make it the best way in a decentralized community that will do good for all type of customers,  
Using Can’t Be Evil Licenses by a16z for this community to follow few sets of rules and regulations which is selected by the creator.  

## Focused Users/Platform:  
Anywhere where user data is stored.  
Wherever there’s a need to distinguish user.  
Covers the bulk of KYC instances towards retail customers:  
• Finance: open a transaction account, purchase, sell or exchange cryptocurrencies   
• Tax & Accounting: obtain advice on accounting or tax matters, register as beneficiary   
• Legal: obtain legal advice, representation or support   
• Telecom: acquire a mobile plan (pre-paid or post-paid)  
• Real Estate: enter into rental agreement.  

## Buildbear:  
I’ve deployed this smart contract on [BuildBear](https://buildbear.io/),  
it creates a testnet for you, you can also create a customised node, which is amazing.  
Here’s a [guide](https://medium.com/buildbear/learn-code-and-deploy-your-own-multisig-wallet-and-test-it-with-your-friends-now-cb86cdcb8c8) for the process.

You can see my deployed contract on BuildBear [here](https://explorer.buildbear.io/node/great-goldwasser-d01031/address/0xc2d406F6ea337505A340C7C8E0E3b8422983B8ee) and interact with it in the write contract option  
And when you have a transaction, go to the transaction detail and over there you’ll find a section called ‘ADVANCE’ where you’ll find the values that you passed in the transaction.

## Future Perspective:  
Apply ZK so that an entity can be proven without revealing which entity the proof refers to using Merkle Proof.  
Making it ZK KYC Authentication using [Zero-Knowledge KYC Certificates](https://github.com/ethereum/EIPs/pull/5851/files)

# Open for discussion.

