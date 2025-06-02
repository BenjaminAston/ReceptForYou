import { useState } from "react";
import axios from "axios";

export const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecipes = async (ingredients, filters = {}) => {
    // Validera ingredienser
    if (!ingredients || ingredients.length === 0) {
      setRecipes([]);
      setError("Please add at least one ingredient");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Skapa parametrar
      const params = {
        includeIngredients: ingredients.join(","),
        number: 5,
        addRecipeInformation: true,
        apiKey: '6b1a9b4a2c004bc2af990763c803e766' // Din API-nyckel
      };

      // Lägg till filter om de finns
      if (filters.diet) params.diet = filters.diet;
      if (filters.intolerances) params.intolerances = filters.intolerances;

      console.log("Making API request with:", params);

      // Gör API-anropet
      const res = await axios.get("https://api.spoonacular.com/recipes/complexSearch", {
        params,
        timeout: 15000 // 15 sekunders timeout
      });

      console.log("API response received:", res.data);

      if (res.data?.results?.length > 0) {
        setRecipes(res.data.results);
      } else {
        setError("No recipes found. Try different ingredients.");
        setRecipes([]);
      }
    } catch (err) {
      console.error("API request failed:", {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data
      });

      // Specifika felmeddelanden
      if (err.response?.status === 402) {
        setError("API quota exceeded. Please try again later.");
      } else if (err.code === "ECONNABORTED") {
        setError("Request took too long. Please check your connection.");
      } else {
        setError("Failed to fetch recipes. Please try again.");
      }

      // Fallback-data för utveckling
      if (process.env.NODE_ENV === "development") {
        console.warn("Using development mock data");
        setRecipes([
          {
            id: 716429,
            title: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
            image: "https://spoonacular.com/recipeImages/716429-312x231.jpg",
            readyInMinutes: 45,
            sourceUrl: "https://spoonacular.com/pasta-with-garlic-scallions-cauliflower-breadcrumbs-716429"
          }
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  return { 
    recipes, 
    fetchRecipes, 
    loading, 
    error,
    clearError: () => setError(null) 
  };
};