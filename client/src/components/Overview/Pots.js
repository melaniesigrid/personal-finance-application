import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Pots.css';
import data from '../../data.json';

function Pots() {
  const [pots, setPots] = useState([]);
  const [isAddingPot, setIsAddingPot] = useState(false);
  const [newPot, setNewPot] = useState({
    name: '',
    target: '',
    theme: 'green',
  });
  const [isEditingPot, setIsEditingPot] = useState(false);
  const [editingPot, setEditingPot] = useState(null);

  // Fetch pots data from backend
  useEffect(() => {
    axios.get('/api/pots') // Adjust to your API endpoint
      .then(response => {
        setPots(response.data);
      })
      .catch(error => {
        console.error('Error fetching pots data', error);
      });
  }, []);

  // Handle adding a new pot
  const handleAddPot = () => {
    axios.post('/api/pots', newPot) // Adjust to your API endpoint
      .then(response => {
        setPots([...pots, response.data]);
        setNewPot({ name: '', target: '', theme: 'green' });
        setIsAddingPot(false);
      })
      .catch(error => {
        console.error('Error adding new pot', error);
      });
  };

  // Handle updating an existing pot
  const handleEditPot = () => {
    axios.put(`/api/pots/${editingPot.id}`, editingPot) // Adjust to your API endpoint
      .then(response => {
        setPots(pots.map(pot => pot.id === editingPot.id ? response.data : pot));
        setIsEditingPot(false);
        setEditingPot(null);
      })
      .catch(error => {
        console.error('Error updating pot', error);
      });
  };

  // Handle deleting a pot
  const handleDeletePot = (potId) => {
    axios.delete(`/api/pots/${potId}`) // Adjust to your API endpoint
      .then(() => {
        setPots(pots.filter(pot => pot.id !== potId));
      })
      .catch(error => {
        console.error('Error deleting pot', error);
      });
  };

  // Handle adding money to a pot
  const handleAddMoneyToPot = (potId, amount) => {
    axios.post(`/api/pots/${potId}/add`, { amount }) // Adjust to your API endpoint
      .then(response => {
        setPots(pots.map(pot => pot.id === potId ? response.data : pot));
      })
      .catch(error => {
        console.error('Error adding money to pot', error);
      });
  };

  // Handle withdrawing money from a pot
  const handleWithdrawMoneyFromPot = (potId, amount) => {
    axios.post(`/api/pots/${potId}/withdraw`, { amount }) // Adjust to your API endpoint
      .then(response => {
        setPots(pots.map(pot => pot.id === potId ? response.data : pot));
      })
      .catch(error => {
        console.error('Error withdrawing money from pot', error);
      });
  };

  return (
    <div className="pots-container">
      <h2>Pots</h2>

      {/* Add New Pot Button */}
      {!isAddingPot && (
        <button onClick={() => setIsAddingPot(true)}>Add New Pot</button>
      )}

      {/* Add/Edit Pot Form */}
      {(isAddingPot || isEditingPot) && (
        <div className="pot-form">
          <h3>{isEditingPot ? 'Edit Pot' : 'Add New Pot'}</h3>
          <label>Pot Name</label>
          <input
            type="text"
            value={isEditingPot ? editingPot.name : newPot.name}
            onChange={(e) => isEditingPot
              ? setEditingPot({ ...editingPot, name: e.target.value })
              : setNewPot({ ...newPot, name: e.target.value })}
          />
          <label>Target</label>
          <input
            type="number"
            value={isEditingPot ? editingPot.target : newPot.target}
            onChange={(e) => isEditingPot
              ? setEditingPot({ ...editingPot, target: e.target.value })
              : setNewPot({ ...newPot, target: e.target.value })}
          />
          <label>Theme</label>
          <select
            value={isEditingPot ? editingPot.theme : newPot.theme}
            onChange={(e) => isEditingPot
              ? setEditingPot({ ...editingPot, theme: e.target.value })
              : setNewPot({ ...newPot, theme: e.target.value })}
          >
            <option value="green">Green</option>
            <option value="yellow">Yellow</option>
            <option value="cyan">Cyan</option>
            {/* Add other color options */}
          </select>

          <button onClick={isEditingPot ? handleEditPot : handleAddPot}>
            {isEditingPot ? 'Save Changes' : 'Add Pot'}
          </button>
          <button onClick={() => {
            setIsAddingPot(false);
            setIsEditingPot(false);
            setEditingPot(null);
          }}>Cancel</button>
        </div>
      )}

      {/* List of Pots */}
      <div className="pot-list">
        {data.pots.map(pot => (
          <div key={pot.id} className="pot">
            <h4>{pot.name}</h4>
            <p>Target: ${pot.target}</p>
            <p>Balance: ${pot.total}</p>
            <p>Theme: {pot.theme}</p>

            {/* Add/Withdraw Money */}
            <button onClick={() => handleAddMoneyToPot(pot.id, 50)}>Add $50</button>
            <button onClick={() => handleWithdrawMoneyFromPot(pot.id, 50)}>Withdraw $50</button>

            {/* Edit and Delete */}
            <button onClick={() => {
              setIsEditingPot(true);
              setEditingPot(pot);
            }}>Edit</button>
            <button onClick={() => handleDeletePot(pot.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pots;

