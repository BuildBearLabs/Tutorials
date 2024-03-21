// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Storage {
  
    function getMessage() public view returns (string memory) {
        return libStorage.getMessage();
    }


    function setMessage(string memory _newMsg) public {
        libStorage.setMessage(_newMsg);
    }
}

library libStorage {
    bytes32 constant STORAGE_POSITION = keccak256("diamond.standard.storage");

    struct MStorage {
        string message;
    }

    function getMessage() internal view returns (string memory) {
        return diamondStorage().message;
    }

    function setMessage(string memory _newMsg) internal {
        diamondStorage().message = _newMsg;
    }

    function diamondStorage() internal pure returns (MStorage storage ds) {
        bytes32 position = STORAGE_POSITION;
        assembly {
            ds.slot := position
        }
    }
}
