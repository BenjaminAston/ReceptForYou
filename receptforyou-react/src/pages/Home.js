import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import { useRecipes } from "../app/useRecipes";
import FilterOptions from "../components/FilterOptions";
import RecipeList from "../components/RecipeList";
import Favorites from "../pages/Favorites";
import MoodSelector from "../components/MoodSelector";
import '../styles/global.css';

const moodToIngredients = {
  trött: ["pasta", "cheese", "banan", "mjölk"],
  stressad: ["kyckling", "ris", "wraps", "salsa"],
  glad: ["bär", "frukt", "yoghurt", "honung"]
};

export default function Home() {
  const [ingredients, setIngredients] = useState([]);
  const [filters, setFilters] = useState({ diet: "", intolerances: "" });
  const [mood, setMood] = useState("");
  const { recipes, fetchRecipes, loading } = useRecipes();

  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  // Load favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setFavorites(parsed);
        }
      } catch (error) {
        console.error("Error parsing favorites:", error);
        localStorage.removeItem("favorites");
      }
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } else {
      localStorage.removeItem("favorites");
    }
  }, [favorites]);

  // Add/remove favorites
  const toggleFavorite = (recipe) => {
    setFavorites((prev) => {
      const recipeToSave = {
        ...recipe,
        id: recipe.id || recipe.idMeal || Date.now(),
        title: recipe.title || recipe.strMeal,
        image: recipe.image || recipe.strMealThumb,
        sourceUrl: recipe.sourceUrl || recipe.strSource
      };

      const exists = prev.some(fav => fav.id === recipeToSave.id);

      if (exists) {
        return prev.filter(fav => fav.id !== recipeToSave.id);
      } else {
        return [...prev, recipeToSave];
      }
    });
  };

  // Fetch recipes based on ingredients and filters
  const handleFetch = (ings) => {
    if (!ings || ings.length === 0) {
      console.warn("No ingredients to fetch.");
      setIngredients([]);
      return;
    }
    fetchRecipes(ings, filters);
    setShowFavorites(false);
  };

  // When mood changes: update ingredients AND fetch recipes right away
  useEffect(() => {
    if (mood === "") {
      // Återställ om användaren väljer "Välj humör" igen
      setIngredients([]);
    } else if (mood && moodToIngredients[mood]) {
      const moodIngs = moodToIngredients[mood];
      setIngredients(moodIngs);
      fetchRecipes(moodIngs, filters);
      setShowFavorites(false);
    }
  }, [mood]);

  // Debug recipes in console
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
          {showFavorites ? "Visa alla recept" : `Mina favoriter (${favorites.length})`}
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

          {loading && <p className="loading-text">Hämtar recept...</p>}

          {!loading && recipes.length > 0 && (
            <RecipeList
              recipes={recipes}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          )}

          {!loading && recipes.length === 0 && (
            <p>Inga recept hittades. Prova med andra ingredienser eller filter.</p>
          )}
        </>
      ) : (
        <Favorites favorites={favorites} toggleFavorite={toggleFavorite} />
      )}
    </div>
  );
}