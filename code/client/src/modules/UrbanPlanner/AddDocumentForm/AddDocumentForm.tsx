import { Col, Row, Form, Button, Alert } from "react-bootstrap";
import { useState, FormEvent } from "react";
import DocumentDetails from "./DocumentDetails";
import LanguageSelection from "./LanguageSelection";
import StakeholderSelection from "./StakeholderSelection";
import DateSelection from "./DateSelection";
import NodeType from "./NodeType";
import ScaleSelection from "./ScaleSelection";
import PageSelection from "./PageSelection";
import GeoreferenceTypeSelection from "./GeoreferenceTypeSelection";
import "../../style.css";
import { Props, NewDocument } from "./interfaces/types";
import { useNavigate } from "react-router-dom";
import API from "../../../API/API";
import { useSidebar } from "../../../components/SidebarContext";
import { useToast } from "../../../modules/ToastProvider";
import { FaCheck } from "react-icons/fa";

const AddDocumentForm = (props: Props) => {
  const navigate = useNavigate();
  const { isSidebarOpen } = useSidebar();

  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [validated, setValidated] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // Step tracking

  const showToast = useToast();

  const handleNext = () => setCurrentStep((prevStep) => prevStep + 1);
  const handlePrevious = () => setCurrentStep((prevStep) => prevStep - 1);

  // on submit
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidated(true);
    const form = event.currentTarget as HTMLFormElement;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const document = {
        title: props.document.title.trim(),
        description: props.document.description,
        documentType: props.document.documentType.trim(),
        scale: props.document.scale.trim(),
        nodeType: props.document.nodeType,
        stakeholders: props.document.stakeholders,
        issuanceDate: props.document.issuanceDate,
        language: props.document.language,
        pages: props.document.pages.trim(),
        georeference: props.document.georeference,
      };

      API.addDocument(document).then(() => {
        const newDoc: NewDocument = {
          title: "",
          description: "",
          documentType: "",
          scale: "",
          nodeType: "",
          stakeholders: [],
          issuanceDate: "",
          language: "",
          pages: "",
          georeference: [[]],
        };
        props.setDocument(newDoc);
        setErrorMessage("");
        showToast("Document added successfully!");
        setCurrentStep(3); // Go to the final empty screen after submission
      });
    }
  };

  const handleCancel = () => {
    const resetDoc: NewDocument = {
      title: "",
      description: "",
      documentType: "",
      scale: "",
      nodeType: "",
      stakeholders: [],
      issuanceDate: "",
      language: "",
      pages: "",
      georeference: [[]],
    };

    props.setDocument(resetDoc);
    navigate("/urban-planner");
  };

  // Render function for step circles
  const renderStepCircle = (step: number) => {
    if (currentStep === step) {
      return <div className="step-circle active"></div>;
    } else if (currentStep > step) {
      return (
        <div className="step-circle completed">
          <FaCheck color="white" />
        </div>
      );
    } else {
      return <div className="step-circle"></div>;
    }
  };

  return (
    <div className={`main-page ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <Form
        className="document-form"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        {errorMessage && (
          <Alert
            variant="danger"
            onClose={() => setErrorMessage("")}
            dismissible
          >
            {errorMessage}
          </Alert>
        )}

        <Row className="big-bold-text">New Document</Row>

        {/* Step Indicator Row */}
        <Row className="step-indicator-row">
          <Col className="step-col">
            {renderStepCircle(1)}
            <div className="step-label">
              <span>Step 1</span>
              <br />
              <span className="step-title">Basic info</span>
            </div>
          </Col>
          <Col className="step-col">
            {renderStepCircle(2)}
            <div className="step-label">
              <span>Step 2</span>
              <br />
              <span className="step-title">Add. info</span>
            </div>
          </Col>
          <Col className="step-col">
            {renderStepCircle(3)}
            <div className="step-label">
              <span>Step 3</span>
              <br />
              <span className="step-title">Link Doc</span>
            </div>
          </Col>
        </Row>

        {currentStep === 1 && (
          <>
            <DocumentDetails
              document={props.document}
              setDocument={props.setDocument}
            />
            <Row className="row-box">
              <PageSelection
                document={props.document}
                setDocument={props.setDocument}
              />
              <LanguageSelection
                document={props.document}
                setDocument={props.setDocument}
              />
            </Row>
            <Button onClick={handleCancel} className="button-white mt-3 me-3">
              Cancel
            </Button>
            <Button onClick={handleNext} className="button-blue mt-3">
              Next
            </Button>
          </>
        )}

        {currentStep === 2 && (
          <>
            <Row className="row-box">
              <StakeholderSelection
                document={props.document}
                setDocument={props.setDocument}
              />
            </Row>
            <Row className="row-box">
              <ScaleSelection
                document={props.document}
                setDocument={props.setDocument}
              />
              <NodeType
                document={props.document}
                setDocument={props.setDocument}
              />
            </Row>
            <Row className="row-box">
              <DateSelection
                document={props.document}
                setDocument={props.setDocument}
              />
            </Row>

            <Row className="row-box">
              <GeoreferenceTypeSelection
                document={props.document}
                setDocument={props.setDocument}
              />
            </Row>
            <Button onClick={handlePrevious} className="button-white mt-3 me-3">
              Back
            </Button>
            <Button type="submit" className="button-blue mt-3">
              Submit
            </Button>
          </>
        )}

        {currentStep === 3 && (
          <>
            <Row className="blue-text mt-4">Document added successfully!</Row>
            <Button onClick={() => navigate("/urban-planner")} className="mt-3">
              Back to Dashboard
            </Button>
          </>
        )}
      </Form>
    </div>
  );
};

export default AddDocumentForm;
