//Komponent för att välja kosttyp och allergier via dropdown-menyer
import React from "react";

const FilterOptions = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="filter-options">
      <select name="diet" onChange={handleChange} value={filters.diet} className="filter-select">
        <option value="" disabled hidden>Kosttyp</option>
        <option value="">Ingen</option>
        <option value="vegetarian">Vegetarisk</option>
        <option value="vegan">Vegansk</option>
        <option value="gluten free">Glutenfri</option>
      </select>

      <select name="intolerances" onChange={handleChange} value={filters.intolerances} className="filter-select">
        <option value="" disabled hidden>Allergier</option>
        <option value="">Ingen</option>
        <option value="dairy">Laktos</option>
        <option value="gluten">Gluten</option>
        <option value="peanut">Nötter</option>
      </select>
    </div>
  );
};

export default FilterOptions;
