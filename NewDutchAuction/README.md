# Dutch Auction Contract Readme

## Overview

This Dutch Auction contract is designed to facilitate the sale of non-fungible tokens (NFTs) in a unique and dynamic manner. In a Dutch Auction, the price of the NFT starts high and gradually decreases over time until a buyer decides to purchase it at the current price or until the auction expires. 

## Features

### Dutch Auction Mechanics

- **Price Reduction**: The starting price of the NFT is set by the seller, and it decreases linearly over a specified duration based on the discount rate.
- **Duration**: The auction has a fixed duration of 7 days, during which potential buyers can purchase the NFT at the current price.
- **Discount Rate**: The rate at which the NFT price decreases over time is determined by the discount rate. A higher discount rate results in a steeper price reduction.
- **Expiration**: The auction automatically expires after 7 days or when a buyer purchases the NFT, whichever comes first.

### NFT Transfer

- **Transfer**: Once a buyer purchases the NFT, it is transferred from the seller to the buyer using the `transferFrom` function from the ERC-721 interface.
- **Refund**: If the buyer sends more Ether than the current NFT price, they receive a refund for the excess amount.


### Using the Contract

1. **Deploy the Contract**: Deploy the Dutch Auction contract, specifying the following parameters:
   - Starting Price: The initial price of the NFT.
   - Discount Rate: The rate at which the price decreases per second.
   - NFT Address: The address of the ERC-721 NFT contract.
   - NFT ID: The ID of the NFT you want to auction.

2. **Initiate the Auction**: The auction starts automatically upon contract deployment. The starting and expiration times are set accordingly.

3. **Purchase the NFT**:
   - To purchase the NFT at the current price, send Ether to the Dutch Auction contract's address.
   - Make sure to send at least the current price to successfully purchase the NFT.

4. **NFT Transfer**:
   - Upon a successful purchase, the NFT will be transferred to your Ethereum address.
   - If you sent more Ether than the current price, you will receive a refund for the excess amount.

5. **Auction Expiration**:
   - If the auction expires without any purchases, the NFT remains with the seller.

