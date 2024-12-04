import { useParams } from "react-router-dom";
import { useSidebar } from "../../components/SidebarContext";
import { Row, Col } from "react-bootstrap";
import API from "../../API/API";
import { useEffect, useState } from "react";
import DocumentDetail from "../../models/documentDetail";
import Flag from "react-world-flags";
import LinkDocument from "../../assets/icons/link selected.svg";
import UploadDocument from "../../assets/icons/upload.svg";
import Scale from "../../assets/icons/scale.svg";
import Language from "../../assets/icons/language.svg";
import MiniMapDetail from "./Map/MiniMapDetail";
import DocumentType from "../../assets/icons/document type.svg";
import Calendar from "../../assets/icons/date.svg";
import PersonBlue from "../../assets/icons/person blue.svg";
import Book from "../../assets/icons/book.svg";

const DocumentDetails = () => {
  const { isSidebarOpen } = useSidebar();
  const { documentId } = useParams();
  const [document, setDocument] = useState<DocumentDetail>();

  const docId = Number(documentId);

  useEffect(() => {
    API.getDocumentById(docId).then((doc) => setDocument(doc));
  }, [docId]);
  return (
    <div className={`document-wrapper ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <div className="form-container">
        <Row className="blue-text">
          <strong>{document?.title}</strong>
        </Row>
        <Row>
          <Col>
            <Row className="title-container">
              <Col md={4} className="field-box">
                <img src={Calendar} alt="calendar" width={20} height={20} />
                <span style={{ fontSize: "20px" }}>
                  {document?.issuanceDate}
                </span>
              </Col>
              <Col md={6} className="field-box">
                <img
                  src={DocumentType}
                  alt="node type"
                  width={20}
                  height={20}
                />
                <span style={{ fontSize: "20px" }}>{document?.nodeType}</span>
              </Col>
            </Row>
            <Row className="description-row">
              <strong>Description</strong>
              <span style={{ fontSize: "18px", color: "black" }}>
                {document?.description}
              </span>
            </Row>
          </Col>
          <Col md={5} style={{ height: "300px", padding: "20px" }}>
            {/* Display the MiniMap with georeference coordinates */}
            {document?.coordinates && document.coordinates.length > 0 ? (
              <MiniMapDetail coordinates={document.coordinates} />
            ) : (
              <p>This document belong to Municipality area.</p>
            )}
          </Col>
        </Row>
        <Row className="table-container">
          <Col xs={12} md={4} className="margintop-15px">
            <strong>
              <img src={Language} alt="language" /> Language
            </strong>
            <br />
            <div
              style={{
                display: "flex",
                alignItems: "flex",
                gap: "15px",
              }}
            >
              {document?.language === "English" ? (
                <Flag code="GB" style={{ width: "40px", height: "30px" }} />
              ) : document?.language === "Swedish" ? (
                <Flag code="SE" style={{ width: "40px", height: "30px" }} />
              ) : (
                <span style={{ fontSize: "20px" }}>None</span>
              )}
              <span style={{ fontSize: "20px", verticalAlign: "flex" }}>
                {document?.language}
              </span>
            </div>
          </Col>
          <Col xs={12} md={4} className="margintop-15px">
            <strong>
              <img src={Book} alt="book" /> Pages
            </strong>
            <br />
            <div>
              <span className="blue-text">{document?.pages}</span>
            </div>
          </Col>
          <Col xs={12} md={4} className="margintop-15px">
            <strong>
              <img src={Scale} alt="scale" /> Scale
            </strong>
            <br />
            <div>
              {document?.documentType?.toString() === "Plan" ? (
                <>
                  <span className="blue-text">Architectural plan</span>
                  <span className="font-size-20">{document?.scale}</span>
                </>
              ) : (
                <span className="blue-text">{document?.scale}</span>
              )}
            </div>{" "}
          </Col>
        </Row>
        <br />
        <Row className="table-container">
          <Col xs={12} md={4} className="linked-documents margintop-15px">
            <strong>
              <img src={LinkDocument} alt="link document" />
              Linked Documents
            </strong>
            {document?.linkedDocuments &&
            document?.linkedDocuments.length > 0 ? (
              <div className="linked-documents-table">
                {document?.linkedDocuments?.length > 0 ? (
                  document.linkedDocuments.map((linkedDoc, index) => (
                    <div
                      key={index}
                      className={`table-row ${
                        index % 2 === 0 ? "dark-row" : "light-row"
                      }`}
                    >
                      <span className="document-title">{linkedDoc.title}</span>
                      <span className="document-connection">
                        {" - "}
                        {linkedDoc.connection}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="no-documents">No linked documents found.</div>
                )}
              </div>
            ) : (
              <div className="no-documents">No linked documents found.</div>
            )}
          </Col>
          <Col xs={12} md={4} className="resources margintop-15px">
            <strong>
              <img src={UploadDocument} alt="upload resource" /> Resources
            </strong>
            {document?.resources && document?.resources.length > 0 ? (
              <div className="linked-documents-table">
                {document?.resources.map((resource, index) => (
                  <div
                    key={index}
                    className={`table-row ${
                      index % 2 === 0 ? "dark-row" : "light-row"
                    }`}
                  >
                    <span className="document-title">{resource.fileName}</span>
                    <span className="document-connection">
                      {resource.fileType}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-documents">No resources found.</div>
            )}
          </Col>
          <Col xs={12} md={4} className="stakeholders margintop-15px">
            <strong>
              <img src={PersonBlue} alt="person" /> Stakeholders
            </strong>
            <div className="linked-documents-table">
              {document?.stakeholders?.map((stakeholder, index) => (
                <div
                  key={index}
                  className={`table-row ${
                    index % 2 === 0 ? "dark-row" : "light-row"
                  }`}
                >
                  <span className="document-title">{stakeholder}</span>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DocumentDetails;
