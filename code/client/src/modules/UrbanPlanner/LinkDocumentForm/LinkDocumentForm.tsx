import { FormEvent, useEffect, useState } from "react";
import Document from "../../../models/document";
import API from "../../../API/API";
import { Button, Col, Form, Row } from "react-bootstrap";
import DocumentSelector from "./elements/DocumentsSelector";
import LinkTypeSelector from "./elements/LinkTypeSelector";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../ToastProvider";
import "../../style.css";

export default function LinkDocumentForm() {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocument1, setSelectedDocument1] = useState<number | null>();
  const [selectedDocument2, setSelectedDocument2] = useState<number | null>();
  const [linkType, setLinkType] = useState<string[]>([]);

  const showToast = useToast();

  useEffect(() => {
    API.getDocuments().then((documents) => setDocuments(documents));
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check if linkType is empty
    if (linkType.length === 0) {
      showToast("Please select at least one link type.", "", true);

      return;
    }

    // Check if both documents are selected
    if (!selectedDocument1 || !selectedDocument2) {
      showToast("Please select two documents to link.", "", true);
      return;
    }

    // Ensure the documents are different
    if (selectedDocument1 === selectedDocument2) {
      showToast("Please select two different documents to link.", "", true);
      return;
    }

    // Create API call promises for each link type

    const linkPromises = linkType.map((type) => {
      return API.linkDocuments(selectedDocument1, selectedDocument2, type);
    });

    // Use Promise.all to send multiple API requests concurrently
    Promise.all(linkPromises)
      .then(() => {
        // Reset the form and show success message
        resetForm();
        showToast("Documents linked successfully!", "", false);
        navigate("/urban-planner");
      })
      .catch((error) => {
        //console.error("Error linking documents", error);
        alert("An error occurred while linking the documents.");
      });
  };

  const handleCancel = () => {
    resetForm();
    navigate("/urban-planner");
  };

  const resetForm = () => {
    setSelectedDocument1(null);
    setSelectedDocument2(null);
    setLinkType([]);
  };

  return (
    <div className="main-page">
      <div className="form-container">
        <Form className="document-form" onSubmit={handleSubmit} noValidate>
          <Row className="form-title">Link Documents</Row>
          <DocumentSelector
            documents={documents}
            selectedDocument1={selectedDocument1}
            selectedDocument2={selectedDocument2}
            setSelectedDocument1={setSelectedDocument1}
            setSelectedDocument2={setSelectedDocument2}
          />
          <LinkTypeSelector linkType={linkType} setLinkType={setLinkType} />
          <Row className="row-box">
            <Col className="col-box">
              <Button
                type="submit"
                className="button-blue ms-3 btn btn-primary float-end"
              >
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
    </div>
  );
}
