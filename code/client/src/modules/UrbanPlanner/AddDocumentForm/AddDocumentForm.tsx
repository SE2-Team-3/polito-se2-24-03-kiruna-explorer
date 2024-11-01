import { Col, Row, Form } from "react-bootstrap";
import { useState } from "react";
import DocumentDetails from "./DocumentDetails";
import LanguageSelection from "./LanguageSelection";
import StakeholderSelection from "./StakeholderSelection";
import SubmitCancelButtons from "./SubmitCancelButtons";
import "../../style.css";
import { Props } from "../../../interfaces/types";
import { useNavigate } from "react-router-dom";
import API from "../../../API/API";

const AddDocumentForm = (props: Props) => {
  const navigate = useNavigate();

  /**
   * VALIDATION
   */
  const [validated, setValidated] = useState(false);

  //on submit
  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    const document = {
      Title: props.document.Title.trim(),
      Description: props.document.Description.trim(),
      DocumentType: props.document.DocumentType.trim(),
      Scale: props.document.DocumentType.trim(),
      NodeType: props.document.NodeType,
      Stakeholders: props.document.Stakeholders,
      CreatedAt: props.document.CreatedAt,
      Language: props.document.Language,
      Pages: props.document.Pages.trim(),
      Georeference: props.document.Georeference,
    };

    console.log(document);

    if (validated) {
      API.addDocument(document);
      navigate("/urban-planner");
    }
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
        <DocumentDetails
          document={props.document}
          setDocument={props.setDocument}
        />

        {/* Language and Stakeholder Selection Section */}
        <Row className="row-box">
          <Col>
            <LanguageSelection
              document={props.document}
              setDocument={props.setDocument}
            />
          </Col>
          <Col>
            <StakeholderSelection
              document={props.document}
              setDocument={props.setDocument}
            />
          </Col>
        </Row>

        {/* Submit and Cancel Buttons */}
        <SubmitCancelButtons />
      </Form>
    </div>
  );
};

export default AddDocumentForm;
