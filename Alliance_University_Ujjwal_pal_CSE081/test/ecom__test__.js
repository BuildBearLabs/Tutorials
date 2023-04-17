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

    const order = await shopping.userOrders(buyer.address);
    expect(order.productId).to.equal(productId);
    expect(order.orderStatus).to.equal("Order Placed With Seller");
    expect(order.purchaseId).to.equal(0);
    expect(order.shipmentStatus).to.equal("");

    const sellerOrder = await shopping.sellerOrders(seller.address, 0);
    expect(sellerOrder.productId).to.equal(productId);
    expect(sellerOrder.purchaseId).to.equal(0);
    expect(sellerOrder.orderedBy).to.equal(buyer.address);

    const sellerShipment = await shopping.sellerShipments(seller.address, 0);
    expect(sellerShipment.productId).to.equal(productId);
    expect(sellerShipment.purchaseId).to.equal(0);
    expect(sellerShipment.shipmentStatus).to.equal("");
    expect(sellerShipment.deliveryAddress).to.equal("123 Main St");
    expect(sellerShipment.orderedBy).to.equal(buyer.address);
    expect(sellerShipment.isActive).to.be.true;
    expect(sellerShipment.isCanceled).to.be.false;
  });
});

  