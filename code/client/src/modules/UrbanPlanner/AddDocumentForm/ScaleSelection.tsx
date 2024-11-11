import { Col, Form, InputGroup, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../../style.css";
import { Props, NewDocument } from "./interfaces/types";

const ScaleSelection = (props: Props) => {
  const [documentType, setDocumentType] = useState(
    props.document ? props.document.documentType : ""
  );
  const [scale, setScale] = useState(
    props.document ? props.document.scale : ""
  );
  const [scaleError, setScaleError] = useState("");

  const handleTypeChange = (value: string) => {
    setDocumentType(value);
    setScale(value === "Plan" ? "" : value);
  };

  const validateScale = (scaleValue: string) => {
    if (scaleValue === "") {
      setScaleError("");
      return true;
    }
    const scaleRegex = /^1:\d+$/;
    if (!scaleRegex.test(scaleValue) && documentType === "Plan") {
      setScaleError(
        "Scale must be in the format '1:x' where x is a positive number."
      );
      return false;
    }
    setScaleError("");
    return true;
  };

  const handleScaleChange = (value: string) => {
    setScale(value);
    validateScale(value);
  };

  useEffect(() => {
    if (props.setDocument && validateScale(scale)) {
      props.setDocument((prevDocument: NewDocument) => ({
        ...prevDocument,
        documentType: documentType,
        scale: scale,
      }));
    }
  }, [documentType, scale, props.setDocument]);

  return (
    <Form.Group as={Col} controlId="formGridScale">
      <Form.Label className="black-text">Scale *</Form.Label>
      <InputGroup>
        <Form.Select
          required
          value={documentType}
          onChange={(event) => handleTypeChange(event.target.value)}
          className="font-size-20"
        >
          <option value="">Select scale</option>
          <option value="Text">Text</option>
          <option value="Concept">Concept</option>
          <option value="Plan">Architectural plan</option>
          <option value="Actions">Blueprints/actions</option>
        </Form.Select>
        {documentType === "Plan" && (
          <Form.Control
            required
            type="text"
            placeholder="1:XXXX"
            value={scale}
            style={{ width: "10%" }}
            onChange={(event) => handleScaleChange(event.target.value)}
            className="mt-0 font-size-20"
            isInvalid={!!scaleError}
          />
        )}
        {scaleError && (
          <Alert variant="danger" className="my-2">
            {scaleError}
          </Alert>
        )}
      </InputGroup>
    </Form.Group>
  );
};

export default ScaleSelection;
