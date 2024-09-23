import React, { useState } from 'react';

const CreateRequest = ({ contract, account }) => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await contract.methods.createRequest(recipient, amount, message).send({ from: account });
    setAmount('');
    setMessage('');
    setRecipient('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="Recipient Address"
        required
      />
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount (in wei)"
        required
      />
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
        required
      />
      <button type="submit">Create Request</button>
    </form>
  );
};

export default CreateRequest;
