// SPDX-License-Identifier: MIT
pragma solidity ^ 0.5.4;
contract shopping {

	address payable public owner;

	constructor() public {
		owner = msg.sender;
	}
	struct seller {
		string name;
		address addr;
		uint bankGuaraantee;
		bool bgPaid;
	}
	struct product {
		string productId;
		string productName;
		string Category;
		uint price;
		string description;
		address payable seller;
		bool isActive;
	}
	mapping(address => seller) public sellers;
	mapping(string => product) products;
	product[] public allProducts;

	function sellerSignUp(string memory _name) public payable {
		require(!sellers[msg.sender].bgPaid);
		require(msg.value == 1000 wei, "Bank Guarantee of 1000 wei Required");
		owner.transfer(msg.value);
		sellers[msg.sender].name = _name;
		sellers[msg.sender].addr = msg.sender;
		sellers[msg.sender].bankGuaraantee = msg.value;
		sellers[msg.sender].bgPaid = true;
	}

	function addProduct(string memory _productId, string memory _productName, string memory _category, uint _price, string memory _description) public {
		require(!products[_productId].isActive);
		require(sellers[msg.sender].bgPaid);

		product memory product = product(_productId, _productName, _category, _price, _description, msg.sender, true);
		products[_productId].productId = _productId;
		products[_productId].productName = _productName;
		products[_productId].Category = _category;
		products[_productId].description = _description;
		products[_productId].price = _price;
		products[_productId].seller = msg.sender;
		products[_productId].isActive = true;
		allProducts.push(product);

	}
}