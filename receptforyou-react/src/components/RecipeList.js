import React from "react";
<<<<<<< Updated upstream
import RecipeCard from "./RecipeCard";
=======
import RecipeWithMusic from "./RecipeWithMusic";
import RecipeCard from "./RecipeCard";
import RecipeCard from "./RecipeCard";
>>>>>>> Stashed changes
import '../styles/global.css';

const RecipeList = ({ recipes, favorites = [], toggleFavorite }) => {
  if (!recipes || recipes.length === 0) {
    return <p>Inga recept hittades.</p>;
  }

  return (
    <div className="grid">
      {recipes.map((recipe) => {
        const isFavorite = favorites.some(
<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
<<<<<<< Updated upstream
          (fav) =>
            (fav.idMeal && fav.idMeal === recipe.idMeal) ||
            (fav.id && fav.id === recipe.id)
        );

        return (
          <RecipeWithMusic

 Stashed changes
>>>>>>> Stashed changes
          (fav) => fav.id === (recipe.id || recipe.idMeal)
        );

        return (
<<<<<<< Updated upstream
          <RecipeCard
=======
         
Updated upstream
Stashed changes
Stashed changes
>>>>>>> Stashed changes
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
