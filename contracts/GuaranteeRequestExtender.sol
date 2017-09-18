pragma solidity ^0.4.13;

import "./GuaranteeConst.sol";

contract GuaranteeRequestExtender is GuaranteeConst {


    //***
    //*** MODIFIERS
    //***
    //premissions modifier for bank functions
    modifier onlyBank() {
        if ( msg.sender != getBank() ) {
            loga("###ERROR-not performd by BANK address",msg.sender);
            throw;
        }
        loga("#pass BANK action check",msg.sender);
        _;
    }

    //premissions modifier for customer functions
    modifier onlyCustomer() {
        if ( msg.sender != getCustomer() ) {
            loga("###ERROR-not performd by CUSTOMER address",msg.sender);
            throw;
        }
        loga("#pass CUSTOMER action check",msg.sender);
        _;
    }

    //premissions modifier for beneficiary functions
    modifier onlyBeneficiary() {
        if ( msg.sender != getBeneficiary() ) {
            loga("###ERROR-not performd by BENEFICIERY address",msg.sender);
            throw;
        }
        loga("#pass BENEFICIERY action check",msg.sender);
        _;
    }




    //    function getId() constant returns (address);
    function getCustomer() constant public returns (address);
    function getBank() constant public returns (address);
    function getBeneficiary() constant public returns (address);

    //    function getPurpose() constant returns (bytes32);
    //    function getAmount() constant returns (uint);
    //    function getStartDate() constant returns (uint);
    function getEndDate() constant public returns (uint);
    //    function getIndexType() constant returns (IndexType);
    //    function getIndexDate() constant returns (uint);


    //    function getAddresses() constant returns (Addresses);

    function getGuaranteeRequestData() constant public returns (address _contract_id,address _customer,address _bank, address _beneficiary,
    string _purpose,uint _amount,uint _startDate,uint _endDate,IndexType _indexType,uint _indexDate,RequestState _status);
    function getProposalIPFSHash() constant public returns (bytes _proposalIPFSHash);

    function getRequestState() public constant returns (RequestState);
    function getCommentsForStep(int step) constant public returns (string);
    function addCommentsForStep(int _step,string _commentline) public ;
    //    function setRequestState(RequestState)  returns (RequestState);

    function isExpired() constant public returns (bool) {
        return (getEndDate()>now);
    }

    function submit(string comment) onlyCustomer public returns (bool result) ;
    function termination(string comment) onlyBeneficiary public returns (bool result);
    function reject(string comment) onlyBank public returns (bool result);
    function accept(string comment,bytes _guaranteeIPFSHash) onlyBank public returns (bool result);
    function withdrawal(string comment) onlyCustomer public returns (bool result);
    function bankStateChange(string comment ,RequestState _newState) onlyBank public returns (bool result);

    //    function changeRequested(bytes32 comment) onlyBank returns (bool result);

}