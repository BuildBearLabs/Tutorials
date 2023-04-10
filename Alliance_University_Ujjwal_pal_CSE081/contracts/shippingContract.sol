// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Shipping {
    enum ShipmentStatus { Created, InTransit, Delivered, Lost }
    
    struct Shipment {
        uint256 shipmentId;
        address buyer;
        address seller;
        string item;
        ShipmentStatus status;
    }
    
    uint256 public shipmentCount;
    mapping(uint256 => Shipment) public shipments;
    
    event ShipmentCreated(uint256 indexed shipmentId, address indexed buyer, address indexed seller, string item);
    event ShipmentInTransit(uint256 indexed shipmentId);
    event ShipmentDelivered(uint256 indexed shipmentId);
    event ShipmentLost(uint256 indexed shipmentId);
    
    function createShipment(address _buyer, string memory _item) public {
        shipmentCount++;
        shipments[shipmentCount] = Shipment(shipmentCount, _buyer, msg.sender, _item, ShipmentStatus.Created);
        emit ShipmentCreated(shipmentCount, _buyer, msg.sender, _item);
    }
    
    function markInTransit(uint256 _shipmentId) public {
        Shipment storage shipment = shipments[_shipmentId];
        require(msg.sender == shipment.seller, "Only the seller can mark a shipment as in transit");
        require(shipment.status == ShipmentStatus.Created, "Invalid shipment status for in transit");
        shipment.status = ShipmentStatus.InTransit;
        emit ShipmentInTransit(_shipmentId);
    }
    
    function markDelivered(uint256 _shipmentId) public {
        Shipment storage shipment = shipments[_shipmentId];
        require(msg.sender == shipment.buyer, "Only the buyer can mark a shipment as delivered");
        require(shipment.status == ShipmentStatus.InTransit, "Invalid shipment status for delivery");
        shipment.status = ShipmentStatus.Delivered;
        emit ShipmentDelivered(_shipmentId);
    }
    
    function markLost(uint256 _shipmentId) public {
        Shipment storage shipment = shipments[_shipmentId];
        require(msg.sender == shipment.buyer || msg.sender == shipment.seller, "Only the buyer or seller can mark a shipment as lost");
        require(shipment.status == ShipmentStatus.InTransit, "Invalid shipment status for lost");
        shipment.status = ShipmentStatus.Lost;
        emit ShipmentLost(_shipmentId);
    }
}
