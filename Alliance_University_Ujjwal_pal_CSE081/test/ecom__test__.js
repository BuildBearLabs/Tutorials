const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("shopping contract", function () {
  let owner;
  let seller;
  let buyer;
  let shopping;

  beforeEach(async function () {
    [owner, seller, buyer] = await ethers.getSigners();

    const Shopping = await ethers.getContractFactory("shopping");
    shopping = await Shopping.connect(owner).deploy();
    await shopping.deployed();
  });

  it("should add a product", async function () {
    await shopping.connect(seller).sellerSignUp("Seller 1", { value: 1000 });
    await shopping.connect(buyer).createAccount("Buyer 1", "buyer1@example.com", "123 Main St");

    const productId = "product1";
    const productName = "Product 1";
    const category = "Category 1";
    const price = 100;
    const description = "This is product 1";

    await shopping.connect(seller).addProduct(productId, productName, category, price, description);

    const product = await shopping.allProducts(0);
    
    expect(product.productId).to.equal(productId);
    expect(product.productName).to.equal(productName);
    expect(product.Category).to.equal(category);
    expect(product.description).to.equal(description);
    expect(product.seller).to.equal(seller.address);

  });

  it("should buy a product and create an order", async function () {
    await shopping.connect(seller).sellerSignUp("Seller 1", { value: 1000 });
    await shopping.connect(buyer).createAccount("Buyer 1", "buyer1@example.com", "123 Main St");

    const productId = "product1";
    const productName = "Product 1";
    const category = "Category 1";
    const price = 100;
    const description = "This is product 1";

    await shopping.connect(seller).addProduct(productId, productName, category, price, description);


    await shopping.connect(buyer).buyProduct(productId, { value: price });

    await expect(shopping.connect(buyer).buyProduct("product1", { value: 100 }))
    .to.emit(shopping, "OrderPlaced");
  });

  it("should allow a buyer to cancel an order", async function () {
    await shopping.connect(seller).sellerSignUp("My Store", { value: 1000 });
    await shopping.connect(seller).addProduct("product1", "Product 1", "Category A", 100, "Description");
  });
});

  