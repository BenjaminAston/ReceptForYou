import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import { useRecipes } from "../app/useRecipes";
import FilterOptions from "../components/FilterOptions";
import RecipeList from "../components/RecipeList";
import Favorites from "../pages/Favorites";
import MoodSelector from "../components/MoodSelector";
import FridgeGame from "../components/FridgeGame";
import '../styles/global.css';

const moodToIngredients = {
  tired: ["pasta", "cheese"],
  festive: ["shrimp", "champagne"],
  stressed: ["fast food", "wrap"],
  happy: ["fruit", "berries"],
};

export default function Home() {
  const [ingredients, setIngredients] = useState([]);
  const [filters, setFilters] = useState({ diet: '', intolerances: '' });
  const { recipes, fetchRecipes, loading } = useRecipes();

  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setFavorites(parsed);
        }
      } catch (error) {
        console.error("Error parsing favorites:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (recipe) => {
    setFavorites((prev) => {
      const recipeToSave = {
        ...recipe,
        idMeal: recipe.idMeal || recipe.id,
        id: recipe.id || recipe.idMeal,
        category: recipe.strCategory || filters.diet || "Other",
      };

      const exists = prev.some(
        (fav) => fav.idMeal === recipeToSave.idMeal || fav.id === recipeToSave.id
      );

      if (exists) {
        return prev.filter(
          (fav) => fav.idMeal !== recipeToSave.idMeal && fav.id !== recipeToSave.id
        );
      } else {
        return [...prev, recipeToSave];
      }
    });
  };

  // Fetch recipes from ingredients
  const handleFetch = (ings) => {
    if (!ings || ings.length === 0) {
      console.warn("No ingredients to fetch.");
      return;
    }
    fetchRecipes(ings, filters);
    setShowFavorites(false);
  };

  useEffect(() => {
    if (mood && moodToIngredients[mood]) {
      const moodIngs = moodToIngredients[mood];
      setIngredients(moodIngs);
      fetchRecipes(moodIngs, filters);
      setShowFavorites(false);
    }
  }, [mood, filters, fetchRecipes]);

  const handleFridgeIngredientsChange = (ings) => {
    setIngredients(ings);
    fetchRecipes(ings, filters);
    setShowFavorites(false);
  };

  useEffect(() => {
    console.log("Recipes loaded:", recipes);
  }, [recipes]);

  return (
    <div className="container" style={{ position: "relative", minHeight: "100vh" }}>
      <div className="header-actions" style={{ marginBottom: "1rem" }}>
        <button
          onClick={() => setShowFavorites(!showFavorites)}
          className={`favorites-btn ${showFavorites ? "secondary-btn" : ""}`}
        >
          {showFavorites ? "Show all recipes" : `My favorites (${favorites.length})`}
        </button>
      </div>

      {!showFavorites ? (
        <>
          <div className="input-container" style={{ marginBottom: "1rem" }}>
            <Input
              ingredients={ingredients}
              setIngredients={setIngredients}
              onSearch={handleFetch}
            />
          </div>

          <div className="filter-container" style={{ marginBottom: "1.5rem" }}>
            <MoodSelector mood={mood} setMood={setMood} />
            <FilterOptions filters={filters} setFilters={setFilters} />
          </div>

          <FridgeGame onIngredientsChange={handleFridgeIngredientsChange} />

          {loading && <p className="loading-text">Loading recipes...</p>}

          {!loading && recipes.length > 0 && (
            <RecipeList
              recipes={recipes}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          )}

          {!loading && recipes.length === 0 && (
            <p>No recipes found. Try different ingredients or filters.</p>
          )}
        </>
      ) : (
        <Favorites favorites={favorites} toggleFavorite={toggleFavorite} />
      )}
    </div>
    
  );
}
