pragma solidity ^0.4.13;


contract GuaranteeConst {
    //guarantee request states
    enum RequestState { created, waitingtobank, handling,waitingtocustomer,waitingtobeneficiery, withdrawed, accepted,changeRequested, rejected ,terminationRequest }


    enum GuaranteeState { None, Valid, Expaired ,Terminated , Reissed}

    //guarantee request states
    enum IndexType { None, CPI, ConstructionMatirials }

    //    //log event for debug purwaitingtobankposes
    event loga(string message, address logb);
    //    //log event for debug purposes
    event log(string message, string logb);

//    function getBeneficiary() constant returns (address);


    function _checkString(string a)  constant internal returns (bool r){
        return _checkArray(bytes(a));
    }

    function _checkArray(bytes a) constant internal returns (bool r){
        if ( (a.length > 0)) return true;

        return false;
    }

    function _checkBytes32(bytes32 a) constant internal returns (bool r){
        if ( (a.length > 0)) return true;

        return false;
    }

//    function bytes32ToString (bytes32 data) returns (string) {
//        bytes memory bytesString = new bytes(32);
//        for (uint j=0; j<32; j++) {
//            byte char = byte(bytes32(uint(data) * 2 ** (8 * j)));
//            if (char != 0) {
//                bytesString[j] = char;
//            }
//        }
//        return string(bytesString);
//    }
//
//    function bytes32ToString(bytes32 x) constant returns (string) {
//        bytes memory bytesString = new bytes(32);
//        uint charCount = 0;
//        for (uint j = 0; j < 32; j++) {
//            byte char = byte(bytes32(uint(x) * 2 ** (8 * j)));
//            if (char != 0) {
//                bytesString[charCount] = char;
//                charCount++;
//            }
//        }
//        bytes memory bytesStringTrimmed = new bytes(charCount);
//        for (j = 0; j < charCount; j++) {
//            bytesStringTrimmed[j] = bytesString[j];
//        }
//        return string(bytesStringTrimmed);
//    }
//
//    function bytes32ArrayToString(bytes32[] data) returns (string) {
//        bytes memory bytesString = new bytes(data.length * 32);
//        uint urlLength;
//        for (uint i=0; i<data.length; i++) {
//            for (uint j=0; j<32; j++) {
//                byte char = byte(bytes32(uint(data[i]) * 2 ** (8 * j)));
//                if (char != 0) {
//                    bytesString[urlLength] = char;
//                    urlLength += 1;
//                }
//            }
//        }
//        bytes memory bytesStringTrimmed = new bytes(urlLength);
//        for (i=0; i<urlLength; i++) {
//            bytesStringTrimmed[i] = bytesString[i];
//        }
//        return string(bytesStringTrimmed);
//    }

}
