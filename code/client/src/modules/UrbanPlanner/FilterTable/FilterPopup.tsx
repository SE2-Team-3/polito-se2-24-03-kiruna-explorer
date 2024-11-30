import React, { Dispatch, FC, SetStateAction, useState } from "react";
import Document from "../../../models/document";
import "./FilterPopup.css";
import API from "../../../API/API";
import { Col, Row } from "react-bootstrap";

interface FilterProps {
  setFilteredDocuments: Dispatch<SetStateAction<Document[]>>;
}

const FilterTable: FC<FilterProps> = (props) => {
  const [filters, setFilters] = useState<Filters>({
    documentType: "",
    stakeholders: [],
    issuanceDateStart: "",
    issuanceDateEnd: "",
    language: "",
  });
  console.log(filters);

  interface Filters {
    documentType?: string;
    stakeholders?: string | string[];
    issuanceDateStart?: string;
    issuanceDateEnd?: string;
    language?: string;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    setFilters((prevFilters) => {
      if (type === "checkbox" && name === "documentType") {
        // Permetti una sola selezione per le checkbox di "documentType"
        return {
          ...prevFilters,
          documentType: checked ? value : "",
        };
      }

      const key = name as keyof Filters;
      if (type === "checkbox") {
        const updatedList = checked
          ? [...(prevFilters[key] as string[]), value]
          : (prevFilters[key] as string[]).filter((item) => item !== value);

        return { ...prevFilters, [key]: updatedList };
      }

      return { ...prevFilters, [key]: value };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //onFilterApply(filters); // Applica i filtri passando i dati al componente padre
    API.getFilteredDocuments(filters).then((docs) => {
      props.setFilteredDocuments(docs);
    });
  };

  return (
    <div className="filter-table">
      <h3>Filters</h3>
      <form onSubmit={handleSubmit}>
        {/* Type Document */}
        <div className="filter-group">
          <label>Scale</label>
          <Row>
            <Col>
              <label>
                <input
                  type="checkbox"
                  name="documentType"
                  value="Text"
                  checked={filters.documentType === "Text"}
                  onChange={handleChange}
                />
                Text
              </label>
              <label>
                <input
                  type="checkbox"
                  name="documentType"
                  value="Concept"
                  checked={filters.documentType === "Concept"}
                  onChange={handleChange}
                />
                Concept
              </label>
            </Col>
            <Col>
              <label>
                <input
                  type="checkbox"
                  name="documentType"
                  value="Architectural plan"
                  checked={filters.documentType === "Architectural plan"}
                  onChange={handleChange}
                />
                Architectural
              </label>
              <label>
                <input
                  type="checkbox"
                  name="documentType"
                  value="Blueprints/actions"
                  checked={filters.documentType === "Blueprints/actions"}
                  onChange={handleChange}
                />
                Blueprints
              </label>
            </Col>
          </Row>
        </div>

        {/* Language */}
        <div className="filter-group">
          <label>Language</label>
          <div>
            <Row>
              <Col>
                <label>
                  <input type="checkbox" name="language" value="English" onChange={handleChange} />
                  English
                </label>
              </Col>
              <Col>
                <label>
                  <input type="checkbox" name="language" value="Swedish" onChange={handleChange} />
                  Swedish
                </label>
              </Col>
            </Row>
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

        {/* Start Date and End Date */}
        <div className="filter-group">
          <label>Start Date</label>
          <input
            type="date"
            name="issuanceDateStart"
            value={filters.issuanceDateStart}
            onChange={handleChange}
          />
        </div>
        <div className="filter-group">
          <label>End Date</label>
          <input
            type="date"
            name="issuanceDateEnd"
            value={filters.issuanceDateEnd}
            onChange={handleChange}
          />
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
