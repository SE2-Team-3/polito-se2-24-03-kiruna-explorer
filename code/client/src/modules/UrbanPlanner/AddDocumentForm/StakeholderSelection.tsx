import { Col, Form, Dropdown } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../../style.css";
import { Props, NewDocument } from "./interfaces/types";
import { FaCheckSquare, FaSquare } from "react-icons/fa";

const StakeholderSelection = (props: Props) => {
  const [stakeholders, setStakeholders] = useState<string[]>(
    props.document ? props.document.stakeholders : []
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
  }, [stakeholders, props.setDocument]);

  return (
    <Form.Group as={Col} controlId="formGridSH">
      <Form.Label className="black-text">Stakeholders *</Form.Label>

      {/* Dropdown Button with Custom Checkbox Options */}
      <Dropdown
        show={isDropdownOpen}
        onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <Dropdown.Toggle
          variant="outline-secondary"
          className="w-100 text-start"
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
              />
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {/* Messaggio di Feedback */}
      <Form.Control.Feedback type="invalid">
        Please select at least one stakeholder.
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default StakeholderSelection;
