//SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;


contract restaurant{

    struct foodThali{
        uint id;
        string thaliName;
        uint price;
        uint stock;
        uint review;
        uint reviewNo;
    }

    struct order{
        uint orderId;
        uint thaliId;
        string thaliName;
        address customerAddr;
    }

    struct customer{
        string name;
        string addre;
        uint  custIdNo;
    }

    uint private custCount;
    address public owner;
    uint private orderCount;

    modifier onlyowner{
        require(msg.sender == owner , "Only owner has the rights to add rooms");
        _;
    }

    mapping(uint=>foodThali) public foodThaliDetails;
    mapping(uint=>order) public orderDetails;
    mapping(address=>customer) public customerDetails;

    constructor(){
        owner = msg.sender;
        setfoodThali(1, "Veg Thali", 79, 200, 0);
        setfoodThali(2, "Egg Thali", 89, 100, 0);
        setfoodThali(3, "Fish Thali", 99, 120, 0);
        setfoodThali(4, "Paneer Thali", 109, 80, 0);
        setfoodThali(5, "Chicken Thali", 119, 150, 0);
        setfoodThali(6, "Prawn Thali", 129, 50, 0);
    }

    function setfoodThali(uint _id, string memory _thaliName, uint _price, uint _stock, uint _review ) public onlyowner{
        foodThaliDetails[_id].thaliName = _thaliName;
        foodThaliDetails[_id].price = _price;
        foodThaliDetails[_id].stock = _stock;
        foodThaliDetails[_id].review = _review;
    }

    function setcust(address _addr , string memory _name ,string memory _addre) public {
        customerDetails[_addr].name = _name;
        customerDetails[_addr].addre = _addre;
        customerDetails[_addr].custIdNo = custCount;
        custCount++ ;
    }


    function payToOrder() public payable {
        if(msg.value==79){
            orderVegThali();
        }
        else if(msg.value==89){
            orderEggThali();
        }
        else if(msg.value==99){
            orderFishThali();
        }
        else if(msg.value==109){
            orderPaneerThali();
        }
        else if(msg.value==119){
            orderChickenThali();
        }
        else if(msg.value==129){
            orderPrawnThali();
        }
        else{
            revert();
        }
    }

    
    function orderVegThali() internal {
       require(foodThaliDetails[1].stock > 0 , "No more stock available.");
        foodThaliDetails[1].stock-- ;
        orderDetails[orderCount].orderId = orderCount;
        orderDetails[orderCount].thaliId = 1;
        orderDetails[orderCount].thaliName = foodThaliDetails[1].thaliName;
        orderDetails[orderCount].customerAddr = msg.sender;
        orderCount++;
    }
    
    function orderEggThali() internal {
       require(foodThaliDetails[2].stock > 0 , "No more stock available.");
        foodThaliDetails[2].stock-- ;
        orderDetails[orderCount].orderId = orderCount;
        orderDetails[orderCount].thaliId = 2;
        orderDetails[orderCount].thaliName = foodThaliDetails[2].thaliName;
        orderDetails[orderCount].customerAddr = msg.sender;
        orderCount++;
    }
    
    function orderFishThali() internal {
       require(foodThaliDetails[3].stock > 0 , "No more stock available.");
        foodThaliDetails[3].stock-- ;
        orderDetails[orderCount].orderId = orderCount;
        orderDetails[orderCount].thaliId = 3;
        orderDetails[orderCount].thaliName = foodThaliDetails[3].thaliName;
        orderDetails[orderCount].customerAddr = msg.sender;
        orderCount++;
    }
    
    function orderPaneerThali() internal {
       require(foodThaliDetails[4].stock > 0 , "No more stock available.");
        foodThaliDetails[4].stock-- ;
        orderDetails[orderCount].orderId = orderCount;
        orderDetails[orderCount].thaliId = 4;
        orderDetails[orderCount].thaliName = foodThaliDetails[4].thaliName;
        orderDetails[orderCount].customerAddr = msg.sender;
        orderCount++;
    }
    
    function orderChickenThali() internal {
       require(foodThaliDetails[5].stock > 0 , "No more stock available.");
        foodThaliDetails[5].stock-- ;
        orderDetails[orderCount].orderId = orderCount;
        orderDetails[orderCount].thaliId = 5;
        orderDetails[orderCount].thaliName = foodThaliDetails[5].thaliName;
        orderDetails[orderCount].customerAddr = msg.sender;
        orderCount++;
    }
    
    function orderPrawnThali() internal {
       require(foodThaliDetails[6].stock > 0 , "No more stock available.");
        foodThaliDetails[6].stock-- ;
        orderDetails[orderCount].orderId = orderCount;
        orderDetails[orderCount].thaliId = 6;
        orderDetails[orderCount].thaliName = foodThaliDetails[6].thaliName;
        orderDetails[orderCount].customerAddr = msg.sender;
        orderCount++;
    }

    function rateOrder(uint _orderId, uint _rating) external {
        require(orderDetails[_orderId].customerAddr == msg.sender, "The order Number is wrong.");
        uint locThaliId = orderDetails[_orderId].thaliId;
        foodThaliDetails[locThaliId].review = (_rating + (foodThaliDetails[locThaliId].review*foodThaliDetails[locThaliId].reviewNo)) / (foodThaliDetails[locThaliId].reviewNo + 1) ;
        foodThaliDetails[locThaliId].reviewNo++;
    }
}