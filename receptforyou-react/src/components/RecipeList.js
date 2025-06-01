import React from "react";
import RecipeWithMusic from "./RecipeWithMusic";
import '../styles/global.css';

const RecipeList = ({ recipes }) => {
  if (recipes.length === 0) {
    return <p>Inga recept hittades.</p>;
  }

  return (
    <div className="grid">
      {recipes.map((recipe) => {
        const isFavorite = favorites.some(
          (fav) =>
            (fav.idMeal && fav.idMeal === recipe.idMeal) ||
            (fav.id && fav.id === recipe.id)
        );

        return (
          <RecipeWithMusic
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