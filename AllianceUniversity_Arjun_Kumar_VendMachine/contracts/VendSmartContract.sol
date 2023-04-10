// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

import "./../node_modules/hardhat/console.sol";

contract VendSmartContract {
    address payable public owner;

    struct Product {
        uint id;
        string name;
        uint price;
        uint quantity;
        string imageURL;
    }

    struct cartItem {
        uint id; //Id of the product
        uint quantity;
    }

    mapping(address => cartItem[]) public carts;

    mapping(uint => Product) public Products;

    //Modifers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner have permission.");
        _;
    }

    modifier validPurchase(uint _id) {
        require(Products[_id].price > 0, "Invalid product price.");
        require(Products[_id].quantity > 0, "Product is out of stock.");
        _;
    }

    modifier enoughFunds() {
        cartItem[] storage cart = carts[msg.sender];

        uint totalPrice = totalCartAmmount();
        require(msg.value >= totalPrice, "Insufficient funds");

        _; 
    }

    //Event
    event ProductPurchased(Product, string message);

    constructor() {
        owner = payable(msg.sender);

        reStock(1, "Coca Cola", 2, 10, "/");
        reStock(2, "lays", 2, 15, "/");
        reStock(3, "5star", 2, 15, "/");
    }

    //Customer
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
        owner.transfer(product.price);
        emit ProductPurchased(product, "ProductPurchased");
        return (product.id, product.name, product.price, product.quantity);
    }

    function addToCart(uint _id, uint _quantity) public {

        cartItem[] storage cart = carts[msg.sender];

        //if product already in basket
        uint findItem = findProductInCart(cart, _id);

        if (findItem != uint(0)) {
            cart[findItem].quantity += _quantity;
        }
        else {
            cartItem memory newItem = cartItem(_id, _quantity);
            cart.push(newItem);
        }
    }

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

    function totalCartAmmount() public view returns (uint) {
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

    function getCart() public view returns (cartItem[] memory, uint) {
        cartItem[] storage cart = carts[msg.sender];
        uint totalPrice = totalCartAmmount();
        return (cart, totalPrice);
    }



    function checkOutCart() public payable enoughFunds {
        cartItem[] storage cart = carts[msg.sender];

        for (uint i = 0; i < cart.length; i++) {
            Product storage product = Products[cart[i].id];
            require(
                product.quantity >= cart[i].quantity,
                "Not enough product available"
            );
            product.quantity -= cart[i].quantity;
            owner.transfer(product.price * cart[i].quantity);
        }

        delete carts[msg.sender];
    }



    //Owner of vending machine
    function reStock(
        uint _id,
        string memory _name,
        uint _price,
        uint _quantity,
        string memory _imageURL
    ) public onlyOwner {
        Products[_id] = Product(_id, _name, _price, _quantity, _imageURL);
    }

    function withdraw() public onlyOwner {
        owner.transfer(address(this).balance);
    }
}
