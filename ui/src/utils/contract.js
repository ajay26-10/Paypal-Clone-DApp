// src/utils/contract.js
import web3 from './web3';

const contractABI = [{
    "_format": "hh-sol-artifact-1",
    "contractName": "Paypal",
    "sourceName": "./contracts/Paypal.sol",
    "abi": [
      {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_name",
            "type": "string"
          }
        ],
        "name": "addName",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_amount",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "_message",
            "type": "string"
          }
        ],
        "name": "createRequest",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_user",
            "type": "address"
          }
        ],
        "name": "getMyHistory",
        "outputs": [
          {
            "components": [
              {
                "internalType": "string",
                "name": "action",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "message",
                "type": "string"
              },
              {
                "internalType": "address",
                "name": "partyaddress",
                "type": "address"
              },
              {
                "internalType": "string",
                "name": "partyname",
                "type": "string"
              }
            ],
            "internalType": "struct Paypal.sendAndreceive[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_user",
            "type": "address"
          }
        ],
        "name": "getMyName",
        "outputs": [
          {
            "components": [
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "bool",
                "name": "hasName",
                "type": "bool"
              }
            ],
            "internalType": "struct Paypal.userName",
            "name": "",
            "type": "tuple"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_user",
            "type": "address"
          }
        ],
        "name": "getMyRequests",
        "outputs": [
          {
            "internalType": "address[]",
            "name": "",
            "type": "address[]"
          },
          {
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
          },
          {
            "internalType": "string[]",
            "name": "",
            "type": "string[]"
          },
          {
            "internalType": "string[]",
            "name": "",
            "type": "string[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_request",
            "type": "uint256"
          }
        ],
        "name": "payRequest",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      }
];

const contractAddress = '0xb502BffE738489c59f4b82f981A7b17A9f756EDe'; // Add your deployed contract address here

const contract = new web3.eth.Contract(contractABI, contractAddress);

export default contract;
