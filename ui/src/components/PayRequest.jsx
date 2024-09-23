import React, { useState } from 'react';

const PayRequest = ({ contract, account }) => {
  const [requestIndex, setRequestIndex] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await contract.methods.payRequest(requestIndex).send({ from: account, value: amount });
    setRequestIndex('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={requestIndex}
        onChange={(e) => setRequestIndex(e.target.value)}
        placeholder="Request Index"
        required
      />
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount (in wei)"
        required
      />
      <button type="submit">Pay Request</button>
    </form>
  );
};

export default PayRequest;
