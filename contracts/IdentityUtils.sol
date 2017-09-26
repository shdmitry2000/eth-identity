pragma solidity ^0.4.0;


contract IdentityUtils {


    function uintToString(uint u)  constant  public returns (string){

        return bytes32ToString(bytes32(u));
    }

    function stringToUint(string s) constant public returns (uint result) {
        bytes memory b = bytes(s);
        uint i;
        result = 0;
        for (i = 0; i < b.length; i++) {
            uint c = uint(b[i]);
            if (c >= 48 && c <= 57) {
                result = result * 10 + (c - 48);
            }
        }
    }

    function addresstoBytes(address a) constant returns (bytes b){
        assembly {
        let m := mload(0x40)
        mstore(add(m, 20), xor(0x140000000000000000000000000000000000000000, a))
        mstore(0x40, add(m, 52))
        b := m

        }
    }



    function addresstoString(address x) returns (string) {
        bytes memory b = new bytes(20);
        for (uint i = 0; i < 20; i++)
        b[i] = byte(uint8(uint(x) / (2**(8*(19 - i)))));
        return string(b);
    }


    function bytes32ToString (bytes32 data) constant public  returns (string) {
        bytes memory bytesString = new bytes(32);
        for (uint j=0; j<32; j++) {
            byte char = byte(bytes32(uint(data) * 2 ** (8 * j)));
            if (char != 0) {
                bytesString[j] = char;
            }
        }
        return string(bytesString);
    }

    function stringToBytes32(string memory source) constant public returns (bytes32 result) {
        assembly {
        result := mload(add(source, 32))
        }
    }

    function toBytes(uint256 x) returns (bytes b) {
        b = new bytes(32);
        assembly { mstore(add(b, 32), x) }
    }

    function uintToBytes32(uint v) constant public returns (bytes32 ret) {
        if (v == 0) {
            ret = '0';
        }
        else {
        while (v > 0) {
        ret = bytes32(uint(ret) / (2 ** 8));
        ret |= bytes32(((v % 10) + 48) * 2 ** (8 * 31));
        v /= 10;
        }
        }
        return ret;
    }

    /// @dev Does a byte-by-byte lexicographical comparison of two strings.
    /// @return a negative number if `_a` is smaller, zero if they are equal
    /// and a positive numbe if `_b` is smaller.
    function stringcompare(string _a, string _b) constant public returns (int) {
        bytes memory a = bytes(_a);
        bytes memory b = bytes(_b);
        uint minLength = a.length;
        if (b.length < minLength) minLength = b.length;
        //@todo unroll the loop into increments of 32 and do full 32 byte comparisons
        for (uint i = 0; i < minLength; i ++)
        if (a[i] < b[i])
        return -1;
        else if (a[i] > b[i])
        return 1;
        if (a.length < b.length)
        return -1;
        else if (a.length > b.length)
        return 1;
        else
        return 0;
    }


}
