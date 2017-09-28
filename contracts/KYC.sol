pragma solidity ^0.4.0;

import "./PermissionExtender.sol";



contract KYC is PermissionExtender {

    bytes32[] public  attributesList;
    address customer;
    mapping(string => bytes32) internal attributes;
    function KYC(address _customer,string fullname,string tz,string laddress, string bank_account, string creadit_card_number, string smoking, bool  isAlergic){
        customer=_customer;
        attributesList.push(stringToBytes32("fullname"));
        attributes["fullname"]=stringToBytes32(fullname);
        attributesList.push(stringToBytes32("tz"));
        attributes["tz"]=stringToBytes32(tz);
        attributesList.push(stringToBytes32("address"));
        attributes["address"]=stringToBytes32(laddress);
        attributesList.push(stringToBytes32("bank_account"));
        attributes["bank_account"]=stringToBytes32(bank_account);
        attributesList.push(stringToBytes32("creadit_card_number"));
        attributes["creadit_card_number"]=stringToBytes32(creadit_card_number);
        attributesList.push(stringToBytes32("smoking"));
        attributes["smoking"]=stringToBytes32(smoking);

        attributesList.push(stringToBytes32("alergic"));
        if(isAlergic)
            attributes["alergic"]=stringToBytes32("YES");
        else
            attributes["alergic"]=stringToBytes32("NO");


    }


    //    function getAddress() constant public returns (address _contract_id)
    //    {
    //        return this;
    //    }



function getAttributeValue(string attrName)  constant public returns (bytes32)
{
    return attributes[attrName];
}

function getCustomerAddress()  constant public returns (address)
{
    return customer;
}


    function getAttributeName(uint row) constant public returns (bytes32)
    {
        if (row<attributesList.length)
            return attributesList[row];
        else
            return "";
    }

    function getAttributeLength() constant public returns (uint)
    {
        return attributesList.length;
    }



//    function getFullData(address) constant public returns (string,string,string,string,string,boolean);


}
