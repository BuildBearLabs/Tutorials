import { ethers } from "ethers";
import abi from "../../../contracts/abi.json"

const contractAddress = "";

const contractAbi = abi;
// The Contract object
const medContract = new ethers.Contract(contractAddress, contractAbi, provider);