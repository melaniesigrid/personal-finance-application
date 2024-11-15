import React, { useEffect, useState } from 'react';
import Transactions from './Transactions';
import Budgets from './Budgets';
import Pots from './Pots';
import RecurringBills from './RecurringBills';
import data from '../../data.json';

import axios from 'axios';

const Overview = () => {
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  useEffect(() => {
    axios.get('/api/overview')
      .then(response => {
        setBalance(response.data.balance);
        setIncome(response.data.income);
        setExpenses(response.data.expenses);
      })
      .catch(error => console.error('Error fetching overview data:', error));
  }, []);

  return (
    <div className="overview flex-center">
      <h1>Overview</h1>
      <div className="card balance">Current Balance: ${data.balance.current}</div>
      <div className="card income">Income: ${data.balance.income}</div>
      <div className="card expenses">Expenses: ${data.balance.expenses}</div>

      <Pots />
      <Budgets />
      <Transactions />
      <RecurringBills />
    </div>
  );
};

export default Overview;
