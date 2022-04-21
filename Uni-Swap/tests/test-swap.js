const { ethers } = require("hardhat")


describe('testSwap', function (accounts) {

    const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    const DAI_WHALE = "0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE";
    const WBTC = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599";


    const WHALE = DAI_WHALE;
    const AMOUNT_IN = 100000000;;
    const AMOUNT_OUT_MIN = 1;
    const TOKEN_IN = DAI;
    const TOKEN_OUT = WBTC;
    const TO = accounts[0];



    it("should swap", async () => {
        const Uniswap_swap = await ethers.getContractFactory("testSwap")
        
    })
})