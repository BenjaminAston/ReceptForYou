import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import { useRecipes } from "../app/useRecipes";
import FilterOptions from "../components/FilterOptions";
import RecipeList from "../components/RecipeList";
import Favorites from "../pages/Favorites";
import MoodSelector from "../components/MoodSelector";
<<<<<<< Updated upstream
import FridgeGame from "../components/FridgeGame";
import '../styles/global.css';

const moodToIngredients = {
  tired: ["pasta", "cheese"],
  festive: ["shrimp", "champagne"],
  stressed: ["fast food", "wrap"],
  happy: ["fruit", "berries"],
=======
import '../styles/global.css';

const moodToIngredients = {
  trött: ["pasta", "cheese", "banan", "mjölk"],
  stressad: ["kyckling", "ris", "wraps", "salsa"],
  glad: ["bär", "frukt", "yoghurt", "honung"]
>>>>>>> Stashed changes
};

export default function Home() {
  const [ingredients, setIngredients] = useState([]);
  const [filters, setFilters] = useState({ diet: "", intolerances: "" });
  const [mood, setMood] = useState("");
  const { recipes, fetchRecipes, loading } = useRecipes();

  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

<<<<<<< Updated upstream
=======
  // Load favorites from localStorage
>>>>>>> Stashed changes
  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
<<<<<<< Updated upstream
        if (Array.isArray(parsed)) {
=======
        if (Array.isArray(parsed) && parsed.length > 0) {
>>>>>>> Stashed changes
          setFavorites(parsed);
        }
      } catch (error) {
        console.error("Error parsing favorites:", error);
<<<<<<< Updated upstream
=======
        localStorage.removeItem("favorites");
>>>>>>> Stashed changes
      }
    }
  }, []);

<<<<<<< Updated upstream
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

=======
  // Save favorites to localStorage
  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } else {
      localStorage.removeItem("favorites");
    }
  }, [favorites]);

  // Add/remove favorites
>>>>>>> Stashed changes
  const toggleFavorite = (recipe) => {
    setFavorites((prev) => {
      const recipeToSave = {
        ...recipe,
<<<<<<< Updated upstream
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
=======
        id: recipe.id || recipe.idMeal || Date.now(),
        title: recipe.title || recipe.strMeal,
        image: recipe.image || recipe.strMealThumb,
        sourceUrl: recipe.sourceUrl || recipe.strSource
      };

      const exists = prev.some(fav => fav.id === recipeToSave.id);

      if (exists) {
        return prev.filter(fav => fav.id !== recipeToSave.id);
>>>>>>> Stashed changes
      } else {
        return [...prev, recipeToSave];
      }
    });
  };

<<<<<<< Updated upstream
  // Fetch recipes from ingredients
  const handleFetch = (ings) => {
    if (!ings || ings.length === 0) {
      console.warn("No ingredients to fetch.");
=======
  // Fetch recipes based on ingredients and filters
  const handleFetch = (ings) => {
    if (!ings || ings.length === 0) {
      console.warn("No ingredients to fetch.");
      setIngredients([]);
      // Rensa recept när inga ingredienser finns
>>>>>>> Stashed changes
      return;
    }
    fetchRecipes(ings, filters);
    setShowFavorites(false);
  };

<<<<<<< Updated upstream
  useEffect(() => {
    if (mood && moodToIngredients[mood]) {
=======
  // When mood changes: update ingredients AND fetch recipes right away
  useEffect(() => {
    if (mood === "") {
      // Återställ om användaren väljer "Välj humör" igen
      setIngredients([]);
    } else if (mood && moodToIngredients[mood]) {
>>>>>>> Stashed changes
      const moodIngs = moodToIngredients[mood];
      setIngredients(moodIngs);
      fetchRecipes(moodIngs, filters);
      setShowFavorites(false);
    }
<<<<<<< Updated upstream
  }, [mood, filters, fetchRecipes]);

  const handleFridgeIngredientsChange = (ings) => {
    setIngredients(ings);
    fetchRecipes(ings, filters);
    setShowFavorites(false);
  };

=======
  }, [mood]);

  // Debug recipes in console
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
          {showFavorites ? "Show all recipes" : `My favorites (${favorites.length})`}
=======
          {showFavorites ? "Visa alla recept" : `Mina favoriter (${favorites.length})`}
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
          <FridgeGame onIngredientsChange={handleFridgeIngredientsChange} />

          {loading && <p className="loading-text">Loading recipes...</p>}
=======
          {loading && <p className="loading-text">Hämtar recept...</p>}
>>>>>>> Stashed changes

          {!loading && recipes.length > 0 && (
            <RecipeList
              recipes={recipes}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          )}

          {!loading && recipes.length === 0 && (
<<<<<<< Updated upstream
            <p>No recipes found. Try different ingredients or filters.</p>
=======
            <p>Inga recept hittades. Prova med andra ingredienser eller filter.</p>
>>>>>>> Stashed changes
          )}
        </>
      ) : (
        <Favorites favorites={favorites} toggleFavorite={toggleFavorite} />
      )}
    </div>
  );
}