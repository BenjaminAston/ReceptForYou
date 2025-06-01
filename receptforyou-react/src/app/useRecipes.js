import { useState } from "react";
import axios from "axios";

export const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const fetchRecipes = async (ingredients = [], filters = {}) => {
    setHasSearched(true);
    if (!ingredients || ingredients.length === 0) {
      setRecipes([]);
      return;
    }

    setLoading(true);
    try {
      const { diet = '', intolerances = '' } = filters;
      const res = await axios.get("https://api.spoonacular.com/recipes/complexSearch", {
        params: {
          includeIngredients: ingredients.join(","),
          diet,
          intolerances,
          number: 10,
          addRecipeInformation: true,
          apiKey: '6b1a9b4a2c004bc2af990763c803e766',
        },
      });

      if (res.data.results && Array.isArray(res.data.results)) {
        setRecipes(res.data.results);
      } else {
        setRecipes([]);
      }
    } catch (err) {
      console.error("Fel vid hämtning:", err);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  return { recipes, fetchRecipes, loading, hasSearched };
};

export default useRecipes;
