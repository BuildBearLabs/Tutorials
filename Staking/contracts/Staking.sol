// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Staking {
    address public owner;
    // amt of ethers staked by an address
    struct Position {
        uint positionId;
        address walletAddress;
        uint createdDate;
        uint unlockDate;
        uint percentInterest;
        uint weiStaked;
        uint weiInterest;
        bool open;
    }

    Position position;
    uint public currentPositionId;
    mapping (uint => Position) public positions;
    mapping (address => uint[]) public positionIdsByAddress;
    mapping (uint => uint) public tiers;
    uint[] public lockPeriods; // 30 days / 60 days 

    constructor () payable {
        owner = msg.sender;
        currentPositionId = 0;
        tiers[30] = 700; // 30 days -> 7%
        tiers[90] = 1000; // 90 days -> 10%
        tiers[180] = 1200; // 180 days -> 12%

        lockPeriods.push(30);
        lockPeriods.push(90);
        lockPeriods.push(180);
    }

    // num of days staked for
    function stakeEther(uint numDays) external payable {
        require(tiers[numDays] > 0, "Mapping not found");
        positions[currentPositionId] = Position(
            currentPositionId,
            msg.sender,
            block.timestamp,
            block.timestamp + (numDays * 15180),
            tiers[numDays],
            msg.value,
            calculateInterest(tiers[numDays], msg.value),
            true
        );

        positionIdsByAddress[msg.sender].push(currentPositionId);
        currentPositionId += 1;
    }


    function calculateInterest(uint basisPoints, uint weiAmount) private pure returns (uint) {
        return basisPoints * weiAmount / 10000;
    }

    function modifyLockPeriods(uint numDays, uint basisPoints) external {
        require(owner == msg.sender, "Only owner may modify staking periods");
        tiers[numDays] = basisPoints;
        lockPeriods.push(numDays);
    }

    function getLockPeriods() external view returns(uint[] memory) {
        return lockPeriods;
    }

    function getInterestRate(uint numDays) external view returns (uint) {
        return tiers[numDays];
    }

    function getPositionById(uint positionId) external view returns (Position memory) {
        return positions[positionId];
    }

    function getPositionIdsForAddress(address walletAddress) external view returns (uint[] memory) {
        return positionIdsByAddress[walletAddress];
    }

  function closePosition(uint positionId) external {
        require(positions[positionId].walletAddress == msg.sender, "Only position creator can modify the position");
        require(positions[positionId].open == true, "Position is closed");
        positions[positionId].open = false;

        if(block.timestamp > positions[positionId].unlockDate) {
            uint amount = positions[positionId].weiStaked + positions[positionId].weiInterest;
            payable(msg.sender).call{value: amount}("");
        } else {
            payable(msg.sender).call{value: positions[positionId].weiStaked}("");
        }
    }
  
}