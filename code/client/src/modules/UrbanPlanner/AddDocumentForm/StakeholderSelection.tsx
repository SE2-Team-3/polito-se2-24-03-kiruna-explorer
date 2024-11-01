import { Col, Row, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../../style.css";

const StakeholderSelection = (props: any) => {
  const [stakeholders, setStakeholders] = useState<string[]>(
    props.document ? props.document.Stakeholders : []
  );

  const stakeholdersList = [
    "LKAB",
    "Municipality",
    "Regional authority",
    "Architecture firms",
    "Citizen",
    "Others",
  ];

  const handleCheckboxChange = (event: any) => {
    const { value, checked } = event.target;
    if (checked) {
      setStakeholders([...stakeholders, value]);
    } else {
      setStakeholders(stakeholders.filter((sh) => sh !== value));
    }
  };

  useEffect(() => {
    if (props.setDocument) {
      props.setDocument((prevDocument: any) => ({
        ...prevDocument,
        Stakeholders: stakeholders,
      }));
    }
  }, [stakeholders, props.setDocument]);

  return (
    <Form.Group as={Col} controlId="formGridSH">
      <Form.Label className="black-text">Stakeholders</Form.Label>
      <Row>
        {stakeholdersList.map((sh, index) => (
          <Col xs={6} key={index}>
            <Form.Check
              type="checkbox"
              label={sh}
              value={sh}
              checked={stakeholders.includes(sh)}
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
