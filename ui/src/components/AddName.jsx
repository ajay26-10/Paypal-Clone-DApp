import React, { useState } from 'react';

const AddName = ({ contract, account }) => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await contract.methods.addName(name).send({ from: account });
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        required
      />
      <button type="submit">Add Name</button>
    </form>
  );
};

export default AddName;
