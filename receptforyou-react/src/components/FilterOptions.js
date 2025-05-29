import React from "react";

const FilterOptions = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <select name="diet" onChange={handleChange} value={filters.diet}>
        <option value="">Kosttyp</option>
        <option value="vegetarian">Vegetarisk</option>
        <option value="vegan">Vegansk</option>
        <option value="gluten free">Glutenfri</option>
      </select>

      <select name="intolerances" onChange={handleChange} value={filters.intolerances}>
        <option value="">Allergier</option>
        <option value="dairy">Laktos</option>
        <option value="gluten">Gluten</option>
        <option value="peanut">Nötter</option>
      </select>
    </div>
  );
};

export default FilterOptions;
