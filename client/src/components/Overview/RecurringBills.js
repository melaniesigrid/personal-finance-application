import React, { useState, useEffect } from 'react';
import '../../stylesheets/main.scss'

const RecurringBills = () => {
  const [bills, setBills] = useState([]);
  const [filteredBills, setFilteredBills] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('latest');

  // Fetch recurring bills data from data.json
  useEffect(() => {
    fetch('/data.json') 
      .then(response => response.json())
      .then(data => {
        setBills(data.transactions);
        setFilteredBills(data.transactions);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const renderBills = () => {
    let filteredAndSortedBills = [...bills];

    if (searchTerm) {
      filteredAndSortedBills = filteredAndSortedBills.filter(bill =>
        bill.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch (sortOption) {
      case 'latest':
        filteredAndSortedBills.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'oldest':
        filteredAndSortedBills.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'a-z':
        filteredAndSortedBills.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'z-a':
        filteredAndSortedBills.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'highest':
        filteredAndSortedBills.sort((a, b) => b.amount - a.amount);
        break;
      case 'lowest':
        filteredAndSortedBills.sort((a, b) => a.amount - b.amount);
        break;
      default:
        break;
    }

    return filteredAndSortedBills.map((bill, index) => (
      <tr key={index}>
        <td>{bill.name}</td>
        <td>${bill.amount.toFixed(2)}</td>
        <td>{new Date(bill.date).toLocaleDateString()}</td>
        <td>{bill.recurring ? 'Yes' : 'No'}</td>
      </tr>
    ));
  };

  return (
    <div className="recurring-bills">
      <h1>Recurring Bills</h1>

      <section className="summary">
        <h2>Total Bills</h2>
        <p><strong>Total Paid:</strong> $170.00</p>
        <p><strong>Total Upcoming:</strong> $125.00</p>
        <p><strong>Due Soon:</strong> 2 bills</p>
      </section>

      <section className="filters">
        <label htmlFor="search">Search bills</label>
        <input
          type="text"
          id="search"
          placeholder="Search bills..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        <div className="sort-options">
          <label htmlFor="sort">Sort by</label>
          <select id="sort" value={sortOption} onChange={e => setSortOption(e.target.value)}>
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="a-z">A to Z</option>
            <option value="z-a">Z to A</option>
            <option value="highest">Highest</option>
            <option value="lowest">Lowest</option>
          </select>
        </div>
      </section>

      <section className="bills-list">
        <table id="billsTable">
          <thead>
            <tr>
              <th>Bill Name</th>
              <th>Amount</th>
              <th>Due Date</th>
              <th>Recurring</th>
            </tr>
          </thead>
          <tbody>
            {renderBills()}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default RecurringBills;
