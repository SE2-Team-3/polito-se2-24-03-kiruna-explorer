import { useParams } from "react-router-dom";
import { useSidebar } from "../../components/SidebarContext";
import { Row, Col, Button } from "react-bootstrap";
import API from "../../API/API";
import { useEffect, useState } from "react";
import Document from "../../models/document";
import Connection from "../../models/Connection";
import Resource from "../../models/resource";
import Flag from "react-world-flags";
import { useNavigate } from "react-router-dom";
import LinkDocument from "../../assets/icons/link selected.svg";
import UploadDocument from "../../assets/icons/upload.svg";
import Scale from "../../assets/icons/scale.svg";
import Language from "../../assets/icons/language.svg";
import PointLocation from "../../assets/icons/point location.svg";
import DocumentType from "../../assets/icons/document type.svg";
import Calendar from "../../assets/icons/date.svg";
import PersonBlue from "../../assets/icons/person blue.svg";
import Book from "../../assets/icons/book.svg";

const DocumentDetails = () => {
  const { isSidebarOpen } = useSidebar();
  const { documentId } = useParams();
  const [document, setDocument] = useState<Document>();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const navigate = useNavigate();

  const docId = Number(documentId);

  useEffect(() => {
    //API.getDocumentById(docId).then((doc) => setDocument(doc));
    API.getConnections().then((con) => {
      const documentConnections = con.filter((c) => c.documentId1 === docId);
      setConnections(documentConnections); // Set connections or empty array
    });
    API.getDocuments().then((docs) => {
      setDocuments(docs);
    });
    API.getResources(docId).then((res) => {
      setResources(res);
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

    setDocument(dummyDocument);
  }, [docId]);

  return (
    <div className={`document-wrapper ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <div className="form-container">
        <Row>
          <strong>{document?.title}</strong>
        </Row>
        <Row>
          <Col>
            <img src={Calendar} alt="calendar" />
            <span>{document?.issuanceDate}</span>
          </Col>
          <Col>
            <img src={DocumentType} alt="document type" />
            <span>{document?.documentType}</span>
          </Col>
          <Col>
            <img src={PointLocation} alt="point location" />
            <span>{document?.georeferenceId}</span>
          </Col>
        </Row>
        <Row>
          <strong>Description</strong>
          <span>{document?.description}</span>
        </Row>
        <Row>
          <Col>
            <img src={Language} alt="language" />
            <strong>Language</strong>
            {document?.language === "English" ? (
              <Flag code="GB" style={{ width: "40px", height: "30px" }} />
            ) : (
              <Flag code="SE" style={{ width: "40px", height: "30px" }} />
            )}
            <span>{document?.language}</span>
          </Col>
          <Col>
            <img src={Book} alt="book" />
            <strong>Pages</strong>
            <span>{document?.pages}</span>
          </Col>
          <Col>
            <img src={Scale} alt="scale" />
            <strong>Scale</strong>
            <span>{document?.scale}</span>
          </Col>
        </Row>
        <Row>
          <Col className="linked-documents">
            <img src={LinkDocument} alt="link document" />
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
            <img src={UploadDocument} alt="upload resource" />
            <strong>Resources</strong>
            <ul>
              {resources && resources.length > 0 ? (
                resources.map((resource, index) => (
                  <li key={index}>
                    {resource.fileName} ({resource.fileType})
                  </li>
                ))
              ) : (
                <li>No resources found.</li>
              )}
            </ul>
          </Col>
          <Col className="stakeholders">
            <img src={PersonBlue} alt="person" />
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
