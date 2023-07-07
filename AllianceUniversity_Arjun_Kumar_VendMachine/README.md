# Vending Machine smart contract

### Feature
#### Buyer
    - Buyer can add to cart addToCart() function or buy single item purchaseSingleProduct()
    - struct cartItem contains id of product and quantity buyer want to add
    - getCart() function will display total ammount and items in cart 
    - checkOutCart() function transfer the amount to owner and bueyr get product
    - checkOutCart() function runs only if 
            - totalprice <= buyer present ammount 
            - quantity > 0
#### Owner 
    - reStock() only owner can call this function
        - struct Product {Id, name, price, quantity, imageURL }
        - mapping into Products unit => Product
    - withdraw() only owner call this function 
        - Total ammount tranfer to owner address 
```shell
npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
