// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract EventHub {
    // event information
    struct Event {
        address eventOwner;
        string title;
        string description;
        string eventImage;
        string date;
        string time;
        uint eventCost;
        string meetUrl;
        address[] members;
        uint ticketLimit;
    }

    // record of all events
    Event[] public allEvents;

    // track events by creator

    // create an event
    function createEvent(string memory _title, string memory _description, string memory _eventImage, string memory _date, string memory _time, uint _eventCost, string memory _meetUrl, uint _ticketLimit) public {
        // store the new event temporarily
        Event memory newEvent = Event(msg.sender, _title, _description, _eventImage, _date, _time, _eventCost, _meetUrl, new address[](0), _ticketLimit);

        // push the event
        allEvents.push(newEvent);
    } 

    // get all events
    function getAllEvents() public view returns (Event[] memory) {
        return allEvents;
    }

    // register for an event
    function registerForEvent(address payable _owner, uint _cost, uint _idx) public payable onlyParticipant(_owner) {
        require(_idx < allEvents.length, "Invalid event");

        // get the event
        Event storage selectedEvent = allEvents[_idx];

        // // check for ticket availability
        require(selectedEvent.members.length < selectedEvent.ticketLimit, "Not enough seats available.");

        // // check if the amount is correct
        require(msg.value == _cost, "Please pay the right amount of ether");
        (bool sent, ) = _owner.call{value: msg.value}("");
        require(sent, "Registration Failed");

        // push the participant after successful payment
        selectedEvent.members.push(msg.sender);
    }

    // modifiers
    modifier onlyParticipant(address _owner) {
        require(msg.sender != _owner, "The organizer cannot register for the event.");
        _;
    }
}