pragma solidity >=0.6.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

contract Lottery is ERC721Holder {
    // list of participants by lottery
    mapping(uint => address[]) public participants;

    mapping(uint => LOT) public lotteries;
    uint256[] lotterycreated;
    mapping(uint => bool) public checkLottery;
    struct LOT {
        address creator;
        uint start_at;
        uint end_at;
        IERC721 ERC_721_TOKEN;
        uint assetId;
        uint256 ticketprice;
    }

    function startLottery(
        uint lotteryId,
        uint start_at,
        uint end_at,
        address erc721Token,
        uint assetId,
        uint256 _ticketPrice
    ) external returns (bool) {
        require(start_at > block.timestamp, "NFT Lottery: invalid start_at");
        require(start_at < end_at, "NFT Lottery: invalid end_at");

        if (!checkLottery[lotteryId]) {
            lotteries[lotteryId] = LOT(
                msg.sender,
                start_at,
                end_at,
                IERC721(erc721Token),
                assetId,
                _ticketPrice
            );
            IERC721(erc721Token).safeTransferFrom(
                msg.sender,
                address(this),
                assetId
            );
            lotterycreated.push(lotteryId);
            checkLottery[lotteryId] = true;
        }
        return true;
    }

    function random(uint lotteryId) private view returns (uint) {
        return
            uint(
                keccak256(
                    abi.encodePacked(
                        block.prevrandao,
                        block.timestamp,
                        participants[lotteryId]
                    )
                )
            );
    }

    function participate(uint lotteryId) external payable returns (bool) {
        require(
            msg.value == lotteries[lotteryId].ticketprice,
            "not required ether"
        );
        participants[lotteryId].push(msg.sender);
        return true;
    }

    function endLottery(uint lotteryId) external returns (bool) {
        require(lotteries[lotteryId].end_at < block.timestamp, "not ended");

        uint index = random(lotteryId) % participants[lotteryId].length;
        lotteries[lotteryId].ERC_721_TOKEN.transferFrom(
            address(this),
            participants[lotteryId][index],
            lotteries[lotteryId].assetId
        );
        uint256 payout = participants[lotteryId].length *
            lotteries[lotteryId].ticketprice;
        payable(lotteries[lotteryId].creator).transfer(payout);
        participants[lotteryId] = new address[](0);
        return true;
    }

    function getlottery() public view returns (uint256[] memory) {
        return lotterycreated;
    }
}
