import React from 'react';

const RecipeCard = ({ recipe }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
      <h3>{recipe.title}</h3>
      <img src={recipe.image} alt={recipe.title} style={{ width: '100%' }} />
      <p><strong>Redo på:</strong> {recipe.readyInMinutes} minuter</p>
      <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer">
        Gå till recept
      </a>
    </div>
  );
};

export default RecipeCard;