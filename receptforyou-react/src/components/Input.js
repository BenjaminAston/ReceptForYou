import React, { useState, useEffect } from 'react';
import MoodSelector from './MoodSelector';
import FilterOptions from './FilterOptions';

const Input = ({ ingredients, setIngredients, onSearch, filters, setFilters, mood, setMood  }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    localStorage.setItem('userIngredients', JSON.stringify(ingredients));
  }, [ingredients]);

  const handleAdd = (e) => {
    e.preventDefault();
    const trimmed = inputValue.trim().toLowerCase();
    if (trimmed && !ingredients.includes(trimmed)) {
      const updated = [...ingredients, trimmed];
      setIngredients(updated);
      updateIngredientHistory(trimmed);
    }
    setInputValue('');
  };

  const handleRemove = (ingredientToRemove) => {
    const updated = ingredients.filter((ing) => ing !== ingredientToRemove);
    setIngredients(updated);
  };

  const handleGenerateFromFridge = () => {
    const savedHistory = localStorage.getItem('ingredientHistoryCounts');
    if (savedHistory) {
      try {
        const historyCounts = JSON.parse(savedHistory);
        const sortedIngredients = Object.keys(historyCounts)
          .sort((a, b) => historyCounts[b] - historyCounts[a])
          .slice(0, 5); 
        if (sortedIngredients.length > 0) {
          setIngredients(sortedIngredients);
          onSearch(sortedIngredients);
        } else {
          alert('Inga sparade ingredienser i historiken.');
        }
      } catch (e) {
        console.error('Kunde inte läsa historik från localStorage:', e);
      }
    } else {
      alert('Ingen historik hittades.');
    }
  };
  
  const updateIngredientHistory = (newIngredient) => {
    const savedHistory = localStorage.getItem('ingredientHistoryCounts');
    let historyCounts = {};
    if (savedHistory) {
      try {
        historyCounts = JSON.parse(savedHistory);
      } catch (e) {
        console.error('Kunde inte läsa historik från localStorage:', e);
      }
    }
    historyCounts[newIngredient] = (historyCounts[newIngredient] || 0) + 1;
    localStorage.setItem('ingredientHistoryCounts', JSON.stringify(historyCounts));
  };

  return (
    <div className="input-container">
      <form onSubmit={handleAdd} className="input-form">
        <div className="input-group">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Lägg till ingrediens..."
            autoComplete="off"
            className="input-field"
          />
          <button type="submit" className="add-btn">+</button>
        </div>
      </form>

      {ingredients.length > 0 && (
        <div className="ingredients-list-container">
          <ul className="ingredients-list">
            {ingredients.map((ing, i) => (
              <li key={i} className="ingredient-item">
                <span>{ing}</span>
                <button onClick={() => handleRemove(ing)} className="remove-btn" aria-label={`Ta bort ${ing}`}>
                  &times;
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="inline-filters">
        <MoodSelector mood={mood} setMood={setMood} />
        <FilterOptions filters={filters} setFilters={setFilters} />
      </div>

      <div className="action-buttons">
        <button onClick={() => onSearch(ingredients)} className="btn" disabled={ingredients.length === 0}>
          Hämta recept
        </button>
        <button onClick={handleGenerateFromFridge} className="btn btn-secondary">
          Det här brukar jag ha i kylen
        </button>
      </div>
    </div>
  );
};

export default Input;
