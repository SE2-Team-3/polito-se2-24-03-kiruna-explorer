import { Col, Row, Form } from "react-bootstrap";
import "../../UrbanPlanner.css";

const DocumentDetails = () => {
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
            <option value="Text">Text</option>
            <option value="Concept">Concept</option>
            <option value="Plan">Plan</option>
            <option value="Blueprints/actions">Blueprints/actions</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Please select a document type
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className=" row-box">
        <Form.Group as={Col} controlId="formGridScale">
          <Form.Label className="black-text">Scale</Form.Label>
          <Form.Select>
            <option value="">Select scale</option>
            <option value="1">1:100,000</option>
            <option value="2">1:10,000</option>
            <option value="3">1:5,000</option>
            <option value="3">1:1,000</option>
          </Form.Select>
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
