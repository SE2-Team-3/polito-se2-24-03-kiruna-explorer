import { Col, Row, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../../style.css";

const NodeType = (props: any) => {
  const [nodeType, setNodeType] = useState(
    props.document ? props.document.NodeType : ""
  );

  useEffect(() => {
    if (props.setDocument) {
      props.setDocument((prevDocument: any) => ({
        ...prevDocument,
        NodeType: nodeType,
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
        <option value="Design">Design document</option>
        <option value="Informative">Informative document</option>
        <option value="Prescriptive">Prescriptive document</option>
        <option value="Technical">Technical document</option>
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
