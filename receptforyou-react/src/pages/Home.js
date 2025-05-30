import React, { useState } from 'react'; 
import Input from '../components/Input';
import { useRecipes } from '../app/useRecipes';
import FilterOptions from '../components/FilterOptions';
import RecipeList from '../components/RecipeList';

export default function Home() {
  const [ingredients, setIngredients] = useState([]);
  const [filters, setFilters] = useState({ diet: '', intolerances: '' });
  const { recipes, fetchRecipes, loading } = useRecipes();
 
  const handleFetch = () => {
    fetchRecipes(ingredients, filters);
  };

  return (
    <div>
      <Input
        ingredients={ingredients}
        setIngredients={setIngredients}
        onSearch={handleFetch}
      />
      <FilterOptions filters={filters} setFilters={setFilters} />
      {loading && <p>Laddar recept...</p>}
      {!loading && <RecipeList recipes={recipes} />}
    </div>
    
  );
}
