import { Col, Form, InputGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../../style.css";
import { Props, NewDocument } from "../../../interfaces/types";

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
          onChange={(event) => handleTypeChange(event.target.value)}
          className="font-size-20"
        >
          <option value="">Select scale</option>
          <option value="Text">Text</option>
          <option value="Concept">Concept</option>
          <option value="Plan">Plan</option>
          <option value="Actions">Blueprints/actions</option>
        </Form.Select>
        {documentType === "Plan" && (
          <Form.Control
            required
            type="text"
            placeholder="Enter scale in 1:xxx format"
            value={scale}
            style={{ width: "60%" }}
            onChange={(event) => setScale(event.target.value)}
            className="mt-0 font-size-20"
          />
        )}
      </InputGroup>
    </Form.Group>
  );
};

export default ScaleSelection;
