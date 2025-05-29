import { useState, useEffect } from 'react';
import axios from 'axios';

export const useRecipes = (ingredients, filters) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!ingredients || ingredients.length === 0) return;

    setLoading(true);

    const diet = filters?.diet || '';
    const intolerances = filters?.intolerances || '';

    axios.get('https://api.spoonacular.com/recipes/complexSearch', {
      params: {
        includeIngredients: ingredients.join(','),
        diet: diet,
        intolerances: intolerances,
        number: 5,
        addRecipeInformation: true,
        apiKey: '893747d593ca4d56ada26778bcbf9b48',
      },
    })
    .then((res) => setRecipes(res.data.results))
    .catch((err) => console.error('Fel vid hämtning:', err))
    .finally(() => setLoading(false));
  }, [ingredients, filters]);

  return { recipes, loading };
};
