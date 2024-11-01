import { Col, Row, Form, InputGroup } from "react-bootstrap";
import { useState } from "react";
import "../../style.css";

const DocumentDetails = () => {
  const [selectedScale, setSelectedScale] = useState("");
  const [customScale, setCustomScale] = useState("");

  const handleScaleChange = (event: any) => {
    const value = event.target.value;
    setSelectedScale(value);

    // Reset the custom scale if a different scale is selected
    if (value !== "Plan") {
      setCustomScale("");
    }
  };

  return (
    <>
      <Row className="row-box">
        <Form.Label className="black-text">Title *</Form.Label>
        <Form.Control required type="text" placeholder="Title of document" />
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
          placeholder="Enter your description here"
        />
        <Form.Control.Feedback type="invalid">
          Please enter a description
        </Form.Control.Feedback>
      </Row>
      <Row className="row-box">
        <Form.Group as={Col} controlId="formGridDate">
          <Form.Label className="black-text">Date</Form.Label>
          <Form.Control type="date" />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridDocType">
          <Form.Label className="black-text">Document Type *</Form.Label>
          <Form.Select required>
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
            <Form.Select value={selectedScale} onChange={handleScaleChange}>
              <option value="">Select scale</option>
              <option value="Text">Text</option>
              <option value="Concept">Concept</option>
              <option value="Plan">Plan</option>
              <option value="Actions">Blueprints/actions</option>
            </Form.Select>
            {selectedScale === "Plan" && (
              <Form.Control
                type="text"
                placeholder="Enter scale in 1:xxx format"
                value={customScale}
                style={{ width: "60%" }}
                onChange={(e) => setCustomScale(e.target.value)}
                className="mt-0"
              />
            )}
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridPages">
          <Form.Label className="black-text">Pages</Form.Label>
          <Form.Control type="number" placeholder="Number of pages" />
        </Form.Group>
      </Row>
    </>
  );
};

export default DocumentDetails;
