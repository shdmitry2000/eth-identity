pragma solidity ^0.4.13;

import "./KYC.sol";
import "./IdentityUtils.sol";

contract Regulator is Owners,IdentityUtils{

    //guarantee request states


    event RegulatoryContractDeployed (address msgSender,string msgstr,uint timestamp);

    function Regulator(){
        owner = msg.sender;


       RegulatoryContractDeployed(owner,"Mined",now);
    // add bank hapoalin
        Company company=companies[owner];
        company.name   = "בנק הפועלים";
        company.local_address="הנגב 11 תל אביב";
        companiesList.push(owner);
        AddCompany(owner,company.name,block.timestamp);

    }


    //describes the beneficiary object
    struct Consumer {
        uint tz;
        address chainAddress;
        mapping(address => address)  permissions;
    }

    mapping (uint=>Consumer) public consumers;
    //    address   [] consumerList;

    //describes the beneficiary object
    struct Company {
        string name;
        string local_address;
    }
    mapping (address=>Company) public companies;
    address   []  public companiesList;


    function getConsumerAddress(uint tz ) public constant returns(address)   {
        return consumers[tz].chainAddress;
    }

    event AddConsumer (address indexed consumerAddress,uint indexed  tz,uint timestamp);
    function submitConsumer(address consumerAddress , uint tz) public  {
        Consumer consumer=consumers[tz];
        consumer.tz   = tz;
        consumer.chainAddress    = consumerAddress;

        AddConsumer(consumerAddress,tz,block.timestamp);
    }




    event AddCompany (address indexed companyAddress,string name,uint timestamp);
    function submitCompany(address companyAddress , string _name,string _local_address) public  {
        require(companyAddress!=owner);
        Company company=companies[companyAddress];
        company.name   = _name;
        company.local_address=_local_address;
        companiesList.push(companyAddress);
        AddCompany(companyAddress,_name,block.timestamp);
    }

    function getCompany( address companyAddress) public constant returns(string,string)   {
        Company memory company=companies[companyAddress];
        return (company.name,company.local_address);
    }



    event AddCompanyRelation(address indexed consumerAddress,address indexed basecompanyAddress,uint indexed  tz,address permissionExtenderAddress,uint timestamp);
    function addCompanyRelation(uint tz , address permissionExtenderAddress) public   {

        // require(PermissionExtender(permissionExtenderAddress).getCustomerAddress ==getConsumerAddress(tz));

        Consumer consumer=consumers[tz];
        consumer.permissions[PermissionExtender(permissionExtenderAddress).getOwner()]   = permissionExtenderAddress;

        AddCompanyRelation(getConsumerAddress(tz),PermissionExtender(permissionExtenderAddress).getOwner(), tz,permissionExtenderAddress,block.timestamp);
    }

    event AddCompanionPermissionByBaseCompany(address indexed companionAddress,address indexed basecompanyAddress,uint indexed  tz,string attributeName,uint timestamp);
    function addCompanionPermissionByBaseCompany(uint tz , address companionAddress,string attributeName) public   {

        //        require(PermissionExtender(permissionExtenderAddress).getCustomerAddress ==getConsumerAddress(tz));
        if (stringcompare(attributeName,"*") == 0)
        {
            PermissionExtender(consumers[tz].permissions[msg.sender]).setAttributePermission("fullname",companionAddress,1);
            PermissionExtender(consumers[tz].permissions[msg.sender]).setAttributePermission("tz",companionAddress,1);
            PermissionExtender(consumers[tz].permissions[msg.sender]).setAttributePermission("address",companionAddress,1);
            PermissionExtender(consumers[tz].permissions[msg.sender]).setAttributePermission("bank_account",companionAddress,1);
            PermissionExtender(consumers[tz].permissions[msg.sender]).setAttributePermission("creadit_card_number",companionAddress,1);
            PermissionExtender(consumers[tz].permissions[msg.sender]).setAttributePermission("isSmocking",companionAddress,1);
        }
        else
            PermissionExtender(consumers[tz].permissions[msg.sender]).setAttributePermission(attributeName,companionAddress,1);

        AddCompanionPermissionByBaseCompany(companionAddress,msg.sender, tz,attributeName, now);
    }

    event ChangeCompanionPermissionByCustomer(address indexed companionAddress,address indexed basecompanyAddress,uint indexed  tz,string attributeName,uint timestamp);
    function changeCompanionPermissionByCustomer(uint tz , address basecompanyAddress,address companionAddress,string attributeName,int permvalue) public   {

        // require(consumers[tz] ==msg.sender);
        require(companionAddress !=msg.sender );

        PermissionExtender(consumers[tz].permissions[basecompanyAddress]).setAttributePermission(attributeName,companionAddress,permvalue);

        AddCompanionPermissionByBaseCompany(companionAddress,msg.sender, tz,attributeName, now);

    }

    function getConsumerAttributePermission(uint tz,address basecompanyAddress,string attributeName) public constant returns(int permission)
    {
        // require(consumers[getConsumerAddress(tz)].chainAddress != address(0) && consumers[getConsumerAddress(tz)].permissions[basecompanyAddress]!= address(0));

        return PermissionExtender(consumers[tz].permissions[basecompanyAddress]).isAttributePermited(attributeName,msg.sender);

    }

    function getConsumerAttributeValue(uint tz,address basecompanyAddress,string attributeName) public constant returns(bytes32 )
    {
        // require(consumers[tz].chainAddress != address(0) && consumers[getConsumerAddress(tz)].permissions[basecompanyAddress]!= address(0));
        return PermissionExtender(consumers[tz].permissions[basecompanyAddress]).getAttribute(attributeName,msg.sender);

    }

    function getConsumerAttributeName(uint tz,address basecompanyAddress,uint row) public constant returns(bytes32 )
    {
        // require(consumers[tz].chainAddress != address(0) && consumers[getConsumerAddress(tz)].permissions[basecompanyAddress]!= address(0));
        return PermissionExtender(consumers[tz].permissions[basecompanyAddress]).getAttributeName( row);

    }
    function getAttributeLength(uint tz,address basecompanyAddress) public constant returns(uint )
    {
        // require(consumers[tz].chainAddress != address(0) && consumers[getConsumerAddress(tz)].permissions[basecompanyAddress]!= address(0));
        return PermissionExtender(consumers[tz].permissions[basecompanyAddress]).getAttributeLength( );

    }



//    function getConsumerAttributeValueString(uint tz,address basecompanyAddress,string attributeName) public constant returns(string )
//    {
//        // require(consumers[tz].chainAddress != address(0) && consumers[getConsumerAddress(tz)].permissions[basecompanyAddress]!= address(0));
//        return bytes32ToString(PermissionExtender(consumers[tz].permissions[basecompanyAddress]).getAttribute(attributeName));
//
//    }


//    function setCompanionAttributePermission(uint tz,address companionAddress,string attributeName , int permission) public constant returns(bool)
//    {
//        // require(consumers[tz].chainAddress != address(0) && consumers[getConsumerAddress(tz)].permissions[msg.sender]!= address(0));
//
//        PermissionExtender(consumers[tz].permissions[msg.sender]).setAttributePermission(attributeName,companionAddress,1);
//        return true;
//    }

//    event RequestConsumerPermissions(address companionAddress,address indexed consumerAddress,address indexed basecompanyAddress,uint tz,uint timestamp);
//    function requestConsumerPermissions(uint tz,address basecompanyAddress) public constant returns(bool)
//    {
//        RequestConsumerPermissions(msg.sender,getConsumerAddress(tz),basecompanyAddress,tz,now);
//    }


    function getCompaniesList() public constant returns(address   [])
    {
        // require(consumers[getConsumerAddress(tz)].chainAddress != address(0) && consumers[getConsumerAddress(tz)].permissions[basecompanyAddress]!= address(0));

        return companiesList;
    }

//
//    function getTest() public constant returns(string  )
//    {
//        uint tz=123456789;
//        uint tz2=1321423;
//        submitConsumer(owner,tz);
//        submitConsumer(0xcdca444f8c28d111cde6388cea613b5325595991,tz2);
//
//        KYC kyc=new KYC(0xcdca444f8c28d111cde6388cea613b5325595991,"test cast",123456789,'herzel 12 TA', "213232", "2134 1234 1234 2132", false);
//
//        submitCompany(0x00a329c0648769A73afAc7F9381E08FB43dBEA72,"Test Company","test address");
//        address bankAddr=getOwner();
//
//        addCompanyRelation( tz , address(kyc)) ;
//
//        addCompanionPermissionByBaseCompany( tz , 0x00a329c0648769A73afAc7F9381E08FB43dBEA72,"*") ;
//
//        return "1";
//    }
//    // call from companion account
//    function getTest2(string tz,string attributeName) public constant returns(string attrValue   )
//    {
//
//        return getConsumerAttributeValueString(stringToUint(tz),getOwner(),attributeName) ;
//
//    }
//
//
//
//    // call from customer  account
//    function getTest3SwitchOn(string tz,address basecompanyAddress,address companionAddress,string attributeName ) public
//    {
//        return changeCompanionPermissionByCustomer(stringToUint(tz) ,  basecompanyAddress, companionAddress, attributeName,1) ;
//    }
//    // call from customer  account
//    function getTest3SwitchOff(string tz,address basecompanyAddress,address companionAddress,string attributeName ) public
//    {
//        changeCompanionPermissionByCustomer(stringToUint(tz) ,  basecompanyAddress, companionAddress, attributeName,0) ;
//    }


}
