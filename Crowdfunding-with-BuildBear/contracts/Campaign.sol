// SPDSX-License-Identifier: MIT
pragma solidity >0.8.0 <=0.9.0;

contract Campaign {

    // attributes of campaign
    mapping (address => uint256) public contributers;
    string public title;
    uint256 public requiredAmount;
    string public story;
    address payable public owner;
    uint256 public receivedAmount;
    bool public acceptingDonation = true;
    uint256 public deadline;

    event donated (
        address indexed donar,
        uint256 indexed amount,
        uint256 indexed timestamp
    );

    event withdrawn(uint256 amount);

    error TooHighDonation(string message, uint256 donationRemaining);

    constructor (
        string memory campaignTitle,
        uint256 requiredCampaignAmount,
        string memory storyURI,
        address campaignOwner,
        uint256 campaignDeadline
    ) {
        title = campaignTitle;
        requiredAmount = requiredCampaignAmount;
        story = storyURI;
        owner = payable(campaignOwner);
        deadline = campaignDeadline;
    }

      function donate() public payable {
        require(acceptingDonation);
        require(block.timestamp < deadline, "Deadline has Ended!");
        require(msg.value > 0, "Msg.value = 0");
        if (msg.value > requiredAmount - receivedAmount)
            revert TooHighDonation({
                message: "Donation room left",
                donationRemaining: requiredAmount - receivedAmount
            });
        receivedAmount += msg.value;
        contributers[msg.sender] += msg.value;
        if (receivedAmount >= requiredAmount) {
            acceptingDonation = false;
        }
        emit donated(msg.sender, msg.value, block.timestamp);
    }

function refund() public {
        require(block.timestamp > deadline && receivedAmount < requiredAmount);
        require(contributers[msg.sender] > 0, "Not eligible for refund");
        address payable user = payable(msg.sender);
        contributers[msg.sender] = 0;
        user.transfer(contributers[msg.sender]);
    }
    

    function withdraw() public {
        require(msg.sender == owner, "Only the owner can withdraw");
        require(!acceptingDonation, "Campaign still not over");
        owner.transfer(receivedAmount);
        emit withdrawn(receivedAmount);
    }

 


    fallback() external payable {
        donate();
    }

    receive() external payable {
        donate();
    }
}