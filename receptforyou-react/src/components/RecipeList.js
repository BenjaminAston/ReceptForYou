import React from "react";
import RecipeCard from "./RecipeCard";
import '../styles/global.css';

const RecipeList = ({ recipes, favorites, toggleFavorite }) => {
  if (!recipes || recipes.length === 0) {
    return (
      <div className="no-recipes">
        <p>No recipes found. Try different ingredients or filters.</p>
      </div>
    );
  }

  return (
    <div className="recipe-grid">
      {recipes.map((recipe) => {
        const isFavorite = favorites.some(
          (fav) => fav.id === (recipe.id || recipe.idMeal)
        );

        return (
          <RecipeCard
            key={recipe.id || recipe.idMeal}
            recipe={recipe}
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
          />
        );
      })}
    </div>
  );
};

export default RecipeList;