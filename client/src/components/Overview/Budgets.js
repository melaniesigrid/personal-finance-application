import React, { useState, useEffect } from 'react';
import './Budgets.css';
import data from '../../data.json';

function Budgets() {
  const [budgets, setBudgets] = useState([]);
  const [isAddingBudget, setIsAddingBudget] = useState(false);
  const [newBudget, setNewBudget] = useState({
    category: 'Entertainment',
    maxSpend: '',
    theme: '#277C78',
  });
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);

  // Fetch budgets data from data.json
  useEffect(() => {
    fetch('./data.json') // Assuming data.json is in the public folder
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBudgets(data.budgets); // Assuming your JSON has a 'budgets' key
      })
      .catch((error) => {
        console.error('Error fetching budgets data', error);
      });
  }, []);

  // Handle adding a new budget
  const handleAddBudget = () => {
    const newBudgetData = {
      ...newBudget,
      id: Date.now(), // Simulate an ID for the new budget
    };
    setBudgets([...budgets, newBudgetData]);
    setNewBudget({ category: 'Entertainment', maxSpend: '', theme: '#277C78' });
    setIsAddingBudget(false);
  };

  // Handle updating an existing budget
  const handleEditBudget = () => {
    setBudgets(
      budgets.map((budget) =>
        budget.id === editingBudget.id ? editingBudget : budget
      )
    );
    setIsEditingBudget(false);
    setEditingBudget(null);
  };

  // Handle deleting a budget
  const handleDeleteBudget = (budgetId) => {
    setBudgets(budgets.filter((budget) => budget.id !== budgetId));
  };

  return (
    <div className="budgets-container">
      <h2>Budgets</h2>

      {/* Add New Budget Button */}
      {!isAddingBudget && (
        <button onClick={() => setIsAddingBudget(true)}>Add New Budget</button>
      )}

      {/* Add/Edit Budget Form */}
      {(isAddingBudget || isEditingBudget) && (
        <div className="budget-form">
          <h3>{isEditingBudget ? 'Edit Budget' : 'Add New Budget'}</h3>
          <label>Budget Category</label>
          <select
            value={isEditingBudget ? editingBudget.category : newBudget.category}
            onChange={(e) =>
              isEditingBudget
                ? setEditingBudget({ ...editingBudget, category: e.target.value })
                : setNewBudget({ ...newBudget, category: e.target.value })
            }
          >
            <option value="Entertainment">Entertainment</option>
            <option value="Bills">Bills</option>
            <option value="Dining Out">Dining Out</option>
            <option value="Personal Care">Personal Care</option>
          </select>

          <label>Maximum Spend</label>
          <input
            type="number"
            value={isEditingBudget ? editingBudget.maxSpend : newBudget.maxSpend}
            onChange={(e) =>
              isEditingBudget
                ? setEditingBudget({ ...editingBudget, maxSpend: e.target.value })
                : setNewBudget({ ...newBudget, maxSpend: e.target.value })
            }
          />

          <label>Theme</label>
          <input
            type="color"
            value={isEditingBudget ? editingBudget.theme : newBudget.theme}
            onChange={(e) =>
              isEditingBudget
                ? setEditingBudget({ ...editingBudget, theme: e.target.value })
                : setNewBudget({ ...newBudget, theme: e.target.value })
            }
          />

          <button onClick={isEditingBudget ? handleEditBudget : handleAddBudget}>
            {isEditingBudget ? 'Save Changes' : 'Add Budget'}
          </button>
          <button
            onClick={() => {
              setIsAddingBudget(false);
              setIsEditingBudget(false);
              setEditingBudget(null);
            }}
          >
            Cancel
          </button>
        </div>
      )}

      {/* List of Budgets */}
      <div className="budget-list">
        {budgets.map((budget) => (
          <div key={budget.category} className="budget">
            <h4>{budget.category}</h4>
            <p>Maximum Spend: ${budget.maxSpend}</p>
            <p>Theme: <span style={{ backgroundColor: budget.theme }}>{budget.theme}</span></p>

            {/* Edit and Delete */}
            <button
              onClick={() => {
                setIsEditingBudget(true);
                setEditingBudget(budget);
              }}
            >
              Edit
            </button>
            <button onClick={() => handleDeleteBudget(budget.category)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Budgets;
