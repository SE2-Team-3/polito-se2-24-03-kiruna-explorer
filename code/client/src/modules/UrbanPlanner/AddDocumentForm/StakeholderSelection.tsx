import { Col, Form, Dropdown } from "react-bootstrap";
import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import "../../style.css";
import { Props, NewDocument } from "./interfaces/types";

const StakeholderSelection = forwardRef((props: Props, ref) => {
  const [stakeholders, setStakeholders] = useState<string[]>(
    props.document ? props.document.stakeholders : []
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [showValidation, setShowValidation] = useState(false);

  const stakeholdersList = [
    "LKAB",
    "Municipality",
    "Citizen",
    "Architecture firms",
    "Regional authority",
    "Others",
  ];

  // Funzione per gestire la selezione/deselezione
  const toggleStakeholder = (stakeholder: string) => {
    setStakeholders((prevStakeholders) =>
      prevStakeholders.includes(stakeholder)
        ? prevStakeholders.filter((s) => s !== stakeholder)
        : [...prevStakeholders, stakeholder]
    );
  };

  useEffect(() => {
    if (props.setDocument) {
      props.setDocument((prevDocument: NewDocument) => ({
        ...prevDocument,
        stakeholders: stakeholders,
      }));
    }

    setIsValid(stakeholders.length > 0);
  }, [stakeholders, props.setDocument]);

  const handleValidationCheck = () => {
    if (!isValid) {
      setShowValidation(true); // Show error only if form is invalid
    }
  };

  // Expose the handleValidationCheck function to the parent
  useImperativeHandle(ref, () => ({
    handleValidationCheck,
  }));

  return (
    <Form.Group as={Col} controlId="formGridSH">
      <Form.Label className="black-text">Stakeholders *</Form.Label>

      {/* Dropdown Button with Custom Checkbox Options */}
      <Dropdown
        show={isDropdownOpen}
        onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
        className="dropdown"
      >
        <Dropdown.Toggle
          className={`dropdown-toggle w-100 font-size-20 ${
            isValid && showValidation ? "" : "is-invalid"
          }`}
        >
          {stakeholders.length > 0
            ? stakeholders.join(", ")
            : "Select Stakeholders"}
        </Dropdown.Toggle>

        <Dropdown.Menu className="dropdown-menu">
          {stakeholdersList.map((sh, index) => (
            <Dropdown.Item
              key={index}
              as="div"
              className="dropdown-item"
              onClick={(e) => e.stopPropagation()} // Previene la chiusura automatica
            >
              <Form.Check
                type="checkbox"
                id={`stakeholder-${index}`}
                label={sh}
                checked={stakeholders.includes(sh)}
                onChange={() => toggleStakeholder(sh)}
                className="form-check-label"
              />
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {/* Validation Feedback */}
      {!isValid && showValidation && (
        <div className="invalid-feedback d-block">
          Please select at least one stakeholder.
        </div>
      )}
    </Form.Group>
  );
});

export default StakeholderSelection;
