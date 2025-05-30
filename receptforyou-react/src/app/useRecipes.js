// Importerar React hooks
import { useState } from "react";
import axios from "axios";

// Skapar en hook som hämtar recept
export const useRecipes = () => {
    
    const [recipes, setRecipes] = useState([]); 
    const [loading, setLoading] = useState(false);
  
    const fetchRecipes = async (ingredients, filters) => {
      if (!ingredients || ingredients.length === 0) return; 
     
      setLoading(true);
      try {
        const { diet, intolerances } = filters;
        const res = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
          params: {
            includeIngredients: ingredients.join(','),
            diet,
            intolerances,
            number: 5,
            addRecipeInformation: true,
            apiKey: '893747d593ca4d56ada26778bcbf9b48',
          }
        });
    
        setRecipes(res.data.results);
      } catch (err) {
        console.error('Fel vid hämtning:', err);
      } finally {
        setLoading(false);
      }
    };
  
    return { recipes, fetchRecipes, loading };
  };

