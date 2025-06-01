import { useState } from "react";
import axios from "axios";

export const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecipes = async (ingredients, filters) => {
    if (!ingredients || ingredients.length === 0) {
      setRecipes([]);
      return;
    }

    setLoading(true);
    try {
      const { diet, intolerances } = filters;
      const res = await axios.get("https://api.spoonacular.com/recipes/complexSearch", {
        params: {
          includeIngredients: ingredients.join(","),
          diet,
          intolerances,
          number: 10,
          addRecipeInformation: true,
          apiKey: "3cf7dc6867b446649dcaa1be06f2825e"
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

  return { recipes, fetchRecipes, loading };
};

