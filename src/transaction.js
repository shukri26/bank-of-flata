import React, { useState, useEffect } from 'react';
import Filter from './filter';
import Form from './form';

function Trans() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.npoint.io/48824c42a06f18caaa68")
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data.transactions);
        setIsLoading(false);
      });
  }, []);

  const handleNewTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  const handleDeleteTransaction = (id) => {
    const newTransactions = transactions.filter((transaction) => transaction.id !== id);
    setTransactions(newTransactions);
  };

  return (
    <div className="transactions-container">
      {isLoading ? (
        <div className="loader">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <Form onSubmit={handleNewTransaction} />
          <Filter transactions={transactions} onDelete={handleDeleteTransaction} />
        </>
      )}
    </div>
  );
}

export default Trans;
