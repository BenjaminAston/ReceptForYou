import React from "react";
import RecipeCard from "./RecipeCard";
import '../styles/global.css';


const RecipeList = ({ recipes, favorites = [], toggleFavorite }) => {
  if (!recipes || recipes.length === 0) {
    return <p>Inga recept hittades.</p>;
  }

  return (
    <div className="grid">
      {recipes.map((recipe) => {
        const isFavorite = favorites.some(
          (fav) => fav.id === (recipe.id || recipe.idMeal)
        );

        return (
          <RecipeCard
            key={recipe.idMeal || recipe.id}
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
