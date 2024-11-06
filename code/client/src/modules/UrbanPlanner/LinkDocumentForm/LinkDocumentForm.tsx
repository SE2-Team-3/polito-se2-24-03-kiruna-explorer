import { FormEvent, useEffect, useState } from "react";
import Document from "../../../models/document";
import API from "../../../API/API";
import { Button, Col, Form, Row } from "react-bootstrap";
import DocumentSelector from "./DocumentsSelector";
import LinkTypeSelector from "./LinkTypeSelector";
import { useNavigate } from "react-router-dom";

export default function LinkDocumentForm() {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocument1, setSelectedDocument1] = useState<number | null>();
  const [selectedDocument2, setSelectedDocument2] = useState<number | null>();
  const [linkType, setLinkType] = useState<string>("");

  useEffect(() => {
    API.getDocuments().then((documents) => setDocuments(documents));
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedDocument1 && selectedDocument2 && selectedDocument1 !== selectedDocument2) {
      API.linkDocuments(selectedDocument1, selectedDocument2, linkType).then(() => {
        setSelectedDocument1(null);
        setSelectedDocument2(null);
        navigate("/urban-planner");
      });
    } else if (selectedDocument1 && selectedDocument2 && selectedDocument1 === selectedDocument2) {
      alert("Please select two different documents to link");
    } else if (!selectedDocument1 || !selectedDocument2) {
      alert("Please select two documents to link");
    }
  };

  const handleCancel = () => {
    setSelectedDocument1(null);
    setSelectedDocument2(null);
    navigate("/urban-planner");
  };

  return (
    <div className="main-page">
      <Form className="document-form" onSubmit={handleSubmit} noValidate>
        <Row className="big-bold-text">Link Documents</Row>
        <DocumentSelector
          documents={documents}
          setSelectedDocument1={setSelectedDocument1}
          setSelectedDocument2={setSelectedDocument2}
        />
        <LinkTypeSelector linkType={linkType} setLinkType={setLinkType} />
        <Row className="row-box">
          <Col className="col-box">
            <Button type="submit" className="button-white float-end ms-2">
              Submit
            </Button>
            <Button variant="primary" className="button-white float-end" onClick={handleCancel}>
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
