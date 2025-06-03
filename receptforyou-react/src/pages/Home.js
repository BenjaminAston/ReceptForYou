//Huvudsidan för applikationen
import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import { useRecipes } from "../app/useRecipes";
import RecipeList from "../components/RecipeList";
import Favorites from "../pages/Favorites";

//Fördefinierade ingredienser kopplade till olika humör
const moodToIngredients = {
  tired: ["pasta", "cheese"],
  stressed: ["fast food", "wrap"],
  happy: ["fruit", "berries"],
};

//Home-komponenten
export default function Home() {
  const [ingredients, setIngredients] = useState([]);
  const [filters, setFilters] = useState({ diet: "", intolerances: "" });
  const [mood, setMood] = useState("");
  const { recipes, fetchRecipes, loading } = useRecipes();

  //Hämtar favoriter från localStorage vid start, annars tom lista
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [showFavorites, setShowFavorites] = useState(false);

  //Sparar favoriter till localStorage varje gång de ändras
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  //Lägger till eller tar bort recept från favoritlistan
  const toggleFavorite = (recipe) => {
    setFavorites((prev) => {
      const recipeId = recipe.idMeal || recipe.id;
      const exists = prev.some((fav) => fav.idMeal === recipeId || fav.id === recipeId);
      if (exists) {
        return prev.filter((fav) => (fav.idMeal || fav.id) !== recipeId);
      } else {
        return [...prev, { ...recipe, id: recipeId }];
      }
    });
  };

  const handleFetch = (ings) => {
    if (!ings || ings.length === 0) return;
    fetchRecipes(ings, filters);
    setShowFavorites(false);
  };

  useEffect(() => {
    if (!mood) {
      setIngredients([]);
      return;
    }
    if (moodToIngredients[mood]) {
      const moodIngs = moodToIngredients[mood];
      setIngredients(moodIngs);
      setShowFavorites(false);
    }
  }, [mood]);

  return (
    <div className="container" style={{ minHeight: "100vh" }}>
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
          <Input
            ingredients={ingredients}
            setIngredients={setIngredients}
            onSearch={handleFetch}
            filters={filters}
            setFilters={setFilters}
            mood={mood}
            setMood={setMood}
          />
          {loading && <p className="loading-text">Loading recipes...</p>}
          {!loading && recipes.length > 0 && (
            <RecipeList recipes={recipes} favorites={favorites} toggleFavorite={toggleFavorite} />
          )}
          {!loading && recipes.length === 0 && <p>No recipes found. Try different ingredients or filters.</p>}
        </>
      ) : (
        <Favorites favorites={favorites} toggleFavorite={toggleFavorite} />
      )}
    </div>
  );
}
