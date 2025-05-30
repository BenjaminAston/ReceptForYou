import React, { useState } from 'react'; 
import InputField from '../components/Input';
import { useRecipes } from '../app/useRecipes';
import FilterOptions from '../components/FilterOptions';

export default function Home() {
  const [ingredients, setIngredients] = useState([]);
  const [filters, setFilters] = useState({ diet: '', intolerances: '' });
  const { recipes, fetchRecipes, loading } = useRecipes();
 
  const addIngredient = (ingredient) => {
    setIngredients(previous => [...previous, ingredient]);
  };

  const handleFetch = () => {
    fetchRecipes(ingredients, filters);
  };

  return (
    <div>
      <InputField onAddIngredient={addIngredient} />
      <FilterOptions filters={filters} setFilters={setFilters} />
      <button onClick={handleFetch}>Hämta recept</button>

      {loading && <p>Laddar recept</p>}
      {!loading && recipes.map((recipe) => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <img src={recipe.image} alt={recipe.title} />
        </div>
      ))}
    </div>
  );
}
