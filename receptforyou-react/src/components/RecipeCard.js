//Visar en enskild receptruta med bild, titel, tid, länk och favoritknapp
import React from "react";
import '../styles/global.css';

const RecipeCard = ({ recipe, isFavorite, toggleFavorite }) => {
  const title = recipe.title || recipe.strMeal || "Ingen titel";
  const image = recipe.image || recipe.strMealThumb || "";
  const readyInMinutes = recipe.readyInMinutes || recipe.cookingTime || "Ej angivet";
  const sourceUrl = recipe.sourceUrl || recipe.strSource || "#";

  return (
    <div className="recipe-card">
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavorite(recipe);
        }}
        className="favorite-btn"
        aria-label={isFavorite ? "Ta bort från favoriter" : "Lägg till i favoriter"}
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>

      {image && <img src={image} alt={title} className="recipe-image hover-zoom" />}

      <div className="recipe-card-content">
        <h3>{title}</h3>
        <p>Redo på: {readyInMinutes} minuter</p>
        <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="btn">
          Gå till recept
        </a>
      </div>
    </div>
  );
};

export default RecipeCard;
