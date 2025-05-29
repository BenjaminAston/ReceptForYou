import React, { useState } from 'react';  // Lägg till React och useState-import
import InputField from '../components/Input';
import { useRecipes } from '../app/useRecipes';
import FilterOptions from '../components/FilterOptions'; // Vi skapar denna snart

export default function Home() {
  const [ingredients, setIngredients] = useState([]);       // Ingredienser
  const [filters, setFilters] = useState({ diet: '', intolerances: '' }); // Filter

  // Anropa useRecipes med ingredienser och filter
  const { recipes, fetchRecipes, loading } = useRecipes(ingredients, filters);

  // Hantera tillägg av ingrediens
  const addIngredient = (ingredient) => {
    setIngredients(prev => [...prev, ingredient]);
  };

  return (
    <div>
      <InputField onAddIngredient={addIngredient} />
      <FilterOptions filters={filters} setFilters={setFilters} />
      {/* Visa receptlistan och annat här */}
    </div>
  );
}
