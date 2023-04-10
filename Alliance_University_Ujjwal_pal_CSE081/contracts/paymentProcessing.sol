// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PaymentProcessor {
    enum PaymentStatus { Pending, Paid, Refunded }
    
    struct Payment {
        uint256 paymentId;
        address payable buyer;
        address payable seller;
        uint256 amount;
        PaymentStatus status;
    }
    
    uint256 public paymentCount;
    mapping(uint256 => Payment) public payments;
    
    event PaymentCreated(uint256 indexed paymentId, address indexed buyer, address indexed seller, uint256 amount);
    event PaymentPaid(uint256 indexed paymentId, address indexed payer);
    event PaymentRefunded(uint256 indexed paymentId, address indexed payer);
    
    function createPayment(address payable _seller) public payable {
        paymentCount++;
        payments[paymentCount] = Payment(paymentCount, payable(msg.sender), _seller, msg.value, PaymentStatus.Pending);
        emit PaymentCreated(paymentCount, msg.sender, _seller, msg.value);
    }
    
    function pay(uint256 _paymentId) public payable {
        Payment storage payment = payments[_paymentId];
        require(msg.sender == payment.buyer, "Only the buyer can pay for this payment");
        require(msg.value == payment.amount, "Incorrect payment amount");
        require(payment.status == PaymentStatus.Pending, "Invalid payment status for payment");
        payment.seller.transfer(msg.value);
        payment.status = PaymentStatus.Paid;
        emit PaymentPaid(_paymentId, msg.sender);
    }
    
    function refund(uint256 _paymentId) public {
        Payment storage payment = payments[_paymentId];
        require(msg.sender == payment.seller, "Only the seller can refund this payment");
        require(payment.status == PaymentStatus.Paid, "Invalid payment status for refund");
        payment.buyer.transfer(payment.amount);
        payment.status = PaymentStatus.Refunded;
        emit PaymentRefunded(_paymentId, msg.sender);
    }
}
