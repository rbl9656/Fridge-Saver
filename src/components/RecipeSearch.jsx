import { useState } from 'react';
import { searchRecipesByIngredients } from '../utils/api';
import RecipeList from './RecipeList';
import './RecipeSearch.css';

function RecipeSearch({ ingredients }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const results = await searchRecipesByIngredients(ingredients);
      setRecipes(results);
    } catch (err) {
      setError(err.message);
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recipe-search">
      <div className="search-header">
        <h2>Find Recipes</h2>
        <button 
          className="search-button"
          onClick={handleSearch}
          disabled={ingredients.length === 0 || loading}
        >
          {loading ? '🔍 Searching...' : '🍳 Find Recipes Using My Ingredients'}
        </button>
        {ingredients.length === 0 && (
          <p className="search-hint">Add ingredients to your fridge first!</p>
        )}
      </div>

      {loading && (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Finding delicious recipes...</p>
        </div>
      )}

      {error && (
        <div className="error-state">
          <p>❌ Error: {error}</p>
          <p className="error-hint">Make sure you've added your API key in src/utils/api.js</p>
        </div>
      )}

      {!loading && !error && hasSearched && (
        <RecipeList recipes={recipes} userIngredients={ingredients} />
      )}
    </div>
  );
}

export default RecipeSearch;