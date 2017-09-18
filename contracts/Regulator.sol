pragma solidity ^0.4.13;

import "./GuaranteeRequest.sol";

//###
// general contract for better operations of the system
//###
contract owned {
    //owner address for ownership validation
    address owner;

    //constractor to verify real owner assignment
    function owned() {
        owner = msg.sender;
        log("owner=",owner);
    }

    //owner check modifier
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    //contract distruction by owner only
    function close() onlyOwner {
        log("##contract closed by owner=",owner);
        selfdestruct(owner);
    }

    //constractor to verify real owner assignment
    function getOwner() constant returns (address){
        return owner ;
    }
    //log event for debug purposes
    event log(string loga, address logb);
}


contract Regulator is owned,GuaranteeConst,IssuerManager,BeneficiaryManager,Customer{

    //guarantee request states


    event RegulatoryContractDeployed (address msgSender,string msgstr,uint timestamp);
    function Regulator(){
        owner = msg.sender;


        submitBeneficiary(msg.sender,"עיריית תל אביב-יפו","אבן גבירול 69 תל אביב-יפו");
        submitCustomer(msg.sender,"ישראל ישראלי","הרצל 11 ראשון לציון");
        submitIssuer(msg.sender,"בנק הפועלים","הנגב 11 תל אביב");

        RegulatoryContractDeployed(msg.sender,"Mined",now);
    }



    //describes the customer object
//    address [] public  guaranteeRequests;

    function getRequestsAddressForCustomer() public constant returns (address[])
    {
        return customers[msg.sender].guaranteeRequests;

    }

    function getRequestsAddressForIssuer() public constant returns (address[])
    {
        return issuers[msg.sender].guaranteeRequests;

    }

  function getGuarantieAddressForBeneficiary() public constant returns (address[])
  {
    return issuers[msg.sender].guaranteeRequests;

  }


//    function getActiveGuaranteesAddress() constant returns (string[])
//    {
//        string[] memory _guarantees = new string();
//
//                for(uint32 i=0; i<guaranteeRequests.length; i++) {
//                    if(GuaranteeRequestExtender(guaranteeRequests[i]).getRequestState()==RequestState.accepted)
//                    _guarantees.push(guaranteeRequests[i]);
//                }
//                return _guarantees;
//
//    }

    event GuaranteeRequestCreated (address  requestId,address msgSender,address _customer ,address _bank ,address _beneficiary ,string _purpose,
        uint _amount, uint _startDate,uint _endDate,IndexType _indexType,uint _indexDate,uint timestamp);

    function createGuaranteeRequest(address _customer ,address _bank ,address _beneficiary ,string _purpose,
    uint _amount, uint _startDate,uint _endDate,IndexType _indexType,uint _indexDate)  public returns (address)
    {
        GuaranteeRequest greq=new  GuaranteeRequest(this,_customer,_bank ,_beneficiary,_purpose,_amount,_startDate,_endDate,_indexType ,_indexDate);
        customers[msg.sender].guaranteeRequests.push(address(greq));
        GuaranteeRequestCreated(address(greq),msg.sender,_customer , _bank,_beneficiary , _purpose,  _amount,  _startDate, _endDate, _indexType, _indexDate , now);

        return address(greq);
    }


    function terminateGuarantee(address  _guaranteeRequest,string comment)  returns (bool)
    {
        GuaranteeRequestExtender ge=GuaranteeRequestExtender(_guaranteeRequest);
        if ( msg.sender == ge.getBeneficiary() )
        {
            ge.termination(comment) ;
            return true;
        }


        throw;


    }

    //    function changeGuarantee(address  _guaranteeRequest ,uint _newamount, uint _newendDate, string _comment) onlyBeneficiary returns (bool)
    //    {
    //        GuaranteeExtender ge=GuaranteeExtender(_guaranteeRequest);
    //        if (ge.getBeneficiary()==msg.sender)
    //        {
    //            ( address _contract_id,address _customer,address _bank, address _beneficiary,
    //            string _purpose,uint _amount,uint _startDate,uint _endDate,IndexType _indexType,
    //            uint _indexDate,RequestState _status) = ge.getGuaranteeRequestData();
    //            if (_status==RequestState.accepted && _amount>=_newamount && _newendDate<=_endDate)
    //            {
    //                address addr=new GuaranteeRequest(this,_customer,_bank ,_beneficiary,_purpose,_amount,_startDate,_endDate,_indexType ,_indexDate);
    //                ge.
    //                guaranteeRequests.push(addr);
    //                return addr;
    //            }
    //
    //        }
    //
    //
    //
    //    .endRequest(_comment)
    //        guaranteeRequests.push(addr);
    //        return addr;
    //
    //        return true;
    //    }

}
