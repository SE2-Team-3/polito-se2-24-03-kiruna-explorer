import { Col, Row, Form } from "react-bootstrap";
import { useState } from "react";
import "../../UrbanPlanner.css";

const StakeholderSelection = () => {
  const stakeholders = [
    "LKAB",
    "Municipality",
    "Regional authority",
    "Architecture firms",
    "Citizen",
    "Others",
  ];

  const [selectedStakeholders, setSelectedStakeholders] = useState<string[]>(
    []
  );

  const handleCheckboxChange = (event: any) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedStakeholders([...selectedStakeholders, value]);
    } else {
      setSelectedStakeholders(
        selectedStakeholders.filter((stakeholder) => stakeholder !== value)
      );
    }
  };

  return (
    <Form.Group as={Col} controlId="formGridSH">
      <Form.Label className="black-text">Stakeholders</Form.Label>
      <Row>
        {stakeholders.map((stakeholder, index) => (
          <Col xs={6} key={index}>
            <Form.Check
              type="checkbox"
              label={stakeholder}
              value={stakeholder}
              checked={selectedStakeholders.includes(stakeholder)}
              onChange={handleCheckboxChange}
              className="form-check-large"
            />
          </Col>
        ))}
      </Row>
    </Form.Group>
  );
};

export default StakeholderSelection;
