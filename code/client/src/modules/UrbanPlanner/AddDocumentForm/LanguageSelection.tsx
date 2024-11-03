import { Col, Row, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../../style.css";

const LanguageSelection = (props: any) => {
  const [language, setLanguage] = useState(
    props.document ? props.document.Language : ""
  );

  useEffect(() => {
    if (props.setDocument) {
      props.setDocument((prevDocument: any) => ({
        ...prevDocument,
        Language: language,
      }));
    }
  }, [language, props.setDocument]);

  const handleDeselect = () => {
    setLanguage("");
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
            value="English"
            checked={language === "English"}
            onChange={(e) => setLanguage(e.target.value)}
            className="font-size-20"
          />
        </Col>
        <Col xs="auto">
          <Form.Check
            type="radio"
            id="language-swedish"
            label="Swedish"
            name="language"
            value="Swedish"
            checked={language === "Swedish"}
            onChange={(e) => setLanguage(e.target.value)}
            className="font-size-20"
          />
        </Col>
      </Row>
      {language && (
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
