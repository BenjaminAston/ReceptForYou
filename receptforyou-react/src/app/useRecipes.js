import { useState } from "react";
import axios from "axios";

export const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

<<<<<<< Updated upstream
<<<<<<< Updated upstream
  const fetchRecipes = async (ingredients, filters) => {
    if (!ingredients || ingredients.length === 0) {
      setRecipes([]); 
=======
  const fetchRecipes = async (ingredients, filters = {}) => {
    if (!ingredients || ingredients.length === 0) {
      setRecipes([]);
>>>>>>> Stashed changes
=======
  const fetchRecipes = async (ingredients, filters = {}) => {
    if (!ingredients || ingredients.length === 0) {
      setRecipes([]);
>>>>>>> Stashed changes
      return;
    }

    setLoading(true);
    try {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
      const { diet, intolerances } = filters;
=======
      const diet = filters.diet || "";
      const intolerances = filters.intolerances || "";
      
>>>>>>> Stashed changes
=======
      const diet = filters.diet || "";
      const intolerances = filters.intolerances || "";
      
>>>>>>> Stashed changes
      const res = await axios.get("https://api.spoonacular.com/recipes/complexSearch", {
        params: {
          includeIngredients: ingredients.join(","),
          diet,
          intolerances,
<<<<<<< Updated upstream
<<<<<<< Updated upstream
          number: 10,
          addRecipeInformation: true,
          apiKey: "6b1a9b4a2c004bc2af990763c803e766",
        },
      });

      if (res.data.results && Array.isArray(res.data.results)) {
        setRecipes(res.data.results);
      } else {
=======
          number: 5,
          addRecipeInformation: true,
          apiKey: '6b1a9b4a2c004bc2af990763c803e766',
        },
      });

      console.log("API response:", res.data);

      if (res.data && Array.isArray(res.data.results)) {
        setRecipes(res.data.results);
      } else {
        console.warn("No results found or unexpected API response:", res.data);
>>>>>>> Stashed changes
=======
          number: 5,
          addRecipeInformation: true,
          apiKey: '6b1a9b4a2c004bc2af990763c803e766',
        },
      });

      console.log("API response:", res.data);

      if (res.data && Array.isArray(res.data.results)) {
        setRecipes(res.data.results);
      } else {
        console.warn("No results found or unexpected API response:", res.data);
>>>>>>> Stashed changes
        setRecipes([]);
      }
    } catch (err) {
      console.error("Fel vid hämtning:", err);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  return { recipes, fetchRecipes, loading };
<<<<<<< Updated upstream
<<<<<<< Updated upstream
};
=======
};
>>>>>>> Stashed changes
=======
};
>>>>>>> Stashed changes
