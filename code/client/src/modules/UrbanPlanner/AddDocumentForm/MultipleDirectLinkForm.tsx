import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useState, useEffect, FormEvent } from "react";
import "../../style.css";
import { useNavigate } from "react-router-dom";
import API from "../../../API/API";
import { useToast } from "../../ToastProvider";
import LinkEntryForm from "./elements/LinkEntryForm";
import Document from "../../../models/document";
import { BsPlus } from "react-icons/bs";

// Define the type for each entry in the linkEntries state
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
  const [documents, setDocuments] = useState<Document[]>([]);
  const [linkEntries, setLinkEntries] = useState<LinkEntry[]>([{ documentId: 0, linkType: [] }]);
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
    setValidatedSecondForm(true);

    // Validation checks for each entry
    const hasErrors = linkEntries.some(
      (entry) => entry.documentId === 0 || entry.linkType.length === 0
    );

    if (hasErrors) {
      setErrorMessage("Please select a document and at least one link type for each entry.");
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
          navigate("/explore-map");
        })
        .catch((error) => {
          console.error(error.error);
          showToast("An error occurred while linking the documents.", error.error, true);
        });
    });
  };

  const handleCancel = () => {
    navigate("/explore-map");
  };

  const handleAddLink = () => {
    setLinkEntries([...linkEntries, { documentId: 0, linkType: [] }]);
  };

  const handleDocumentChange = (index: number, value: number) => {
    const updatedEntries = [...linkEntries];
    updatedEntries[index].documentId = value;
    setLinkEntries(updatedEntries);
  };

  const handleLinkTypeChange = (index: number, value: string[]) => {
    const updatedEntries = [...linkEntries];
    updatedEntries[index].linkType = value;
    setLinkEntries(updatedEntries);
  };

  const handleRemoveLink = (index: number) => {
    const updatedEntries = linkEntries.filter((_, i) => i !== index);
    setLinkEntries(updatedEntries);
  };

  return (
    <>
      <Row className="description-container">
        <span className="step-title">
          Connect one or more documents to the newly created document:{" "}
          {documents.find((doc) => doc.documentId === props.newDocID)?.title}
        </span>
      </Row>
      <Form id="LinkMultipleDocumentForm" onSubmit={handleSubmit} noValidate>
        {errorMessage && (
          <Alert variant="danger" dismissible onClose={() => setErrorMessage("")}>
            {errorMessage}
          </Alert>
        )}

        {linkEntries.map((entry, index) => {
          // Filter available documents for each entry
          const availableDocuments = documents.filter(
            (doc) =>
              doc.documentId !== props.newDocID && // Exclude current document (newDocID)
              !linkEntries.some(
                (link, linkIndex) => linkIndex !== index && link.documentId === doc.documentId
              ) // Exclude already selected documents in other entries
          );

          return (
            <LinkEntryForm
              key={index}
              index={index}
              linkEntry={entry}
              availableDocuments={availableDocuments}
              validatedSecondForm={validatedSecondForm}
              onDocumentChange={handleDocumentChange}
              onLinkTypeChange={handleLinkTypeChange}
              onRemoveLink={handleRemoveLink}
            />
          );
        })}

        {/* Conditionally render the "Add Link" button */}
        {documents.filter(
          (doc) =>
            doc.documentId !== props.newDocID &&
            !linkEntries.some((entry) => entry.documentId === doc.documentId)
        ).length > 0 && (
          <Row className="row-box">
            <Col xs="auto">
              <Button
                variant="primary"
                type="button"
                onClick={handleAddLink}
                className="add-link-button"
              >
                <BsPlus color="white" size={40} />
              </Button>
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
