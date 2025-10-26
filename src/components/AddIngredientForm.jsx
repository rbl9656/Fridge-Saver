import { useState } from 'react';
import './AddIngredientForm.css';

function AddIngredientForm({ onAddIngredient }) {
  const [name, setName] = useState('');
  const [expirationDate, setExpirationDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!name.trim() || !expirationDate) {
      alert('Please fill in both fields');
      return;
    }

    // Create ingredient object
    const ingredient = {
      id: Date.now(), // Simple unique ID
      name: name.trim().toLowerCase(),
      expirationDate: expirationDate
    };

    // Call parent function to add ingredient
    onAddIngredient(ingredient);

    // Reset form
    setName('');
    setExpirationDate('');
  };

  return (
    <div className="add-ingredient-form">
      <h2>Add Ingredient</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="ingredient-name">Ingredient Name:</label>
          <input
            type="text"
            id="ingredient-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., chicken breast, spinach"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="expiration-date">Expiration Date:</label>
          <input
            type="date"
            id="expiration-date"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]} // Today's date as minimum
            required
          />
        </div>

        <button type="submit" className="add-button">Add to Fridge</button>
      </form>
    </div>
  );
}

export default AddIngredientForm;