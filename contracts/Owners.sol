pragma solidity ^0.4.0;


contract Owners {
    //owner address for ownership validation
    address owner;

    function Owners(){
        owner = msg.sender;
//        log("owner=",owner);
    }
    //owner check modifier
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    //contract distruction by owner only
    function close() onlyOwner {
//        log("##contract closed by owner=",owner);
        selfdestruct(owner);
    }

    //constractor to verify real owner assignment
    function getOwner() constant returns (address){
        return owner ;
    }
    //log event for debug purposes
//    event log(string loga, address logb);
}

