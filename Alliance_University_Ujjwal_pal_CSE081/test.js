describe('Shopping', function () {
    let shopping;
    let sellerAddress;
    let buyerAddress;
  
    before(async function () {
      shopping = await Shopping.new();
      sellerAddress = web3.eth.accounts.create().address;
      buyerAddress = web3.eth.accounts.create().address;
      await shopping.sellerSignUp('Seller', { from: sellerAddress, value: 1000 });
      await shopping.createAccount('Buyer', 'buyer@example.com', '123 Main St', { from: buyerAddress });
      await shopping.addProduct('product1', 'Product 1', 'Category 1', 100, 'Description 1', { from: sellerAddress });
    });
  
    describe('#sellerSignUp', function () {
      it('should register a new seller', async function () {
        const seller = await shopping.sellers(sellerAddress);
        assert.strictEqual(seller.name, 'Seller');
        assert.strictEqual(seller.addr, sellerAddress);
        assert.strictEqual(seller.bankGuarantee.toNumber(), 1000);
        assert.strictEqual(seller.bgPaid, true);
      });
    });
  
    describe('#createAccount', function () {
      it('should create a new user account', async function () {
        const user = await shopping.users(buyerAddress);
        assert.strictEqual(user.name, 'Buyer');
        assert.strictEqual(user.email, 'buyer@example.com');
        assert.strictEqual(user.deliveryAddress, '123 Main St');
        assert.strictEqual(user.isCreated, true);
      });
    });
  
    describe('#buyProduct', function () {
      it('should allow a user to purchase a product', async function () {
        await shopping.buyProduct('product1', { from: buyerAddress, value: 100 });
        const order = await shopping.userOrders(buyerAddress, 0);
        assert.strictEqual(order.productId, 'product1');
        assert.strictEqual(order.orderStatus, 'Order Placed With Seller');
        assert.strictEqual(order.purchaseId.toNumber(), 0);
        assert.strictEqual(order.shipmentStatus, '');
      });
    });
  
    // Add more test cases for other functions as needed.
  });
  