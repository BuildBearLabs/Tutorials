const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

//Owner test
describe("Test For Owner", function () {

  let vendMachine;
  let owner;
  let notAOwner;
  let customer;

  beforeEach(async () => {
    const VendMachine = await ethers.getContractFactory('VendSmartContract');
    vendMachine = await VendMachine.deploy();
    await vendMachine.deployed();

    [owner, notAOwner, customer] = await ethers.getSigners();
  });

  //OWNER FUNCTION TEST 

  it('should allow owner to restock products', async () => {
    const Id = 4;
    const Name = 'KitKat';
    const Price = 2;
    const Quantity = 5;
    const ImageURL = '/';

    await vendMachine.reStock(Id, Name, Price, Quantity, ImageURL);

    const product = await vendMachine.Products(Id);

    expect(product.id).to.equal(Id);
    expect(product.name).to.equal(Name);
    expect(product.price).to.equal(Price);
    expect(product.quantity).to.equal(Quantity);
    expect(product.imageURL).to.equal(ImageURL);
  });


  it('should not allow not a owner to restock products', async () => {
    const Id = 4;
    const Name = 'KitKat';
    const Price = 2;
    const Quantity = 5;
    const ImageURL = '/';

    await expect(vendMachine.connect(notAOwner).reStock(Id, Name, Price, Quantity, ImageURL)).to.be.revertedWith('Only the owner have permission.');
  });

  it('should allow  owner to withdraw', async () => {

    const Id = 2;
    const Price = 2;
    await vendMachine.connect(customer).purchaseSingleProduct(Id, { value: Price });


    const initialBalance = await ethers.provider.getBalance(owner.address);

    console.log(initialBalance)

    const gasPrice = await ethers.provider.getGasPrice();
    const gasLimit = await vendMachine.estimateGas.withdraw();

    await vendMachine.connect(owner).withdraw({ gasPrice, gasLimit });



    console.log(gasLimit, gasPrice);

    const newBalance = await ethers.provider.getBalance(owner.address);

    // expectedBalance = initialBalance + productPrice - gasPrice * gasLimit
    const expectedBalance = initialBalance.sub(gasPrice.mul(gasLimit));

    console.log(`Expected -> ${expectedBalance} === new Balance after widraw ${newBalance}`)
    expect(newBalance).to.equal(expectedBalance);
  });

  it('should revert when a non-owner attempts ti widraw', async () => {
    await expect(vendMachine.connect(notAOwner).withdraw()).to.be.revertedWith('Only the owner have permission.');
  });

});

//CUSTOMER FUNCTION TEST
describe("Test For Single product purchase", function () {

  let vendMachine;
  let owner;
  let notAOwner;
  let customer;

  beforeEach(async () => {
    const VendMachine = await ethers.getContractFactory('VendSmartContract');
    vendMachine = await VendMachine.deploy();
    await vendMachine.deployed();

    [owner, notAOwner, customer] = await ethers.getSigners();
  });

  it('PurchaseSingleItem', async () => {
    const Id = 1;
    const Price = 2;
    const initialQuantity = 10;
    const expectedQuantity = 9;

    await vendMachine.connect(customer).purchaseSingleProduct(Id, { value: Price });

    const newQuantity = (await vendMachine.Products(Id)).quantity;

    console.log(newQuantity);

    // expect(purchaseEvent.args.id).to.equal(productId);
    // expect(purchaseEvent.args.name).to.equal('Coca Cola');
    // expect(purchaseEvent.args.price).to.equal(productPrice);

    // Check that the new product quantity is correct
    expect(newQuantity).to.equal(expectedQuantity);
  });



  it('invalid product', async () => {
    const Id = 5;
    const Price = 2;

    await expect(vendMachine.connect(customer).purchaseSingleProduct(Id, { value: Price })).to.be.revertedWith('Invalid product price.');
  });


  it('out of stock', async () => {
    const Id = 1;
    const Price = 2;
    for (let i = 0; i < 10; i++) {
      await vendMachine.connect(customer).purchaseSingleProduct(Id, { value: Price });
    }
    await expect(vendMachine.connect(customer).purchaseSingleProduct(Id, { value: Price })).to.be.revertedWith('Product is out of stock.');
  });

})

//Cart Test

describe("Test For Cart", function () {

  let vendMachine;
  let owner;
  let notAOwner;
  let customer;

  beforeEach(async () => {
    const VendMachine = await ethers.getContractFactory('VendSmartContract');
    [owner, notAOwner, customer] = await ethers.getSigners();
    vendMachine = await VendMachine.connect(customer).deploy();
    await vendMachine.deployed();
    
  });

  it("add a product to their cart", async function() {
    await vendMachine.addToCart(1, 1);

    const [cart, totalPrice] = await vendMachine.getCart();
    // const totalCartPrice = await vendMachine.totalCartAmmount({ from: customer.address });
    expect(cart.length).to.equal(1);
    expect(totalPrice).to.equal(2);
  });
  

  it("purchase the products in their cart", async function() {
    await vendMachine.addToCart(1, 2);
    await vendMachine.checkOutCart({ value: 20 });
    const [cart, totalPrice] = await vendMachine.getCart();
    expect(cart.length).to.equal(0);
    expect(totalPrice).to.equal(0);
    const updatedProduct = await vendMachine.Products(1);
    expect(updatedProduct.quantity).to.equal(8);
  });
})


