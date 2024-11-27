import React, { useState } from "react";
import "./FilterPopup.css";

interface FilterProps {
  onFilterApply: (filters: Record<string, any>) => void;
}

const FilterTable: React.FC<FilterProps> = ({ onFilterApply }) => {
  const [filters, setFilters] = useState({
    typeDocument: [],
    stakeholders: [],
    connection: "",
    pages: "",
    startDate: "",
    endDate: "",
  });

  interface Filters {
    typeDocument: string[];
    stakeholders: string[];
    connection: string;
    pages: string;
    startDate: string;
    endDate: string;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    setFilters((prevFilters) => {
      if (type === "checkbox") {
        const key = name as keyof Filters; // Specifica esplicitamente la chiave
        const updatedList = checked
          ? [...(prevFilters[key] as string[]), value]
          : (prevFilters[key] as string[]).filter((item) => item !== value);

        return { ...prevFilters, [key]: updatedList };
      }

      const key = name as keyof Filters; // Specifica esplicitamente la chiave
      return { ...prevFilters, [key]: value };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterApply(filters); // Applica i filtri passando i dati al componente padre
  };

  return (
    <div className="filter-table">
      <h3>Filters</h3>
      <form onSubmit={handleSubmit}>
        {/* Type Document */}
        <div className="filter-group">
          <label>Scale</label>
          <div>
            <label>
              <input type="checkbox" name="typeDocument" value="Text" onChange={handleChange} />
              Text
            </label>
            <label>
              <input type="checkbox" name="typeDocument" value="Concept" onChange={handleChange} />
              Concept
            </label>
            <label>
              <input
                type="checkbox"
                name="typeDocument"
                value="Architectural plan"
                onChange={handleChange}
              />
              Architectural plan
            </label>
            <label>
              <input
                type="checkbox"
                name="typeDocument"
                value="Blueprints"
                onChange={handleChange}
              />
              Blueprints
            </label>
          </div>
        </div>

        {/* Stakeholders */}
        <div className="filter-group">
          <label>Stakeholders</label>
          <div>
            <label>
              <input type="checkbox" name="stakeholders" value="LKAB" onChange={handleChange} />
              LKAB
            </label>
            <label>
              <input
                type="checkbox"
                name="stakeholders"
                value="Municipality"
                onChange={handleChange}
              />
              Municipality
            </label>
            <label>
              <input type="checkbox" name="stakeholders" value="Citizen" onChange={handleChange} />
              Citizen
            </label>
            <label>
              <input
                type="checkbox"
                name="stakeholders"
                value="Arichitecture firms"
                onChange={handleChange}
              />
              Arichitecture firms
            </label>
            <label>
              <input
                type="checkbox"
                name="stakeholders"
                value="Regional authority"
                onChange={handleChange}
              />
              Regional authority
            </label>
          </div>
        </div>

        {/* Connection */}
        <div className="filter-group">
          <label>Connection</label>
          <input
            type="number"
            name="connection"
            value={filters.connection}
            onChange={handleChange}
            placeholder="e.g. 01"
          />
        </div>

        {/* Pages */}
        <div className="filter-group">
          <label>Pages</label>
          <input
            type="number"
            name="pages"
            value={filters.pages}
            onChange={handleChange}
            placeholder="e.g. 111"
          />
        </div>

        {/* Start Date and End Date */}
        <div className="filter-group">
          <label>Start Date</label>
          <input type="date" name="startDate" value={filters.startDate} onChange={handleChange} />
        </div>
        <div className="filter-group">
          <label>End Date</label>
          <input type="date" name="endDate" value={filters.endDate} onChange={handleChange} />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn-filter">
          Filter
        </button>
      </form>
    </div>
  );
};

export default FilterTable;
