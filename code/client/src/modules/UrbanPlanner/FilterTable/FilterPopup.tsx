import React, { Dispatch, FC, SetStateAction, useState } from "react";
import Document from "../../../models/document";
import "./FilterPopup.css";
import API from "../../../API/API";
import { Button, Col, Dropdown, Row } from "react-bootstrap";

interface FilterProps {
  setFilteredDocuments: Dispatch<SetStateAction<Document[]>>;
  setFilterTableVisible?: Dispatch<SetStateAction<boolean>>;
  handleResetNodes?: () => void;
}

const nodeTypes = [
  "Design document",
  "Informative document",
  "Prescriptive document",
  "Technical document",
  "Agreement",
  "Conflict",
  "Consultation",
  "Action",
];

const FilterTable: FC<FilterProps> = (props) => {
  const [filters, setFilters] = useState<Filters>({
    documentType: "",
    nodeType: "",
    stakeholders: [],
    issuanceDateStart: "",
    issuanceDateEnd: "",
    language: "",
    description: "",
  });

  interface Filters {
    documentType?: string;
    nodeType?: string;
    stakeholders?: string | string[];
    issuanceDateStart?: string;
    issuanceDateEnd?: string;
    language?: string;
    description?: string;
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

      if (type === "checkbox" && name === "language") {
        // Permetti una sola selezione per le checkbox di "language"
        return {
          ...prevFilters,
          language: checked ? value : "",
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
    if (props.setFilterTableVisible) {
      props.setFilterTableVisible(false);
    }
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({
      documentType: "",
      nodeType: "",
      stakeholders: [],
      issuanceDateStart: "",
      issuanceDateEnd: "",
      language: "",
      description: "",
    });
    if (props.handleResetNodes) {
      props.handleResetNodes();
    }
  };

  return (
    <div className="filter-table">
      <h3>Filters</h3>
      <form onSubmit={handleSubmit} onReset={handleReset}>
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
                Architectural plan
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
                  <input
                    type="checkbox"
                    name="language"
                    value="English"
                    checked={filters.language === "English"}
                    onChange={handleChange}
                  />
                  English
                </label>
              </Col>
              <Col>
                <label>
                  <input
                    type="checkbox"
                    name="language"
                    value="Swedish"
                    checked={filters.language === "Swedish"}
                    onChange={handleChange}
                  />
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
            <Row>
              <Col>
                <label>
                  <input
                    type="checkbox"
                    name="stakeholders"
                    value="LKAB"
                    checked={filters.stakeholders?.includes("LKAB")}
                    onChange={handleChange}
                  />
                  LKAB
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="stakeholders"
                    value="Municipality"
                    checked={filters.stakeholders?.includes("Municipality")}
                    onChange={handleChange}
                  />
                  Municipality
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="stakeholders"
                    value="Citizen"
                    checked={filters.stakeholders?.includes("Citizen")}
                    onChange={handleChange}
                  />
                  Citizen
                </label>
              </Col>
              <Col>
                <label>
                  <input
                    type="checkbox"
                    name="stakeholders"
                    value="Architecture firms"
                    checked={filters.stakeholders?.includes("Architecture firms")}
                    onChange={handleChange}
                  />
                  Architecture firms
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="stakeholders"
                    value="Regional authority"
                    checked={filters.stakeholders?.includes("Regional authority")}
                    onChange={handleChange}
                  />
                  Regional authority
                </label>
              </Col>
            </Row>
          </div>
        </div>
        <div className="filter-group">
          <label>Description</label>
          <Row>
            <Col>
              <div>
                <input
                  type="text"
                  name="description"
                  placeholder="Enter keywords"
                  value={filters.description}
                  onChange={handleChange}
                />
              </div>
            </Col>
          </Row>
        </div>
        {/* Node Type */}

        <div className="filter-group">
          <label>Node Type</label>
          <div>
            <Dropdown>
              <Row>
                <Col>
                  <Dropdown.Toggle
                    variant="success"
                    id="dropdown-basic"
                    className="dropdown-toggle-filter"
                  >
                    {filters.nodeType || "Select Node Type"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {nodeTypes.map((nodeType) => (
                      <Dropdown.Item
                        className="dropdown-item-filter"
                        key={nodeType}
                        onClick={() => {
                          setFilters({ ...filters, nodeType });
                        }}
                      >
                        {nodeType}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Col>
              </Row>
            </Dropdown>
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
        {/* Clear Button */}
        <button type="reset" className="btn-filter-reset">
          Clear
        </button>
      </form>
    </div>
  );
};

export default FilterTable;
