import React from "react";
import RecipeCard from "./RecipeCard";
import '../styles/global.css';

export default function FavoritesList({ favorites, toggleFavorite }) {
  return (
    <div
      style={{
        display: "grid",
        gap: "1rem",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      }}
    >
      {favorites.map((recipe) => (
        <RecipeCard
          key={recipe.idMeal}
          recipe={recipe}
          isFavorite={true}
          toggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
}