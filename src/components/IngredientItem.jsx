import './IngredientItem.css';

function IngredientItem({ ingredient, onDelete }) {
  // Calculate days until expiration
  const calculateDaysUntilExpired = (expirationDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expDate = new Date(expirationDate);
    expDate.setHours(0, 0, 0, 0);
    const diffTime = expDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilExpired = calculateDaysUntilExpired(ingredient.expirationDate);

  // Determine urgency class based on days until expiration
  const getUrgencyClass = (days) => {
    if (days < 0) return 'expired';
    if (days <= 2) return 'critical';
    if (days <= 5) return 'warning';
    return 'fresh';
  };

  const urgencyClass = getUrgencyClass(daysUntilExpired);

  // Format the expiration message
  const getExpirationMessage = (days) => {
    if (days < 0) return `Expired ${Math.abs(days)} day${Math.abs(days) !== 1 ? 's' : ''} ago`;
    if (days === 0) return 'Expires today!';
    if (days === 1) return 'Expires tomorrow';
    return `Expires in ${days} days`;
  };

  return (
    <div className={`ingredient-item ${urgencyClass}`}>
      <div className="ingredient-info">
        <h3 className="ingredient-name">{ingredient.name}</h3>
        <p className="expiration-info">{getExpirationMessage(daysUntilExpired)}</p>
        <p className="expiration-date">Date: {ingredient.expirationDate}</p>
      </div>
      <button 
        className="delete-button" 
        onClick={() => onDelete(ingredient.id)}
        aria-label={`Delete ${ingredient.name}`}
      >
        ✕
      </button>
    </div>
  );
}

export default IngredientItem;