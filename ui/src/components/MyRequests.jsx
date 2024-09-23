import React, { useEffect, useState } from 'react';

const MyRequests = ({ contract, account }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const requestsData = await contract.methods.getMyRequests(account).call();
      setRequests(requestsData);
    };

    fetchRequests();
  }, [contract, account]);

  return (
    <div>
      <h2>My Requests</h2>
      <ul>
        {requests.map((request, index) => (
          <li key={index}>
            From: {request[0]}, Amount: {request[1]} wei, Message: {request[2]}, Name: {request[3]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyRequests;
