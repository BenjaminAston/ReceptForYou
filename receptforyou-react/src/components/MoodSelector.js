// src/components/MoodSelector.js
import React from "react";
import '../styles/global.css';

const moodOptions = [
  { value: "", label: "Välj humör" },
  { value: "trött", label: "Trött - behöver energi" },
  { value: "stressad", label: "Stressad - snabbt och enkelt" },
  { value: "glad", label: "Glad - lätt och fräscht" },
];

export default function MoodSelector({ mood, setMood }) {
  const handleChange = (e) => {
    // Återställ till tom sträng när "Välj humör" väljs
    setMood(e.target.value === "" ? "" : e.target.value);
  };

  return (
    <div className="mood-selector">
      <select 
        value={mood} 
        onChange={handleChange} 
        className="filter-select"
      >
        {moodOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}