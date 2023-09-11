// SPDX-License-Identifier:""
pragma solidity ^0.8.20;

contract hotelBooking{
    address public owner;
    uint public noOfRooms
}

//defining a struct for the hotel  room
struct hotelRoom
{
   string categoryName;
   uint tariff;
   bool occupied;
   uint review;
   uint reviewNo;
   address costumersBooked;
   bool booked;
   uint checkoutTimestamp;
}

//mapping from room number to room details. 
mapping(uint => hotelRoom) public hotelRoomDetails;

//constructor to set the contract owner and activate room
constructor()
{
    owner = msg.sender;
    setHotelRoom(1, "Royal", 10);
    setHotelRoom(2, "Premium", 5);
    setHotelRoom(3, "Delux", 3);

}

//modifying to ensure thatz only the contract owsnser can call t.he modifer
modifier onlyOwner()
{
    require(msg.sender == owner, "only the contract owner can call this function")
}
struct costumer
{
string name;
string addres;
uint custIdNo;
}

//function to set hotel room details
function setHotelRoom( uint _roomNo, string memory _categoryName,
uint _tariff) public onlyOwner
{
hotelRoomDetails[ _roomNo].categoryName = _categoryName;
hotelRoomDetails[ _roomNo].tariff = _tariff;
hotelRoomDetails[ _roomNo].review = 0;
hotelRoomDetails[ _roomNo].reviewNo = 0;
hotelRoomDetails[ _roomNo].occupied = false;
hotelRoomDetails[ _roomNo].customerBooked = address(0);
hotelRoomDetails[ _roomNo].false;
hotelRoomDetails[ _roomNo].checkoutTimestamp = 0;
noOfRooms++;
}

//function to book the Royal room.
function bookRoomRoyal() public payable
{
    require(msg.value == 10, "Incorrect payment amount");
    require(!hotelRoomDetails[1].booked, "Room is already booked");
    hotelRoomDetails[1].booked =true;
    hotelRoomDetails[1].occupied = true;
    hotelRoomDetails[1].customerBooked = msg.sender;
    hotelRoomDetails[1].checkoutTimestamp = block.timestamp;
}

//funcetion to book the Premuim room.
function bookRoomPremium() public payable
{
    require(msg.value == 5, "Incorrect payment amount");
    require(!hotelRoomDetails[2].booked, "Room is already booked");
    hotelRoomDetails[2].booked = true;
    hotelRoomDetails[2].occupied = true;
    hotelRoomDetails[2].customerBooked = msg.sender;
    hotelRoomDetails[2].checkoutTimestamp = block.timestamp;
}

//function to book delux room. 
function bookRoomDelux() public payable
{
    require(msg.value == 2, "Incorrect payment amount");
    require(!hotelRoomDetails[3].booked, "Room is already occupied");
    hotelRoomDetails[3].booked = true;
    hotelRoomDetails[3].occupied = true;
    hotelRoomDetails[3].customerBooked = msg.sender;
    hotelRoomDetails[3].checkoutTimestamp = block.timestamp;
}

