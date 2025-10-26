import IngredientItem from './IngredientItem';
import './IngredientList.css';

function IngredientList({ ingredients, onDeleteIngredient }) {
  // Sort ingredients by expiration date (soonest first)
  const sortedIngredients = [...ingredients].sort((a, b) => {
    return new Date(a.expirationDate) - new Date(b.expirationDate);
  });

  if (ingredients.length === 0) {
    return (
      <div className="ingredient-list">
        <div className="empty-state">
          <p>🥕 Your fridge is empty!</p>
          <p className="empty-subtitle">Add some ingredients above to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ingredient-list">
      <h2>Your Fridge ({ingredients.length} item{ingredients.length !== 1 ? 's' : ''})</h2>
      <div className="ingredients-grid">
        {sortedIngredients.map(ingredient => (
          <IngredientItem 
            key={ingredient.id} 
            ingredient={ingredient}
            onDelete={onDeleteIngredient}
          />
        ))}
      </div>
    </div>
  );
}

export default IngredientList;