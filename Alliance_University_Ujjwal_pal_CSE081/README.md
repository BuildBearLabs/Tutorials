# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
###Description For the Smart Contract
##Registering as Seller and Paying the owner a fee of 1000 Wei
#1. Create a Public address variable owner and made deployer address as owner in the constructor.
Use address mappings pointing to our struct seller. Here seller struct consists of all required details about the seller.
Add a method sellerSignup to check if the seller is already registered and check if msg.value along with the function is equal to 1000 Wei or not.

#2. List Product With All Required Details
  Add a struct product with all required variables and made string mapping to the struct, so that you can update or buy Product with productId String Add a function to check whether the seller paid the bank guarantee or not and to check if a product with the same productId is active already.

#3.Track Orders Placed By Buyers
 Add a struct ordersPlaced with required Tracking Detail variables and mapped struct array with seller address.
 Pushed Order details to map sellerOrders when buyer placed an order.
 Track Orders Placed by buyers with purchaseId

*4. Ship Products And Update Shipment Details
  Create a Struct sellerShipment with all required variables for Tracking and Updating Details and mapped this struct to address and nested uint.
  Every seller can update shipment details with unique purchaseId
  Update Shipment details with function updateShipments with purchaseId

#5. Refund Cancelled Orders
 Create a function refund to check if Product with particular purchaseId is active or not, check if Buyer Cancelled Order or not and then check if seller Released amount equal to product price.

#6. Create Buyer's Account
 Create a Struct user with required user details and mapped it to address.
 Add a function createAccount and pushed function arguments(user details) to the users mapping.

#7. Place A Order And Tracking Orders

#8. Cancelling An Order
 Add a function to cancel an order it takes purchaseId as an argument and checks if the product with particular purchaseId is ordered by the current caller or not if the product with particular purchaseId is active or not.

#9. The final Smart Contract "Ecom.sol"