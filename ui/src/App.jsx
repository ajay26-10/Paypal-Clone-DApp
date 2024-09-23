import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const CONTRACT_ADDRESS = '0xb502BffE738489c59f4b82f981A7b17A9f756EDe';
const CONTRACT_ABI = [
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

function App() {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [name, setName] = useState('');
  const [requests, setRequests] = useState([]);
  const [amount, setAmount] = useState(0);
  const [userAddress, setUserAddress] = useState('');
  const [message, setMessage] = useState('');
  const [transactionHistory, setTransactionHistory] = useState([]);
  
  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } else {
      alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  };

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);

    const _contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    setContract(_contract);

    // Load transaction history and requests if necessary
    const history = await _contract.methods.getMyHistory(accounts[0]).call();
    setTransactionHistory(history);
  };

  const addName = async () => {
    if (!name) return alert("Please enter a name");
    await contract.methods.addName(name).send({ from: account });
    alert("Name added successfully");
  };

  // const createRequest = async (user) => {
  //   await contract.methods.createRequest(user, amount, message).send({ from: account });
  //   alert("Request created successfully");
  // };



  const createRequest = async () => {
    if (!userAddress || !amount || !message) {
      return alert("Please fill in all fields.");
    }
  
    try {
      await contract.methods.createRequest(userAddress, amount, message).send({ from: account });
      alert("Request created successfully");
      setUserAddress('');
      setAmount(0);
      setMessage('');
    } catch (error) {
      console.error("Error creating request:", error);
      alert("Failed to create request. Please check the console for more details.");
    }
  };
  


  const getMyRequests = async () => {
    const data = await contract.methods.getMyRequests(account).call();
    setRequests(data);
  };

  const payRequest = async (index) => {
    const requestAmount = requests[1][index]; // [addresses, amounts, messages, names]
    await contract.methods.payRequest(index).send({
      from: account,
      value: Web3.utils.toWei(requestAmount.toString(), 'ether'),
    });
    alert("Request paid successfully");
  };

  return (
    
    <div className="min-h-screen bg-violet-200 p-6">
      <div className='text-3xl text-black text-center font-bold'>PeyPal Clone dApp</div>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-8">Welcome, {account}</h2>

        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Add Name</h3>
          <div className="flex space-x-4">
            <input
              type="text"
              className="flex-1 p-2 border border-gray-300 rounded"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={addName}
            >
              Add Name
            </button>
          </div>
        </div>

        {/* Create Request
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Create Request</h3>
          <div className="space-y-2">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="User address"
              value={name}  // You can add a new state for user input
              onChange={(e) => setName(e.target.value)}  // Or set a new input handler for user address
            />
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Amount in ETH"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={() => createRequest(name)}
            >
              Create Request
            </button>
          </div>
        </div> */}

        
<div className="mb-6">
  <h3 className="text-xl font-semibold mb-2">Create Request</h3>
  <div className="space-y-2">
    <input
      type="text"
      className="w-full p-2 border border-gray-300 rounded"
      placeholder="User address"
      value={userAddress}
      onChange={(e) => setUserAddress(e.target.value)}
    />
    <input
      type="number"
      className="w-full p-2 border border-gray-300 rounded"
      placeholder="Amount in ETH"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
    />
    <input
      type="text"
      className="w-full p-2 border border-gray-300 rounded"
      placeholder="Message"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
    />
    <button
      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      onClick={createRequest}
    >
      Create Request
    </button>
  </div>
</div>

      
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Your Requests</h3>
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mb-4"
            onClick={getMyRequests}
          >
            Get My Requests
          </button>
          <ul className="space-y-2">
            {requests[1] && requests[1].map((amt, index) => (
              <li key={index} className="p-4 bg-gray-100 border rounded">
                {requests[0][index]} requested {amt} ETH for "{requests[2][index]}" from {requests[3][index]}
                <button
                  className="ml-4 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  onClick={() => payRequest(index)}
                >
                  Pay
                </button>
              </li>
            ))}
          </ul>
        </div>

        
        <div>
          <h3 className="text-xl font-semibold mb-2">Transaction History</h3>
          <ul className="space-y-2">
            {transactionHistory.map((tx, index) => (
              <li key={index} className="p-4 bg-gray-100 border rounded">
                <strong>{tx.action}</strong> {tx.amount} ETH from {tx.partyname} ({tx.partyaddress}) - {tx.message}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
