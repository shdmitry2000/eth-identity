pragma solidity ^0.4.0;

import "./Owners.sol";
//import "./IdentityUtils.sol";

contract PermissionExtender is Owners{

    mapping(string => mapping(address => int)) permissions;


    //    //***
    //    //*** MODIFIERS
    //    //***
    //    //premissions modifier for bank functions
    modifier onlyPermited() {
        if ( msg.sender != getCustomerAddress() ) {
            throw;
        }
        _;
    }


    //    function setAttribute(String attrName) constant private returns (int);
    //    function setAttributeValue(String attrName ,string attrVallue) constant private returns (boolean);
    function getAttributeValue(string attrName)  public returns (bytes32);
    function getCustomerAddress()  public returns (address);


    function setAttributePermission(string attrName ,address companionAddress , int permission)  constant public returns (bool)
    {
        //        require(msg.sender == owner || msg.sender==getCustomerAddress());
        permissions[attrName][companionAddress]=permission;
        return true;


    }


    function isAttributePermited(string attrName,address companionAddress) constant public returns (int)
    {
        if (msg.sender == owner)
            return 1;
        else
            return (permissions[attrName][companionAddress]);

    }


    function getAttribute(string attrName) constant public returns (bytes32 )
    {
        if (isAttributePermited(attrName,msg.sender)!=0)
        {
            return getAttributeValue(attrName);
        }
    }

//    function getAttributeString(string attrName) constant public returns (string )
//    {
//        return bytes32ToString(getAttribute(attrName));
//    }
}
