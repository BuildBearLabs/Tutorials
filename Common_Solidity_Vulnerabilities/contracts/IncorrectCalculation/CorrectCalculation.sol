// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import { Math } from "@openzeppelin/contracts/utils/math/Math.sol";
import {SafeMath} from "@openzeppelin/contracts/utils/math/SafeMath.sol";
contract CorrectCalculation {
        
    function find_min(uint256 mrx, uint256 ample) external pure returns (uint256) {
        return Math.min(mrx, ample);
    }
    
    function find_max(uint256 mrx, uint256 ample) public pure returns (uint256) {
        return Math.max(mrx, ample);
    }
    
    function find_sqrt(uint256 mrx) public pure returns (uint256) {
        return Math.sqrt(mrx);
    }

    function find_logarithm2(uint256 mrx) public pure returns(uint256){
    return Math.log2(mrx);
    }

    function find_Average(uint256 mrx,uint256 ample) public pure returns(uint256){
        return Math.average(mrx,ample);
    }

    function div(uint256 a, uint256 b) public pure returns(uint256 ){
        return Math.ceilDiv(a,b);
    }
    function sub(uint256 a, uint256 b) public pure returns(uint256 ){
       return SafeMath.sub(a, b, "reverted with overflow");
    }

}