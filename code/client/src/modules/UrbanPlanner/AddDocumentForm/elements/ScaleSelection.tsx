import { Col, Form, InputGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../../../style.css";
import { Props, NewDocument } from "../interfaces/types";

const ScaleSelection = (props: Props) => {
  const [documentType, setDocumentType] = useState(
    props.document ? props.document.documentType : ""
  );
  const [scale, setScale] = useState(
    props.document ? props.document.scale : ""
  );

  const handleTypeChange = (value: string) => {
    setDocumentType(value);
    setScale(value === "Plan" ? "" : value);
  };

  const handleScaleChange = (value: string) => {
    // Concatenate "1:" to the value which is a number and then set it
    if (value) {
      setScale(`1:${value}`);
    } else {
      setScale(""); // Reset if input is empty
    }
  };

  useEffect(() => {
    if (props.setDocument) {
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
          style={{ width: "50%" }}
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
          <>
            <Form.Control
              type="text"
              placeholder="1:"
              value="1:"
              disabled
              style={{ width: "15%", textAlign: "right" }}
              className="mt-0 font-size-20"
            />

            <Form.Control
              required
              type="number"
              placeholder="XXXX"
              value={scale ? scale.split(":")[1] : ""}
              onChange={(event) => handleScaleChange(event.target.value)}
              className="mt-0 font-size-20"
              style={{ width: "30%", textAlign: "left" }}
            />
          </>
        )}
      </InputGroup>
    </Form.Group>
  );
};

export default ScaleSelection;
