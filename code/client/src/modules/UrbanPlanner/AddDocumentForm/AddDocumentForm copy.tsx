import { Col, Row, Form, Button } from "react-bootstrap";
import { useState } from "react";
import "../../style.css";

const AddDocumentForm = () => {
  /**
   * VALIDATION
   */
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  /**
   * HANDLE LANGUAGE SELECTION
   */
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const handleDeselect = () => {
    setSelectedLanguage("");
  };

  /**
   * HANDLE STAKEHOLDERS MULTI SELECTION
   */
  const [selectedStakeholders, setSelectedStakeholders] = useState([""]);

  const stakeholders = [
    "LKAB",
    "Municipality",
    "Regional authority",
    "Architecture firms",
    "Citizen",
    "Others",
  ];

  const handleCheckboxChange = (event: any) => {
    const { value, checked } = event.target;
    if (checked) {
      // Add the checked stakeholder to the selected list
      setSelectedStakeholders([...selectedStakeholders, value]);
    } else {
      // Remove the unchecked stakeholder from the selected list
      setSelectedStakeholders(
        selectedStakeholders.filter((stakeholder) => stakeholder !== value)
      );
    }
  };

  /**
   * FORM
   */
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
            <Row>
              <Col xs="auto">
                <Form.Check
                  type="radio"
                  id="language-english"
                  label="English"
                  name="language"
                  value="EN"
                  className="form-check-large"
                  checked={selectedLanguage === "EN"}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                />
              </Col>
              <Col xs="auto">
                <Form.Check
                  type="radio"
                  id="language-swedish"
                  label="Swedish"
                  name="language"
                  value="SW"
                  className="form-check-large"
                  checked={selectedLanguage === "SW"}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                />
              </Col>
            </Row>
            <Button
              variant="primary"
              onClick={handleDeselect}
              className="button-small"
            >
              Deselect
            </Button>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridSH">
            <Form.Label className="black-text">Stakeholders</Form.Label>
            <Row>
              {stakeholders.map((stakeholder, index) => (
                <Col xs={6} key={index}>
                  <Form.Check
                    type="checkbox"
                    label={stakeholder}
                    value={stakeholder}
                    checked={selectedStakeholders.includes(stakeholder)}
                    onChange={handleCheckboxChange}
                    className="form-check-large"
                  />
                </Col>
              ))}
            </Row>{" "}
          </Form.Group>
        </Row>
        <Row className="row-box">
          <Col className="col-box"></Col>
          <Col className="col-box">
            <Button type="submit" className="button-white float-end ms-2">
              Submit
            </Button>
            <Button variant="primary" className="button-white float-end">
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddDocumentForm;
