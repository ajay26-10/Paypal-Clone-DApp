// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

contract Paypal {
    address owner;

    constructor() {
        owner = msg.sender;
    }

    struct request{
        address requestor;
        uint256 amount;
        string message;
        string name;
    }

    struct sendAndreceive{
        string action;
        uint256 amount;
        string message;
        address partyaddress;
        string partyname;
    }

    struct userName{
        string name;
        bool hasName;
    }

    mapping(address => userName) names;
    mapping(address => request[]) requests;
    mapping(address => sendAndreceive[]) transactionhistory;

    function addName(string memory _name) public {
        userName storage newUsername =  names[msg.sender];
        newUsername.name = _name;
        newUsername.hasName = true;
    }

    function createRequest(address user, uint256 _amount, string memory _message) public {
        request memory newRequest;
        newRequest.requestor =  msg.sender;
        newRequest.amount = _amount;
        newRequest.message = _message;

        if(names[msg.sender].hasName){
            newRequest.name = names[msg.sender].name;
        }
        requests[user].push(newRequest);
    }

    function payRequest(uint256 _request) public payable {
        request[] storage myRequests = requests[msg.sender];
        request storage payableRequests = myRequests[_request];

        uint256 toPay = payableRequests.amount * 1000000000000000000;
        require(msg.value == (toPay), "Pay Correct Amount");

        payable (payableRequests.requestor).transfer(msg.value);

        myRequests[_request] = myRequests[myRequests.length - 1];
        myRequests.pop();
    }

    function addHistory(address sender, address receiver, uint256 _amount, string memory _message) private {
        sendAndreceive memory newSend;
        newSend.action = "-";
        newSend.amount = _amount;
        newSend.message =  _message;
        newSend.partyaddress = receiver;
        if(names [receiver].hasName){
            newSend.partyname = names[receiver].name;
        }
        transactionhistory[receiver].push(newSend);

        sendAndreceive memory newReceive;
        newReceive.action = "+";
        newReceive.amount = _amount;
        newReceive.message = _message;
        newReceive.partyaddress = sender;
        if(names [sender].hasName){
            newReceive.partyname = names[sender].name;
        }
        transactionhistory[receiver].push(newReceive);
    }

    function getMyRequests(address _user) public view returns(
        address[] memory,
        uint256[] memory,
        string[] memory,
        string[] memory
    ){
        address[] memory addrss = new address[](requests[_user].length);
        uint256[] memory amnt = new uint256[](requests[_user].length);
        string[] memory msgs = new string[](requests[_user].length);
        string[] memory nme = new string[](requests[_user].length);

        for (uint i= 0; i < requests[_user].length; i++){
            request storage myRequests = requests[_user][i];
            addrss[i] = myRequests.requestor;
            amnt[i] = myRequests.amount;
            msgs[i] = myRequests.message;
            nme[i] = myRequests.name;
        }

        return (addrss,amnt,msgs,nme);

    }

    function getMyHistory(address _user) public view returns(sendAndreceive[] memory){
        return transactionhistory[_user];
    }

    function getMyName(address _user) public view returns(userName memory){
        return names[_user];
    }
}