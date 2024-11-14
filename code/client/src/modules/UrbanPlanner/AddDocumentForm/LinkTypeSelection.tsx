import { Col, Form, Dropdown } from "react-bootstrap";
import { useState } from "react";
import "../../style.css";

interface LinkTypeSelectionProps {
  linkType: string[];
  setLinkType: (linkTypes: string[]) => void;
}

const LinkTypeSelection: React.FC<LinkTypeSelectionProps> = ({
  linkType,
  setLinkType,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

  const linkTypeList = [
    "direct consequence",
    "collateral consequence",
    "prevision",
    "update",
  ];

  const toggleLinkType = (type: string) => {
    setLinkType(
      linkType.includes(type)
        ? linkType.filter((lt) => lt !== type)
        : [...linkType, type]
    );
  };

  const handleValidationCheck = () => {
    if (linkType.length === 0) {
      setShowValidation(true);
    }
  };

  return (
    <Form.Group as={Col} controlId="formGridLinkType">
      <Form.Label className="font-size-18">Link Types</Form.Label>

      <Dropdown
        show={isDropdownOpen}
        onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
        className="dropdown"
      >
        <Dropdown.Toggle
          className={`dropdown-toggle w-100 ${
            linkType.length > 0 ? "" : "is-invalid"
          }`}
        >
          {linkType.length > 0 ? linkType.join(", ") : "Select Link Types"}
        </Dropdown.Toggle>

        <Dropdown.Menu className="dropdown-menu">
          {linkTypeList.map((type, index) => (
            <Dropdown.Item
              key={index}
              as="div"
              className="dropdown-item"
              onClick={(e) => e.stopPropagation()}
            >
              <Form.Check
                type="checkbox"
                id={`linkType-${index}`}
                label={
                  <span style={{ color: "black" }}>
                    {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
                  </span>
                }
                checked={linkType.includes(type)}
                onChange={() => toggleLinkType(type)}
              />
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {!linkType.length && showValidation && (
        <div className="invalid-feedback d-block">
          Please select at least one link type.
        </div>
      )}
    </Form.Group>
  );
};

export default LinkTypeSelection;
