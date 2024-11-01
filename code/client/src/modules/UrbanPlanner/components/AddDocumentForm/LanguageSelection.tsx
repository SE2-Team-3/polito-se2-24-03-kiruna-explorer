import { Col, Row, Form, Button } from "react-bootstrap";
import { useState } from "react";
import "../../UrbanPlanner.css";

const LanguageSelection = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const handleDeselect = () => {
    setSelectedLanguage("");
  };

  return (
    <Form.Group as={Col} controlId="formGridLanguage">
      <Form.Label className="black-text">Language</Form.Label>
      <Row>
        <Col xs="auto">
          <Form.Check
            type="radio"
            id="language-english"
            label="English"
            name="language"
            value="EN"
            checked={selectedLanguage === "EN"}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="form-check-large"
          />
        </Col>
        <Col xs="auto">
          <Form.Check
            type="radio"
            id="language-swedish"
            label="Swedish"
            name="language"
            value="SW"
            checked={selectedLanguage === "SW"}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="form-check-large"
          />
        </Col>
      </Row>
      {selectedLanguage && (
        <Button
          variant="primary"
          onClick={handleDeselect}
          className="button-small mt-2"
        >
          Deselect
        </Button>
      )}
    </Form.Group>
  );
};

export default LanguageSelection;
