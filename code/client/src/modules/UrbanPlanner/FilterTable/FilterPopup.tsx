import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Document from "../../../models/document";
import "./FilterPopup.css";
import API from "../../../API/API";
import { Button, Col, Dropdown, Row } from "react-bootstrap";

interface FilterProps {
  setFilteredDocuments: Dispatch<SetStateAction<Document[]>>;
  setFilterTableVisible?: Dispatch<SetStateAction<boolean>>;
  handleResetNodes?: () => void;
}

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
  const [stakeholdersList, setStakeholdersList] = useState<string[]>([]);
  const [scalesList, setScalesList] = useState<string[]>([]);
  const [nodeTypesList, setNodeTypesList] = useState<string[]>([]);

  useEffect(() => {
    async function init() {
      const stakeholders = await API.getStakeholders();
      const scales = await API.getScales();
      const nodeTypes = await API.getNodeTypes();

      setStakeholdersList(stakeholders);
      setScalesList(scales);
      setNodeTypesList(nodeTypes);
    }
    init();


  }, []);

  interface Filters {
    documentType?: string;
    nodeType?: string;
    stakeholders?: string | string[];
    issuanceDateStart?: string;
    issuanceDateEnd?: string;
    language?: string;
    description?: string;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    setFilters((prevFilters) => {
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
        {/* Scale Dropdown */}
        <div className="filter-group">
          <label>Scale</label>
          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              id="scale-dropdown"
              className="dropdown-toggle-filter"
            >
              {filters.documentType || "Select Scale"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {/* Option to Deselect */}
              <Dropdown.Item
                onClick={() => setFilters({ ...filters, documentType: "" })}
              >
                Select scale
              </Dropdown.Item>
              {scalesList.map((scale, index) => (
                <Dropdown.Item
                  key={index}
                  onClick={() =>
                    setFilters({ ...filters, documentType: scale })
                  }
                >
                  {scale}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* Language */}
        <div className="filter-group">
          <label>Language</label>
          <div>
            <Row>
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
            </Row>
            <Row>
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
            </Row>
          </div>
        </div>

        {/* Stakeholders */}
        <div className="filter-group">
          <label>Stakeholders</label>
          <Row>
            <Dropdown>
              <Dropdown.Toggle
                variant="success"
                id="stakeholder-type-dropdown"
                className="dropdown-toggle-filter"
              >
                {filters.stakeholders?.length || "Select Stakeholder(s)"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {/* Option to Deselect */}
                <Dropdown.Item
                  onClick={() => setFilters({ ...filters, stakeholders: "" })}
                >
                  Select stakeholder
                </Dropdown.Item>

                {stakeholdersList.map((stakeholder, index) => (
                  <Dropdown.Item
                    key={index}
                    as="div"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <label>
                      <input
                        type="checkbox"
                        name="stakeholders"
                        value={stakeholder}
                        checked={filters.stakeholders?.includes(stakeholder)}
                        onChange={handleChange}
                      />
                      {stakeholder}
                    </label>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Row>
        </div>

        {/* Description */}
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

        {/* Node Type Dropdown */}
        <div className="filter-group">
          <label>Node Type</label>
          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              id="node-type-dropdown"
              className="dropdown-toggle-filter"
            >
              {filters.nodeType || "Select Node Type"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {/* Option to Deselect */}
              <Dropdown.Item
                onClick={() => setFilters({ ...filters, nodeType: "" })}
              >
                Select node type
              </Dropdown.Item>

              {/* Dynamic List of Node Types */}
              {nodeTypesList.map((nodeType, index) => (
                <Dropdown.Item
                  key={index}
                  onClick={() => setFilters({ ...filters, nodeType })}
                >
                  {nodeType}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
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
