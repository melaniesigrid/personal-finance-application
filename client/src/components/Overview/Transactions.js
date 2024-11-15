import React, { useState, useEffect } from 'react';
import './Transactions.css';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [sortOrder, setSortOrder] = useState('latest');
  const [selectedCategory, setSelectedCategory] = useState('All Transactions');
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(5);

  // Fetch data from the JSON file
  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data.transactions);
        setFilteredTransactions(data.transactions);
      })
      .catch((error) => console.error('Error loading transactions:', error));
  }, []);

  // Filter transactions by category
  useEffect(() => {
    if (selectedCategory === 'All Transactions') {
      setFilteredTransactions(transactions);
    } else {
      setFilteredTransactions(
        transactions.filter((transaction) => transaction.category === selectedCategory)
      );
    }
  }, [selectedCategory, transactions]);

  // Sort transactions by selected order
  useEffect(() => {
    let sortedTransactions;
    switch (sortOrder) {
      case 'latest':
        sortedTransactions = [...filteredTransactions].sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'oldest':
        sortedTransactions = [...filteredTransactions].sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'aToZ':
        sortedTransactions = [...filteredTransactions].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'zToA':
        sortedTransactions = [...filteredTransactions].sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'highest':
        sortedTransactions = [...filteredTransactions].sort((a, b) => b.amount - a.amount);
        break;
      case 'lowest':
        sortedTransactions = [...filteredTransactions].sort((a, b) => a.amount - b.amount);
        break;
      default:
        sortedTransactions = filteredTransactions;
    }
    setFilteredTransactions(sortedTransactions);
  }, [sortOrder, filteredTransactions]);

  // Pagination logic
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="transactions-container">
      <h2>Transactions</h2>

      {/* Search and Filter Section */}
      <div className="filters">
        <input type="text" placeholder="Search transactions" className="search-bar" />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-filter"
        >
          <option value="All Transactions">All Transactions</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Bills">Bills</option>
          <option value="Groceries">Groceries</option>
          <option value="Dining Out">Dining Out</option>
          <option value="Transportation">Transportation</option>
          <option value="Personal Care">Personal Care</option>
          <option value="Education">Education</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Shopping">Shopping</option>
          <option value="General">General</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="sort-order"
        >
          <option value="latest">Sort by Latest</option>
          <option value="oldest">Sort by Oldest</option>
          <option value="aToZ">Sort A to Z</option>
          <option value="zToA">Sort Z to A</option>
          <option value="highest">Sort by Highest Amount</option>
          <option value="lowest">Sort by Lowest Amount</option>
        </select>
      </div>

      {/* Transactions List */}
      <div className="transaction-list">
        {currentTransactions.map((transaction) => (
          <div key={transaction.name} className="transaction">
            <img src={transaction.avatar} alt={transaction.name} className="avatar" height='80px' width="80px" />
            <p><strong>Recipient/Sender:</strong> {transaction.name}</p>
            <p><strong>Category:</strong> {transaction.category}</p>
            <p><strong>Transaction Date:</strong> {new Date(transaction.date).toLocaleDateString()}</p>
            <p><strong>Amount:</strong> ${transaction.amount}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          Prev
        </button>
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage * transactionsPerPage >= filteredTransactions.length}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Transactions;
