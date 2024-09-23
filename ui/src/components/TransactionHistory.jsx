import React, { useEffect, useState } from 'react';

const TransactionHistory = ({ contract, account }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const historyData = await contract.methods.getMyHistory(account).call();
      setHistory(historyData);
    };

    fetchHistory();
  }, [contract, account]);

  return (
    <div>
      <h2>Transaction History</h2>
      <ul>
        {history.map((tx, index) => (
          <li key={index}>
            {tx.action} {tx.amount} wei - {tx.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionHistory;
