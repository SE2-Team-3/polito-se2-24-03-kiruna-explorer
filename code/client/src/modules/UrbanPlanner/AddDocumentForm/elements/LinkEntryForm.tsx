import { Row, Col, Form } from "react-bootstrap";
import LinkTypeSelection from "./LinkTypeSelection";
import { BsTrash } from "react-icons/bs";

// Define the props for the LinkEntryForm component
interface LinkEntryFormProps {
  index: number;
  linkEntry: { documentId: number; linkType: string[] };
  availableDocuments: any[]; // Define the type of availableDocuments
  validatedSecondForm: boolean;
  onDocumentChange: (index: number, value: number) => void;
  onLinkTypeChange: (index: number, value: string[]) => void;
  onRemoveLink: (index: number) => void;
}

const LinkEntryForm = ({
  index,
  linkEntry,
  availableDocuments,
  validatedSecondForm,
  onDocumentChange,
  onLinkTypeChange,
  onRemoveLink,
}: LinkEntryFormProps) => (
  <Row className="row-box-custom">
    {/* Document Selector */}
    <Col md={5} className="mb-3">
      <Form.Label className="font-size-18">Document</Form.Label>
      <Form.Select
        className={`font-size-16 ${
          linkEntry.documentId === 0 && validatedSecondForm ? "is-invalid" : ""
        }`}
        value={linkEntry.documentId}
        onChange={(e) => onDocumentChange(index, parseInt(e.target.value))}
      >
        <option value={0}>Select a document</option>
        {availableDocuments.map((doc) => (
          <option key={doc.documentId} value={doc.documentId}>
            {doc.title}
          </option>
        ))}
      </Form.Select>
      {linkEntry.documentId === 0 && validatedSecondForm && (
        <Form.Control.Feedback type="invalid">
          Please select a document.
        </Form.Control.Feedback>
      )}
    </Col>

    {/* Link Type Select */}
    <Col md={6} className="mb-3">
      <LinkTypeSelection
        linkType={linkEntry.linkType}
        setLinkType={(selectedLinkTypes) =>
          onLinkTypeChange(index, selectedLinkTypes)
        }
        validated={validatedSecondForm}
      />
      {linkEntry.linkType.length === 0 && validatedSecondForm && (
        <Form.Control.Feedback type="invalid">
          Please select at least one link type.
        </Form.Control.Feedback>
      )}
    </Col>

    {/* Remove Link Button */}
    <Col md={1} className="mb-3">
      <BsTrash
        size={30}
        type="button"
        style={{ cursor: "pointer" }}
        onClick={() => onRemoveLink(index)}
        className="remove-link-button"
      />
    </Col>
  </Row>
);

export default LinkEntryForm;
