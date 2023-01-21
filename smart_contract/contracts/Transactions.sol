//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Transactions {
    uint256 transactionCount;

    event Transfer(address from,address receiver,uint amount,string message,uint256 timestamp,string keyword); 

    struct TranserStruct{
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    TranserStruct[] transactions;
    //Functions
    function addToBlockchain(address payable _receiver,uint _amount,string memory _message,string memory _keyword) public {
        transactionCount+=1;
        transactions.push(TranserStruct(msg.sender,_receiver,_amount,_message,block.timestamp,_keyword));
        
        //Emit transaction
        emit Transfer(msg.sender,_receiver,_amount,_message,block.timestamp,_keyword);
    }
    function getAllTransaction() public view returns (TranserStruct[] memory) {
        //return transactions

    }
    function getTransactionCount() public view returns (uint256)  {
        //return transactionCount
        return transactionCount;
    }
}