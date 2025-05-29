import React, { useState, useEffect } from 'react';

const Input = ({ onAddIngredient }) => {
  const [inputValue, setInputValue] = useState('');

  // Läs ingredienser från localStorage när komponenten mountas
  useEffect(() => {
    const saved = localStorage.getItem('userIngredients');
    if (saved) {
      JSON.parse(saved).forEach(ingredient => onAddIngredient(ingredient));
    }
  }, [onAddIngredient]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = inputValue.trim();
    if (trimmed.length > 0) {
      onAddIngredient(trimmed);

      // Spara i localStorage – hämta först befintliga ingredienser och lägg till ny
      const saved = localStorage.getItem('userIngredients');
      const savedIngredients = saved ? JSON.parse(saved) : [];
      if (!savedIngredients.includes(trimmed)) {
        savedIngredients.push(trimmed);
        localStorage.setItem('userIngredients', JSON.stringify(savedIngredients));
      }

      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Lägg till ingrediens"
      />
      <button type="submit">Sök recept</button>
    </form>
  );
};

export default Input;
