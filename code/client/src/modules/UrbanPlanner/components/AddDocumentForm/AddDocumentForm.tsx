import { Col, Row, Form } from "react-bootstrap";
import { useState } from "react";
import DocumentDetails from "./DocumentDetails";
import LanguageSelection from "./LanguageSelection";
import StakeholderSelection from "./StakeholderSelection";
import SubmitCancelButtons from "./SubmitCancelButtons";
import "../../UrbanPlanner.css";

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
          Please enter the details below to successfully add a new document
        </Row>

        {/* Document Details Section */}
        <DocumentDetails />

        {/* Language and Stakeholder Selection Section */}
        <Row className="row-box">
          <Col>
            <LanguageSelection />
          </Col>
          <Col>
            <StakeholderSelection />
          </Col>
        </Row>

        {/* Submit and Cancel Buttons */}
        <SubmitCancelButtons />
      </Form>
    </div>
  );
};

export default AddDocumentForm;
