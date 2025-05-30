import React, { useState, useEffect } from 'react';

const Input = ({ ingredients, setIngredients, onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('userIngredients');
    if (saved) {
      const parsed = JSON.parse(saved);
      setIngredients(parsed);
    }
  }, [setIngredients]);

  const handleAdd = (e) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (trimmed && !ingredients.includes(trimmed)) {
      const updated = [...ingredients, trimmed];
      setIngredients(updated);
      localStorage.setItem('userIngredients', JSON.stringify(updated));
    }

      setInputValue('');
  };

  const handleRemove = (ingredientToRemove) => {
    const updated = ingredients.filter((ing) => ing !== ingredientToRemove);
    setIngredients(updated);
    localStorage.setItem('userIngredients', JSON.stringify(updated));
  };

  return (
    <div>
      <form onSubmit={handleAdd}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Lägg till ingrediens"
        />
        <button type="submit">Lägg till</button>
      </form>

      <ul>
        {ingredients.map((ing, i) => (
          <li key={i}>
            {ing} <button onClick={() => handleRemove(ing)}>❌</button>
          </li>
        ))}
      </ul>

      <button onClick={onSearch}>Hämta recept</button>
    </div>
  );
};
export default Input;
