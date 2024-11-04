import { Col, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../../style.css";
import { Props, NewDocument } from "./interfaces/types";

const StakeholderSelection = (props: Props) => {
  const [stakeholders, setStakeholders] = useState<string[]>(
    props.document ? props.document.stakeholders : []
  );

  const stakeholdersList = [
    "LKAB",
    "Municipality",
    "Citizen",
    "Architecture firms",
    "Regional authority",
    "Others",
  ];

  // Handle changes in the select input
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setStakeholders(selectedOptions);
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
      <Form.Label className="black-text">Stakeholders * </Form.Label>
      <Form.Select
        multiple
        required
        value={stakeholders}
        onChange={handleSelectChange}
        className="font-size-20"
      >
        {stakeholdersList.map((sh, index) => (
          <option key={index} value={sh}>
            {sh}
          </option>
        ))}
      </Form.Select>
      <Form.Control.Feedback type="invalid">
        Please select at least one stakeholder.
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default StakeholderSelection;
