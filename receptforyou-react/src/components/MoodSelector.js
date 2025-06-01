import React from "react";

const moodOptions = [
  { value: "", label: "Välj humör" },
  { value: "tired", label: "Trött" },
  { value: "stressed", label: "Stressad" },
  { value: "happy", label: "Glad" },
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
