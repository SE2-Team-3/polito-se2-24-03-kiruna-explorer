import { Col, Row, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../../../style.css";
import { Props, NewDocument } from "../interfaces/types";

const LanguageSelection = (props: Props) => {
  const [language, setLanguage] = useState(
    props.document ? props.document.language : ""
  );

  useEffect(() => {
    if (props.setDocument) {
      props.setDocument((prevDocument: NewDocument) => ({
        ...prevDocument,
        language: language,
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
        <Col>
          {language && (
            <Button
              variant="primary"
              onClick={handleDeselect}
              className="button-small mt-2"
            >
              Deselect
            </Button>
          )}
        </Col>
      </Row>
    </Form.Group>
  );
};

export default LanguageSelection;
