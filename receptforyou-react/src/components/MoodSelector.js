// src/components/MoodSelector.js
import React from "react";
import '../styles/global.css';

const moodOptions = [
  { value: "", label: "Välj humör" },
  { value: "trött", label: "Trött" },
  { value: "stressad", label: "Stressad" },
  { value: "glad", label: "Glad" } 
];

export default function MoodSelector({ mood, setMood }) {
  const handleChange = (e) => {
    setMood(e.target.value);
  };

  return (
    <div className="mood-selector">
      <select value={mood} onChange={handleChange} className="filter-select">
        {moodOptions.map((option) => (
          <option key={option.value} value={option.value} disabled={option.value === ""}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}