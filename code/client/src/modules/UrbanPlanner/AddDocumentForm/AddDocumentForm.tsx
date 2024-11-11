import { Col, Row, Form, Button, Alert } from "react-bootstrap";
import { useState, FormEvent } from "react";
import DocumentDetails from "./DocumentDetails";
import LanguageSelection from "./LanguageSelection";
import StakeholderSelection from "./StakeholderSelection";
import DateSelection from "./DateSelection";
import NodeType from "./NodeType";
import ScaleSelection from "./ScaleSelection";
import PageSelection from "./PageSelection";
import GeoreferenceSelection from "./GeoreferenceSelection";
import GeoreferenceTypeSelection from "./GeoreferenceTypeSelection";
import "../../style.css";
import { Props, NewDocument } from "./interfaces/types";
import { useNavigate } from "react-router-dom";
import API from "../../../API/API";
import { useSidebar } from "../../../components/SidebarContext";

const AddDocumentForm = (props: Props) => {
  const navigate = useNavigate();
  const { isSidebarOpen } = useSidebar();

  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [validated, setValidated] = useState(false);

  //on submit
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
        // Reset document state
        const newDoc: NewDocument = {
          title: "",
          description: "",
          documentType: "", // same thing as scale
          scale: "",
          nodeType: "",
          stakeholders: [],
          issuanceDate: "",
          language: "",
          pages: "",
          georeference: [[]],
        };
        props.setDocument(newDoc);
        navigate("/urban-planner");
        setErrorMessage("");
      });
      /*
        .catch((error) => {
          console.error("Error adding document:", error);
          setErrorMessage(
            "An error has occurred while trying to register the document."
          );
      })*/
    }
  };

  const handleCancel = () => {
    const resetDoc: NewDocument = {
      title: "",
      description: "",
      documentType: "", //same thing as scale
      scale: "",
      nodeType: "",
      stakeholders: [],
      issuanceDate: "",
      language: "",
      pages: "",
      georeference: [[]],
    };

    props.setDocument(resetDoc);
    navigate("/urban-planner"); // Redirect to /urban-planner
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
        <Row className="blue-text">
          Please enter the details below to successfully add a new document
        </Row>

        {/* Document Details Section */}
        <DocumentDetails
          document={props.document}
          setDocument={props.setDocument}
        />

        {/* Field: scale - nodetype */}
        <Row className=" row-box">
          <ScaleSelection
            document={props.document}
            setDocument={props.setDocument}
          />
          <NodeType document={props.document} setDocument={props.setDocument} />
        </Row>

        {/* Field: date - pages - languages */}
        <Row className="row-box">
          <DateSelection
            document={props.document}
            setDocument={props.setDocument}
          />
          <PageSelection
            document={props.document}
            setDocument={props.setDocument}
          />
          <LanguageSelection
            document={props.document}
            setDocument={props.setDocument}
          />
        </Row>

        {/* Field - georeference and Stakeholder */}
        <Row className="row-box">
        
          <Col>
            <GeoreferenceTypeSelection
              document={props.document}
              setDocument={props.setDocument}
            />
            {/*<GeoreferenceSelection
              document={props.document}
              setDocument={props.setDocument}
            />*/}
          </Col>
          
          <StakeholderSelection
            document={props.document}
            setDocument={props.setDocument}
          />
        </Row>

        {/* Submit and Cancel Buttons */}
        <Row className="row-box">
          <Col className="col-box">
            <Button type="submit" className="button-white float-end ms-2">
              Submit
            </Button>
            <Button
              variant="primary"
              className="button-white float-end"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddDocumentForm;
