// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


contract firstContract {

  uint256 gryffinder = 0;
  uint256 hufflepuff = 0;
  uint256 ravenclaw =  0;
  uint256 slytherin  =  0;


  function Gryffinder() public view returns(uint){
      return gryffinder;
   }

  function Hufflepuff() public view returns(uint){
      return hufflepuff;
   }
   function Ravenclaw() public view returns(uint){
      return ravenclaw;
   }

   function Slytherin() public view returns(uint){
      return slytherin;
   }

    function addPointsToGryffinder() public { 
    
       gryffinder += 10;
    }
    
     function addPointsToHufflepuff( ) public   payable{ 
         
        hufflepuff += 10;
    }
      function addPointsToRavenclaw( ) public  payable { 
          
        ravenclaw += 10;
        
    }

      function addPointsToSlytherin( ) public  payable { 
       
       slytherin += 10;
    }


}
