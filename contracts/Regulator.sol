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
//        string tz;
        address chainAddress;
        mapping(address => address)  permissions;
        mapping(address => mapping(address => bool) )  requests;
    }

    mapping (string=>Consumer)  consumers;
    //    address   [] consumerList;

    //describes the beneficiary object
    struct Company {
        string name;
        string local_address;
    }
    mapping (address=>Company) public companies;
    address   []  public companiesList;


    function getConsumerAddress(string tz ) public constant returns(address)   {
        return consumers[tz].chainAddress;
    }

    event AddConsumer (address indexed consumerAddress,string  tz,uint timestamp);
    function submitConsumer(address consumerAddress , string tz) public  {
        Consumer consumer=consumers[tz];
//        consumer.tz   = tz;
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



    event AddCompanyRelation(address indexed consumerAddress,address indexed basecompanyAddress,string   tz,address permissionExtenderAddress,uint timestamp);
    function addCompanyRelation(string tz , address permissionExtenderAddress) public   {

        // require(PermissionExtender(permissionExtenderAddress).getCustomerAddress ==getConsumerAddress(tz));

        Consumer consumer=consumers[tz];
        consumer.permissions[PermissionExtender(permissionExtenderAddress).getOwner()]   = permissionExtenderAddress;

        AddCompanyRelation(getConsumerAddress(tz),PermissionExtender(permissionExtenderAddress).getOwner(), tz,permissionExtenderAddress,block.timestamp);
    }

    event AddCompanionPermissionByBaseCompany(address indexed companionAddress,address indexed basecompanyAddress,string   tz,string attributeName,uint timestamp);
    function addCompanionPermissionByBaseCompany(string tz , address companionAddress,string attributeName) public   {

        //        require(PermissionExtender(permissionExtenderAddress).getCustomerAddress ==getConsumerAddress(tz));
        if (stringcompare(attributeName,"*") == 0)
        {
            PermissionExtender(consumers[tz].permissions[msg.sender]).setAttributePermission("fullname",companionAddress,1);
            PermissionExtender(consumers[tz].permissions[msg.sender]).setAttributePermission("tz",companionAddress,1);
            PermissionExtender(consumers[tz].permissions[msg.sender]).setAttributePermission("address",companionAddress,1);
            PermissionExtender(consumers[tz].permissions[msg.sender]).setAttributePermission("bank_account",companionAddress,1);
            PermissionExtender(consumers[tz].permissions[msg.sender]).setAttributePermission("creadit_card_number",companionAddress,1);
            PermissionExtender(consumers[tz].permissions[msg.sender]).setAttributePermission("smoking",companionAddress,1);
            PermissionExtender(consumers[tz].permissions[msg.sender]).setAttributePermission("alergic",companionAddress,1);
        }
        else
            PermissionExtender(consumers[tz].permissions[msg.sender]).setAttributePermission(attributeName,companionAddress,1);

        AddCompanionPermissionByBaseCompany(companionAddress,msg.sender, tz,attributeName, now);
    }

    event ChangeCompanionPermissionByCustomer(address indexed companionAddress,address indexed basecompanyAddress,string   tz,string attributeName,int permvalue,uint timestamp);
    function changeCompanionPermissionByCustomer(string tz , address basecompanyAddress,address companionAddress,string attributeName,int permvalue) public returns(int)  {

        // require(consumers[tz] ==msg.sender);

        ChangeCompanionPermissionByCustomer(companionAddress,basecompanyAddress, tz,attributeName,permvalue, now);

     return PermissionExtender(consumers[tz].permissions[basecompanyAddress]).setAttributePermission(attributeName,companionAddress,permvalue);


    }




    function getConsumerAttributePermission( string tz,address basecompanyAddress,string attributeName) public constant returns(int permission)
    {
        // require(consumers[getConsumerAddress(tz)].chainAddress != address(0) && consumers[getConsumerAddress(tz)].permissions[basecompanyAddress]!= address(0));

        return PermissionExtender(consumers[tz].permissions[basecompanyAddress]).isAttributePermited(attributeName,msg.sender);

    }

    function getConsumerAttributeValue(string tz,address basecompanyAddress,string attributeName) public constant returns(bytes32 )
    {
        // require(consumers[tz].chainAddress != address(0) && consumers[getConsumerAddress(tz)].permissions[basecompanyAddress]!= address(0));
        return PermissionExtender(consumers[tz].permissions[basecompanyAddress]).getAttribute(attributeName,msg.sender);

    }

    function getConsumerAttributeName(string tz,address basecompanyAddress,uint row) public constant returns(bytes32 )
    {
        // require(consumers[tz].chainAddress != address(0) && consumers[getConsumerAddress(tz)].permissions[basecompanyAddress]!= address(0));
        return PermissionExtender(consumers[tz].permissions[basecompanyAddress]).getAttributeName( row);

    }
    function getAttributeLength(string tz,address basecompanyAddress) public constant returns(uint )
    {
        // require(consumers[tz].chainAddress != address(0) && consumers[getConsumerAddress(tz)].permissions[basecompanyAddress]!= address(0));
        return PermissionExtender(consumers[tz].permissions[basecompanyAddress]).getAttributeLength( );

    }

    event RequestCompanionByCustomer(address indexed companionAddress,address indexed basecompanyAddress,string   tz,uint timestamp);
    event ResumeCompanionByCustomer(address indexed companionAddress,address indexed basecompanyAddress,string   tz,uint timestamp);

    function setRequestCompanionByCustomer(string tz , address basecompanyAddress,address companionAddress,bool operation)   {

        // require(consumers[tz] ==msg.sender);
    if(operation)
    {
        RequestCompanionByCustomer(companionAddress,basecompanyAddress, tz, now);
    }
    else
    {
        ResumeCompanionByCustomer(companionAddress,basecompanyAddress, tz, now);
    }
        consumers[tz].requests[basecompanyAddress][companionAddress]=operation;

    }

    function getRequestCompanionByCustomer(string tz , address basecompanyAddress,address companionAddress) public  returns (bool) {


        return consumers[tz].requests[basecompanyAddress][companionAddress];


    }

//    event RequestPermission(address companionCompany,address basecompany ,string tz);
//    function requestPermission(address companionCompany,address basecompany ,string tz)
//    {
//        require(companionCompany==msg.sender);
//        RequestPermission(companionCompany, basecompany , tz);
//
//
//    }

//    function getConsumerAttributeValueString(string tz,address basecompanyAddress,string attributeName) public constant returns(string )
//    {
//        // require(consumers[tz].chainAddress != address(0) && consumers[getConsumerAddress(tz)].permissions[basecompanyAddress]!= address(0));
//        return bytes32ToString(PermissionExtender(consumers[tz].permissions[basecompanyAddress]).getAttribute(attributeName));
//
//    }


//    function setCompanionAttributePermission(string tz,address companionAddress,string attributeName , int permission) public constant returns(bool)
//    {
//        // require(consumers[tz].chainAddress != address(0) && consumers[getConsumerAddress(tz)].permissions[msg.sender]!= address(0));
//
//        PermissionExtender(consumers[tz].permissions[msg.sender]).setAttributePermission(attributeName,companionAddress,1);
//        return true;
//    }

//    event RequestConsumerPermissions(address companionAddress,address indexed consumerAddress,address indexed basecompanyAddress,string tz,uint timestamp);
//    function requestConsumerPermissions(string tz,address basecompanyAddress) public constant returns(bool)
//    {
//        RequestConsumerPermissions(msg.sender,getConsumerAddress(tz),basecompanyAddress,tz,now);
//    }


    function getCompaniesList() public constant returns(address   [])
    {
        // require(consumers[getConsumerAddress(tz)].chainAddress != address(0) && consumers[getConsumerAddress(tz)].permissions[basecompanyAddress]!= address(0));

        return companiesList;
    }





}
