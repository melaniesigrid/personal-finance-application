const express = require('express');
const router = express.Router();

// Get overview data (balance, income, expenses)
router.get('/overview', (req, res) => {
  // Fetch and return the overview data from database
});

// Get transactions
router.get('/transactions', (req, res) => {
  // Fetch and return transactions data
});

// Get budgets
router.get('/budgets', (req, res) => {
  // Fetch and return budgets data
});

// Get pots
router.get('/pots', (req, res) => {
  // Fetch and return pots data
});

// Get recurring bills
router.get('/recurring-bills', (req, res) => {
  // Fetch and return recurring bills data
});

module.exports = router;