pragma solidity ^0.4.0;

import "./PermissionExtender.sol";
import "./IdentityUtils.sol";


contract KYC is PermissionExtender,IdentityUtils {

    string[]  attributesList;
    address customer;
    mapping(string => bytes32) internal attributes;
    function KYC(address _customer,string fullname,uint tz,string laddress, string bank_account, string creadit_card_number, bool  isSmocking){
        customer=_customer;
        attributesList.push("fullname");
        attributes["fullname"]=stringToBytes32(fullname);
        attributesList.push("tz");
        attributes["tz"]=uintToBytes32(tz);
        attributesList.push("address");
        attributes["address"]=stringToBytes32(laddress);
        attributesList.push("bank_account");
        attributes["bank_account"]=stringToBytes32(bank_account);
        attributesList.push("creadit_card_number");
        attributes["creadit_card_number"]=stringToBytes32(creadit_card_number);
        attributesList.push("isSmocking");
        if(isSmocking)
            attributes["isSmocking"]=stringToBytes32("YES");
        else
            attributes["isSmocking"]=stringToBytes32("NO");


    }


    //    function getAddress() constant public returns (address _contract_id)
    //    {
    //        return this;
    //    }



function getAttributeValue(string attrName)  public returns (bytes32)
{
    return attributes[attrName];
}

function getCustomerAddress()  public returns (address)
{
    return customer;
}



//    function getFullData(address) constant public returns (string,string,string,string,string,boolean);


}
