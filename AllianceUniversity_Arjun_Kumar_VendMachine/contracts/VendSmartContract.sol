// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

import "./../node_modules/hardhat/console.sol";

contract VendSmartContract {
    address public owner;
    address payable public beneficiary;
    // Structure to represent a product
    struct Product {
        uint id;            // Id of the product
        string name;        // Name of the product
        uint price;         // Price of the product
        uint quantity;      // Quantity of the product
        string imageURL;    // URL of the product image
    }

    // Structure to represent an item in the cart
    struct cartItem {
        uint id; //Id of the product
        uint quantity;  // Quantity of the product user will add
    }

    // Mapping to store the carts of different customers
    mapping(address => cartItem[]) public carts;

    // Mapping to store the products
    mapping(uint => Product) public Products;

    // Modifier: only allows the contract owner to execute certain functions
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner has permission.");
        _;
    }

    // Modifier: checks if a purchase is valid based on product availability and price
    modifier validPurchase(uint _id) {
        require(Products[_id].price > 0, "Invalid product price.");
        require(Products[_id].quantity > 0, "Product is out of stock.");
        _;
    }

    // Modifier: checks if the customer has enough funds to complete the purchase
    modifier enoughFunds() {
        cartItem[] storage cart = carts[msg.sender];
        uint totalPrice = totalCartAmount();
        require(msg.value >= totalPrice, "Insufficient funds");
        _;
    }

    // Event triggered when a product is purchased
    event ProductPurchased(Product, string message);

    //Event triggered when owner change beneficiary address
    event BeneficiaryChanged(address indexed previousBeneficiary, address indexed newBeneficiary);

    //Constructor
    constructor(address payable _beneficiary) {
        owner = msg.sender;
        beneficiary = _beneficiary; //beneficiary address same as owner
        reStock(1, "Coca Cola", 2, 10, "/");
        reStock(2, "lays", 2, 15, "/");
        reStock(3, "5star", 2, 15, "/");
    }

    // Customer function to purchase a single product
    function purchaseSingleProduct(
        uint _id
    )
        public
        payable
        validPurchase(_id)
        returns (uint, string memory, uint, uint)
    {
        Product storage product = Products[_id];
        product.quantity--;
        beneficiary.transfer(product.price);
        emit ProductPurchased(product, "ProductPurchased");
        return (product.id, product.name, product.price, product.quantity);
    }

    // Customer function to add a product to their cart
    function addToCart(uint _id, uint _quantity) public {

        cartItem[] storage cart = carts[msg.sender];

        // Check if the product is already in the cart
        uint findItem = findProductInCart(cart, _id);

        if (findItem != uint(0)) {
            // If the product is already in the cart, increase the quantity
            cart[findItem].quantity += _quantity;
        }
        else {
            // If the product is not in the cart, add it as a new item
            cartItem memory newItem = cartItem(_id, _quantity);
            cart.push(newItem);
        }
    }

    // Internal function to find the index of a product in the cart
    function findProductInCart(
        cartItem[] storage cart,
        uint _id
    ) internal view returns (uint) {
        for (uint i = 0; i < cart.length; i++) {
            if (cart[i].id == _id) {
                return i;
            }
        }
        return uint(0);
    }

    // Calculates the total amount to be paid for the items in the customer's cart
    function totalCartAmount() public view returns (uint) {
        cartItem[] storage cart = carts[msg.sender];
        uint totalPrice = 0;
        for (uint i = 0; i < cart.length; i++) {
            uint productId = cart[i].id;
            uint quantity = cart[i].quantity;
            Product storage product = Products[productId];
            totalPrice += product.price * quantity;
        }

        return totalPrice;
    }

    // Retrieves the customer's shopping cart and the total amount to be paid
    function getCart() public view returns (cartItem[] memory, uint) {
        cartItem[] storage cart = carts[msg.sender];
        uint totalPrice = totalCartAmount();
        return (cart, totalPrice);
    }


    // Completes the purchase process by deducting quantities from the inventory, transferring the payment to the owner, and clearing the cart
    function checkOutCart() public payable enoughFunds {
        cartItem[] storage cart = carts[msg.sender];

        for (uint i = 0; i < cart.length; i++) {
            Product storage product = Products[cart[i].id];
            require(
                product.quantity >= cart[i].quantity,
                "Not enough product available"
            );
            product.quantity -= cart[i].quantity;
            beneficiary.transfer(product.price * cart[i].quantity);
        }

        delete carts[msg.sender]; //After checkout delete the cart
    }



    //ONLY OWNER CAN CALL THIS FUNCTION

    // Allows the contract owner to add or update the details of a product in the inventory
    function reStock(
        uint _id,
        string memory _name,
        uint _price,
        uint _quantity,
        string memory _imageURL
    ) public onlyOwner {
        Products[_id] = Product(_id, _name, _price, _quantity, _imageURL);
    }

    function changeBeneficiary(address _newBeneficiary) public onlyOwner {
        require(_newBeneficiary != address(0), "Invalid new beneficiary address.");
        emit BeneficiaryChanged(beneficiary, _newBeneficiary);
        beneficiary = payable(_newBeneficiary);
    }

    function withdraw() public onlyOwner {
        beneficiary.transfer(address(this).balance); // Allows the contract owner to withdraw the contract's balance
    }



}






