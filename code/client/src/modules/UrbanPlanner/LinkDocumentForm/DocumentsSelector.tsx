import { Form, Row } from "react-bootstrap";
import Document from "../../../models/document";

export default function DocumentSelector(props: any) {
  const { documents, selectedDocument1, selectedDocument2, setSelectedDocument1, setSelectedDocument2 } = props;

  return (
    <>
      <Row className="row-box">
        <Form.Label className="black-text">Document 1 *</Form.Label>
        <Form.Select
          required
          className="font-size-20"
          onChange={(event) => {
            setSelectedDocument1(event.target.value);
          }}
        >
          <option value="">Select document</option>
          {documents
            .filter((document: Document) => document.documentId != selectedDocument2)
            .map((document: Document) => (
              <option key={document.documentId} value={document.documentId}>
                {document.title}
              </option>
            ))}
        </Form.Select>
      </Row>
      <Row className="row-box">
        <Form.Label className="black-text">Document 2 *</Form.Label>
        <Form.Select
          required
          className="font-size-20"
          onChange={(event) => {
            setSelectedDocument2(event.target.value);
          }}
        >
          <option value="">Select document</option>
          {documents
            .filter((document: Document) => document.documentId != selectedDocument1)
            .map((document: Document) => (
              <option key={document.documentId} value={document.documentId}>
                {document.title}
              </option>
            ))}
        </Form.Select>
      </Row>
    </>
  );
}
