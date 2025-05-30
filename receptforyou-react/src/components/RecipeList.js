import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes }) => {
  if (recipes.length === 0) {
    return <p>Inga recept hittades.</p>;
  }

  return (
    <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeList;