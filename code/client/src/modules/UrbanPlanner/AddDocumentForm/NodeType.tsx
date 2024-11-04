import { Col, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../../style.css";
import { Props, NewDocument } from "./interfaces/types";

const NodeType = (props: Props) => {
  const [nodeType, setNodeType] = useState(
    props.document ? props.document.nodeType : ""
  );

  useEffect(() => {
    if (props.setDocument) {
      props.setDocument((prevDocument: NewDocument) => ({
        ...prevDocument,
        nodeType: nodeType,
      }));
    }
  }, [nodeType, props.setDocument]);

  return (
    <Form.Group as={Col} controlId="formGridDocType">
      <Form.Label className="black-text">Document Type *</Form.Label>
      <Form.Select
        required
        value={nodeType}
        onChange={(event) => setNodeType(event.target.value)}
        className="font-size-20"
      >
        <option value="">Select document type</option>
        <option value="Design document">Design document</option>
        <option value="Informative document">Informative document</option>
        <option value="Prescriptive document">Prescriptive document</option>
        <option value="Technical document">Technical document</option>
        <option value="Agreement">Agreement</option>
        <option value="Conflict">Conflict</option>
        <option value="Consultation">Consultation</option>
        <option value="Action">Action</option>
      </Form.Select>
      <Form.Control.Feedback type="invalid">
        Please select a document type
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default NodeType;
