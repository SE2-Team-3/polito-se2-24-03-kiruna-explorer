import { useParams } from "react-router-dom";
import { useSidebar } from "../../components/SidebarContext";
import { Row, Col } from "react-bootstrap";
import API from "../../API/API";
import { useEffect, useState } from "react";
import Document from "../../models/document";
import Connection from "../../models/Connection";

const DocumentDetails = () => {
  const { isSidebarOpen } = useSidebar();
  const { documentId } = useParams();
  const [document, setDocument] = useState<Document>();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]); // Set initial state as an empty array

  const docId = Number(documentId);

  useEffect(() => {
    API.getDocumentById(docId).then((doc) => setDocument(doc));
    API.getConnections().then((con) => {
      const documentConnections = con.filter((c) => c.documentId1 === docId);
      setConnections(documentConnections); // Set connections or empty array
    });
    API.getDocuments().then((docs) => {
      setDocuments(docs);
    });

    const dummyDocument: Document = {
      documentId: docId,
      title: "Document Test",
      description: "This is a sample document with test data.",
      documentType: "Agreement",
      scale: "1:1000",
      nodeType: "Document",
      stakeholders: ["Klab", "Company B", "Organization C"],
      issuanceDate: "2024-10-10",
      language: "English",
      pages: "12",
      georeferenceId: 1,
      coordinates: "15, 113",
    };

    const dummyConnections: Connection[] = [
      {
        documentId1: docId,
        documentId2: 2,
        connection: "reference",
      },
      {
        documentId1: docId,
        documentId2: 3,
        connection: "appendix",
      },
      {
        documentId1: docId,
        documentId2: 4,
        connection: "citation",
      },
    ];

    setDocument(dummyDocument);
    setConnections(dummyConnections);
  }, [docId]);

  return (
    <div className={`document-wrapper ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <div className="form-container">
        <Row>
          <strong>{document?.title}</strong>
        </Row>
        <Row>
          <Col>
            <i className="bi bi-calendar4"></i>
            <span>{document?.issuanceDate}</span>
          </Col>
          <Col>
            <i className="bi bi-file-earmark"></i>
            <span>{document?.documentType}</span>
          </Col>
          <Col>
            <i className="bi bi-geo-alt"></i>
            <span>{document?.georeferenceId}</span>
          </Col>
        </Row>
        <Row>
          <strong>Description</strong>
          <span>{document?.description}</span>
        </Row>
        <Row>
          <Col>
            <strong>Language:</strong>
            <span>{document?.language}</span>
          </Col>
          <Col>
            <strong>Pages:</strong>
            <span>{document?.pages}</span>
          </Col>
          <Col>
            <strong>Scale:</strong>
            <span>{document?.scale}</span>
          </Col>
        </Row>
        <Row>
          <Col className="linked-documents">
            <strong>Linked Documents</strong>
            <ul>
              {connections && connections.length > 0 ? (
                connections.map((connection, index) => {
                  const linkedDoc = documents.find(
                    (doc) => doc.documentId === connection.documentId2
                  );
                  return (
                    <li key={index}>
                      {linkedDoc
                        ? linkedDoc.title
                        : `Document ID: ${connection.documentId2}`}{" "}
                      - {connection.connection}
                    </li>
                  );
                })
              ) : (
                <li>No linked documents found.</li>
              )}
            </ul>
          </Col>
          <Col className="resources">
            <strong>Resources</strong>
            <ul>
              <li>Document_name_01.pdf</li>
              <li>Document_name_02.pdf</li>
              <li>Document_name_03.pdf</li>
              <li>Document_name_04.pdf</li>
              <li>Document_name_05.pdf</li>
            </ul>
          </Col>
          <Col className="stakeholders">
            <strong>Stakeholders</strong>
            <strong>Stakeholders</strong>
            <ul>
              {document?.stakeholders.map((stakeholder, index) => (
                <li key={index}>{stakeholder}</li>
              ))}
            </ul>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DocumentDetails;
