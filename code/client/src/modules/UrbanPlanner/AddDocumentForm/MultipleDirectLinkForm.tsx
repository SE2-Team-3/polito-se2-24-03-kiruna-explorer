import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useState, useEffect, FormEvent } from "react";
import "../../style.css";
import { useNavigate } from "react-router-dom";
import API from "../../../API/API";
import { useToast } from "../../ToastProvider";
import LinkTypeSelection from "./LinkTypeSelection";
import Document from "../../../models/document";
import { BsTrash, BsPlus } from "react-icons/bs";

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
  const [validatedSecondForm, setValidatedSecondForm] = useState(false); // Add validatedSecondForm state

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
    setValidated(true); // Mark the first form as validated
    setValidatedSecondForm(true); // Mark the second form as validated

    const form = event.currentTarget;

    // Validation checks for each entry
    const hasErrors = linkEntries.some(
      (entry) => entry.documentId === 0 || entry.linkType.length === 0
    );

    if (hasErrors) {
      setErrorMessage(
        "Please select a document and at least one link type for each entry."
      );
      return;
    }

    // Proceed with submitting if no errors
    linkEntries.forEach((entry) => {
      const linkPromises = entry.linkType.map((type) =>
        API.linkDocuments(props.newDocID, entry.documentId, type)
      );

      // Use Promise.all to send multiple API requests concurrently
      Promise.all(linkPromises)
        .then(() => {
          showToast("Documents linked successfully!", "", false);
          navigate("/urban-planner");
        })
        .catch((error) => {
          console.error(error.error);
          showToast(
            "An error occurred while linking the documents.",
            error.error,
            true
          );
        });
    });
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
      <Form id="LinkMultipleDocumentForm" onSubmit={handleSubmit} noValidate>
        {errorMessage && (
          <Alert
            variant="danger"
            dismissible
            onClose={() => setErrorMessage("")}
          >
            {errorMessage}
          </Alert>
        )}

        {linkEntries.map((entry, index) => {
          // Filter available documents for each entry
          const availableDocuments = documents.filter(
            (doc) =>
              doc.documentId !== props.newDocID && // Exclude current document (newDocID)
              !linkEntries.some(
                (link, linkIndex) =>
                  linkIndex !== index && link.documentId === doc.documentId
              ) // Exclude already selected documents in other entries
          );

          return (
            <Row key={index} className="row-box-custom">
              {/* Document Selector */}
              <Col md={6} className="mb-3">
                <Form.Label className="font-size-18">Document</Form.Label>
                <Form.Select
                  className={`font-size-16 ${
                    entry.documentId === 0 && validatedSecondForm
                      ? "is-invalid"
                      : ""
                  }`}
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
                  {availableDocuments.map((doc) => (
                    <option key={doc.documentId} value={doc.documentId}>
                      {doc.title}
                    </option>
                  ))}
                </Form.Select>
                {entry.documentId === 0 && validatedSecondForm && (
                  <Form.Control.Feedback type="invalid">
                    Please select a document.
                  </Form.Control.Feedback>
                )}
              </Col>

              {/* Link Type Select */}
              <Col md={6} className="mb-3">
                <LinkTypeSelection
                  linkType={entry.linkType}
                  setLinkType={(selectedLinkTypes) =>
                    handleFieldChange(index, "linkType", selectedLinkTypes)
                  }
                  validated={validatedSecondForm} // Pass validated flag here
                />
                {/* Display error if linkType is empty and form has been validated */}
                {entry.linkType.length === 0 && validatedSecondForm && (
                  <Form.Control.Feedback type="invalid">
                    Please select at least one link type.
                  </Form.Control.Feedback>
                )}
              </Col>

              {/* Remove Link Button */}
              <Col md={12} className="mb-3">
                <BsTrash
                  size={20}
                  type="button"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleRemoveLink(index)}
                  className="text-danger float-end"
                ></BsTrash>
              </Col>
            </Row>
          );
        })}

        {/* Conditionally render the "Add Link" button */}
        {documents.filter(
          (doc) =>
            doc.documentId !== props.newDocID &&
            !linkEntries.some((entry) => entry.documentId === doc.documentId)
        ).length > 0 && (
          <Row className="row-box-button">
            <Col xs="auto">
              <Button
                variant="primary"
                type="button"
                onClick={handleAddLink}
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  padding: 0,
                  backgroundColor: "#3b5998", // Adjust color as needed
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)", // Optional shadow
                }}
              >
                <BsPlus color="white" size={40} />
              </Button>
            </Col>
            <Col>
              <span className="font-size-18"></span>
            </Col>
          </Row>
        )}

        <Row className="row-box-button">
          <Button onClick={handleCancel} className="button-white mt-3 me-3">
            Cancel
          </Button>
          <Button type="submit" className="button-blue mt-3">
            Submit
          </Button>
        </Row>
      </Form>
    </>
  );
};

export default MultipleLinkForm;
