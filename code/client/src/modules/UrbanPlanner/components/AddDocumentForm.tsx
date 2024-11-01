import { Col, Row, Form, Button } from "react-bootstrap";
import { useState } from "react";
import "../UrbanPlanner.css";

const AddDocumentForm = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div className="main-page">
      <Form
        className="document-form"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <Row className="big-bold-text">New Document</Row>
        <Row className="blue-text">
          Please enter the details below to successfilly add a new document
        </Row>
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
        <Row className=" row-box">
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
              Please select a document
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
        <Row className="row-box">
          <Form.Group as={Col} controlId="formGridLanguage">
            <Form.Label className="black-text">Language</Form.Label>
            <Form.Check
              type="radio"
              id="language-english"
              label="English"
              name="language"
              value="EN"
            />
            <Form.Check
              type="radio"
              id="language-swedish"
              label="Swedish"
              name="language"
              value="SW"
            />
            <Form.Check
              type="radio"
              id="language-unknown"
              label="Unknown"
              name="language"
              value="Unknown"
            />
            <Form.Control.Feedback type="invalid">
              Please select a language.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridSH">
            <Form.Label className="black-text">Stakeholders</Form.Label>
            <Form.Control as="select" multiple>
              <option>LKAB</option>
              <option>Municipalty</option>
              <option>Regional authority</option>
              <option>Architecture firms</option>
              <option>Citizen</option>
              <option>Others</option>
            </Form.Control>
          </Form.Group>
        </Row>
        <Row className=" row-box">
          <Col>
            <Button variant="secondary">Cancel</Button>
            <Button type="submit">Submit</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddDocumentForm;
