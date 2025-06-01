// pages/Favorites.js
import React from "react";
import RecipeList from "../components/RecipeList";
import '../styles/global.css';

export default function Favorites({ favorites, toggleFavorite }) {
  return (
    <div className="favorites-container">
      <h2 className="favorites-title">Dina favoriter ({favorites.length})</h2>
      {favorites.length === 0 ? (
        <p className="no-favorites">Du har inga favoriter än.</p>
      ) : (
        <RecipeList 
          recipes={favorites} 
          favorites={favorites} 
          toggleFavorite={toggleFavorite} 
        />
      )}
    </div>
  );
}