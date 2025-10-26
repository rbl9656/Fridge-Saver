const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com/recipes';

/**
 * Search for recipes based on ingredients
 * @param {Array} ingredients - Array of ingredient objects with 'name' property
 * @param {number} number - Number of recipes to return (default: 6)
 * @returns {Promise} - Promise resolving to array of recipe objects
 */
export async function searchRecipesByIngredients(ingredients, number = 6) {
  // Validate API key is configured
  if (!API_KEY) {
    throw new Error('Spoonacular API key not found. Please create a .env file with VITE_SPOONACULAR_API_KEY=your-key-here');
  }
  
  // Convert ingredient objects to comma-separated string
  const ingredientString = ingredients.map(i => i.name).join(',');
  
  // Build the API URL
  const url = `${BASE_URL}/findByIngredients?ingredients=${encodeURIComponent(ingredientString)}&number=${number}&ranking=1&apiKey=${API_KEY}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
}

/**
 * Get detailed information about a specific recipe
 * @param {number} recipeId - The ID of the recipe
 * @returns {Promise} - Promise resolving to recipe details
 */
export async function getRecipeInformation(recipeId) {
  const url = `${BASE_URL}/${recipeId}/information?apiKey=${API_KEY}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    throw error;
    }
}