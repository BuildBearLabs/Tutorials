// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
contract IPLBetting {
    struct Bet {
        address bettor;
        uint amount;
        uint team;
        bool paidOut;
    }
    
    Bet[] public bets;
    uint public winningTeam;
    bool public gameSettled;
    address public owner;
    constructor() {
        owner = msg.sender;
    }
    
    function placeBet(uint _team) public payable {
        require(msg.value > 0, "Bet amount must be greater than 0.");
        require(gameSettled == false, "Betting is closed.");
        require(_team <= 2, "Invalid team selection.");
        
        bets.push(Bet(msg.sender, msg.value, _team, false));
    }
    
    function settleBet(uint _winningTeam) public {
        require(msg.sender == owner, "Only the owner can settle the bet.");
        require(gameSettled == false, "The game has already been settled.");
        require(_winningTeam <= 2, "Invalid team selection.");
        
        winningTeam = _winningTeam;
        gameSettled = true;
        
        uint totalWinningAmount = 0;
        uint totalLosingAmount = 0;
        
        for (uint i = 0; i < bets.length; i++) {
            if (bets[i].team == winningTeam) {
                totalWinningAmount += bets[i].amount;
                bets[i].paidOut = true;
            } else {
                totalLosingAmount += bets[i].amount;
            }
        }
        
        for (uint i = 0; i < bets.length; i++) {
            if (bets[i].paidOut == false) {
                uint payout = (bets[i].amount * totalWinningAmount) / (totalWinningAmount + totalLosingAmount);
                payable(bets[i].bettor).transfer(payout);
                bets[i].paidOut = true;
            }
        }
    }
    
    function getNumBets() public view returns (uint) {
        return bets.length;
    }
    
    function getBet(uint _index) public view returns (address, uint, uint, bool) {
        require(_index < bets.length, "Invalid index.");
        return (bets[_index].bettor, bets[_index].amount, bets[_index].team, bets[_index].paidOut);
    }
    
    function getWinningTeam() public view returns (uint) {
        require(gameSettled == true, "The game has not been settled yet.");
        return winningTeam;
    }
}

