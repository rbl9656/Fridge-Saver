import './RecipeList.css';

function RecipeList({ recipes, userIngredients }) {
  if (recipes.length === 0) {
    return (
      <div className="recipe-list">
        <div className="no-recipes">
          <p>😕 No recipes found with those ingredients</p>
          <p className="no-recipes-hint">Try adding more common ingredients like chicken, rice, or vegetables</p>
        </div>
      </div>
    );
  }

  return (
    <div className="recipe-list">
      <h3>Found {recipes.length} Recipe{recipes.length !== 1 ? 's' : ''}</h3>
      <div className="recipes-grid">
        {recipes.map(recipe => (
          <div key={recipe.id} className="recipe-card">
            <img 
              src={recipe.image} 
              alt={recipe.title}
              className="recipe-image"
            />
            <div className="recipe-content">
              <h4 className="recipe-title">{recipe.title}</h4>
              
              <div className="ingredient-match">
                <div className="match-section">
                  <span className="match-label">✅ You have ({recipe.usedIngredientCount}):</span>
                  <ul className="ingredient-tag-list">
                    {recipe.usedIngredients.map((ing, idx) => (
                      <li key={idx} className="ingredient-tag used">{ing.name}</li>
                    ))}
                  </ul>
                </div>

                {recipe.missedIngredientCount > 0 && (
                  <div className="match-section">
                    <span className="match-label">🛒 Need to buy ({recipe.missedIngredientCount}):</span>
                    <ul className="ingredient-tag-list">
                      {recipe.missedIngredients.map((ing, idx) => (
                        <li key={idx} className="ingredient-tag missed">{ing.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <a 
                href={`https://spoonacular.com/recipes/${recipe.title.replace(/\s+/g, '-').toLowerCase()}-${recipe.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="view-recipe-button"
              >
                View Full Recipe →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeList;