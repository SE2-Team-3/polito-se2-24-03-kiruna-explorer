import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useState, useEffect, FormEvent } from "react";
import "../../style.css";
import { useNavigate } from "react-router-dom";
import API from "../../../API/API";
import { useToast } from "../../ToastProvider";
import LinkTypeSelection from "./LinkTypeSelection";
import Document from "../../../models/document";

// Define a type for each entry in the linkEntries state
interface LinkEntry {
  documentId: number; // Use documentId for linking existing docs
  linkType: string[]; // Now an array of strings
}

interface MultipleLinkFormProps {
  newDocID: number; // ID of the new document
}

const MultipleLinkForm = (props: MultipleLinkFormProps) => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [validated, setValidated] = useState(false);
  const [currentStep, setCurrentStep] = useState(3);

  // Store fetched documents from the DB
  const [documents, setDocuments] = useState<Document[]>([]);
  const [linkEntries, setLinkEntries] = useState<LinkEntry[]>([]);
  const showToast = useToast();

  useEffect(() => {
    // Fetch documents from the database
    API.getDocuments()
      .then((documents) => setDocuments(documents))
      .catch((err) => setErrorMessage("Error loading documents: " + err));
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidated(true);
    const form = event.currentTarget as HTMLFormElement;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      // Handle linking each selected document with the new document
      linkEntries.forEach((entry) => {
        const linkPromises = entry.linkType.map((type) =>
          API.linkDocuments(props.newDocID, entry.documentId, type)
        );

        // Use Promise.all to send multiple API requests concurrently
        Promise.all(linkPromises)
          .then(() => {
            showToast("Documents linked successfully!", "");
            navigate("/urban-planner");
          })
          .catch((error) => {
            console.error("Error linking documents", error);
            alert("An error occurred while linking the documents.");
          });
      });
    }
  };

  const handleCancel = () => {
    navigate("/urban-planner");
  };

  const handleAddLink = () => {
    // Initialize with an empty array for linkType
    setLinkEntries([...linkEntries, { documentId: 0, linkType: [] }]);
  };

  const handleFieldChange = (
    index: number,
    field: "documentId" | "linkType",
    value: string | number | string[]
  ) => {
    const updatedEntries = [...linkEntries];

    // Type check based on field
    if (field === "documentId") {
      updatedEntries[index].documentId = Number(value);
    } else if (field === "linkType" && Array.isArray(value)) {
      updatedEntries[index].linkType = value;
    }

    setLinkEntries(updatedEntries);
  };

  const handleRemoveLink = (index: number) => {
    const updatedEntries = linkEntries.filter((_, i) => i !== index);
    setLinkEntries(updatedEntries);
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        {errorMessage && (
          <Alert
            variant="danger"
            dismissible
            onClose={() => setErrorMessage("")}
          >
            {errorMessage}
          </Alert>
        )}

        {currentStep === 3 && (
          <>
            {linkEntries.map((entry, index) => (
              <Row key={index} className="row-box">
                {/* Document Selector */}
                <Col md={6} className="mb-3">
                  <Form.Label className="font-size-18">Document</Form.Label>
                  <Form.Select
                    className="font-size-16"
                    value={entry.documentId}
                    onChange={(e) =>
                      handleFieldChange(
                        index,
                        "documentId",
                        parseInt(e.target.value)
                      )
                    }
                  >
                    <option value={0}>Select a document</option>
                    {documents.map((doc) => (
                      <option key={doc.documentId} value={doc.documentId}>
                        {doc.title}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                {/* Link Type Select */}
                <Col md={6} className="mb-3">
                  <LinkTypeSelection
                    linkType={entry.linkType}
                    setLinkType={(selectedLinkTypes) =>
                      handleFieldChange(index, "linkType", selectedLinkTypes)
                    }
                  />
                </Col>

                {/* Remove Link Button */}
                <Col md={12} className="mb-3">
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => handleRemoveLink(index)}
                    className="float-end"
                  >
                    Remove Link
                  </Button>
                </Col>
              </Row>
            ))}

            <Row className="row-box-button">
              <Button
                variant="success"
                type="button"
                onClick={handleAddLink}
                className="float-end"
              >
                Add Link
              </Button>
            </Row>

            <Row className="row-box-button">
              <Button onClick={handleCancel} className="button-white mt-3 me-3">
                Cancel
              </Button>
              <Button type="submit" className="button-blue mt-3">
                Submit
              </Button>
            </Row>
          </>
        )}
      </Form>
    </>
  );
};

export default MultipleLinkForm;
