import { Col, Row, Form, InputGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../../style.css";

const DocumentDetails = (props: any) => {
  const [title, setTitle] = useState(
    props.document ? props.document.Title : ""
  );
  const [description, setDescription] = useState(
    props.document ? props.document.Description : ""
  );
  const [scale, setScale] = useState(
    props.document ? props.document.Scale : ""
  );
  const [nodeType, setNodeType] = useState(
    props.document ? props.document.NodeType : ""
  );
  const [createdAt, setCreatedAt] = useState(
    props.document ? props.document.CreatedAt : ""
  );
  const [pages, setPages] = useState(props.document ? props.document.Pages : 0);

  const [customScale, setCustomScale] = useState("");

  const handleScaleChange = (value: any) => {
    setScale(value);

    // Reset the custom scale if a different scale is selected
    if (value !== "Plan") {
      setCustomScale("");
    }
  };

  useEffect(() => {
    if (props.setDocument) {
      props.setDocument((prevDocument: any) => ({
        ...prevDocument,
        Title: title,
        Description: description,
        Scale: scale === "Plan" ? customScale : scale,
        NodeType: nodeType,
        CreatedAt: createdAt,
        Pages: pages,
      }));
    }
  }, [
    title,
    description,
    scale,
    customScale,
    nodeType,
    createdAt,
    pages,
    props.setDocument,
  ]);

  return (
    <>
      <Row className="row-box">
        <Form.Label className="black-text">Title *</Form.Label>
        <Form.Control
          required
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title of document"
        />
        <Form.Control.Feedback type="invalid">
          Please enter the document title
        </Form.Control.Feedback>
      </Row>
      <Row className="row-box">
        <Form.Label className="black-text">Description *</Form.Label>
        <Form.Control
          required
          as="textarea"
          rows={3}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Enter your description here"
        />
        <Form.Control.Feedback type="invalid">
          Please enter a description
        </Form.Control.Feedback>
      </Row>
      <Row className="row-box">
        <Form.Group as={Col} controlId="formGridDate">
          <Form.Label className="black-text">Date</Form.Label>
          <Form.Control
            type="date"
            value={createdAt}
            onChange={(event) => setCreatedAt(event.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridDocType">
          <Form.Label className="black-text">Document Type *</Form.Label>
          <Form.Select
            required
            value={nodeType}
            onChange={(event) => setNodeType(event.target.value)}
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
      </Row>
      <Row className=" row-box">
        <Form.Group as={Col} controlId="formGridScale">
          <Form.Label className="black-text">Scale</Form.Label>
          <InputGroup>
            {" "}
            <Form.Select
              value={scale}
              onChange={(event) => handleScaleChange(event.target.value)}
            >
              <option value="">Select scale</option>
              <option value="Text">Text</option>
              <option value="Concept">Concept</option>
              <option value="Plan">Plan</option>
              <option value="Actions">Blueprints/actions</option>
            </Form.Select>
            {scale === "Plan" && (
              <Form.Control
                type="text"
                placeholder="Enter scale in 1:xxx format"
                value={customScale}
                style={{ width: "60%" }}
                onChange={(event) => setCustomScale(event.target.value)}
                className="mt-0"
              />
            )}
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridPages">
          <Form.Label className="black-text">Pages</Form.Label>
          <Form.Control
            type="text"
            value={pages}
            onChange={(event) => setPages(event.target.value)}
            placeholder="Number of pages"
          />
        </Form.Group>
      </Row>
    </>
  );
};

export default DocumentDetails;
