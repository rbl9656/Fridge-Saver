import { useState } from 'react';
import AddIngredientForm from './components/AddIngredientForm';
import IngredientList from './components/IngredientList';
import RecipeSearch from './components/RecipeSearch';
import './App.css';

function App() {
  const [ingredients, setIngredients] = useState([]);

  // Add new ingredient to the list
  const handleAddIngredient = (ingredient) => {
    setIngredients([...ingredients, ingredient]);
  };

  // Delete ingredient from the list
  const handleDeleteIngredient = (id) => {
    setIngredients(ingredients.filter(ing => ing.id !== id));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🥗 FridgeSaver</h1>
        <p className="app-subtitle">Stop wasting food. Start cooking smarter.</p>
      </header>

      <main className="app-main">
        <AddIngredientForm onAddIngredient={handleAddIngredient} />
        
        <IngredientList 
          ingredients={ingredients}
          onDeleteIngredient={handleDeleteIngredient}
        />

        <RecipeSearch ingredients={ingredients} />
      </main>

      <footer className="app-footer">
        <p>Built with React & Spoonacular API</p>
      </footer>
    </div>
  );
}

export default App;