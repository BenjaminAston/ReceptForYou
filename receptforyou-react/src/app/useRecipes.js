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
        number: 50,
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