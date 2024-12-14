import { useParams } from "react-router-dom";
import { useSidebar } from "../../components/SidebarContext";
import { Row, Col } from "react-bootstrap";
import API from "../../API/API";
import { useEffect, useState } from "react";
import DocumentDetail from "../../models/documentDetail";
import Flag from "react-world-flags";
import LinkDocument from "../../assets/icons/link selected.svg";
import Attachment from "../../assets/icons/attachment.svg";
import Resource from "../../assets/icons/resource.svg";
import Scale from "../../assets/icons/scale.svg";
import Language from "../../assets/icons/language.svg";
import MiniMapDetail from "./Map/MiniMapDetail";
import DocumentType from "../../assets/icons/document type.svg";
import Calendar from "../../assets/icons/date.svg";
import PersonBlue from "../../assets/icons/person blue.svg";
import Book from "../../assets/icons/book.svg";
import { useNavigate } from "react-router-dom";

const DocumentDetails = () => {
  const { isSidebarOpen } = useSidebar();
  const { documentId } = useParams();
  const [document, setDocument] = useState<DocumentDetail>();
  const navigate = useNavigate();

  const docId = Number(documentId);

  useEffect(() => {
    API.getDocumentById(docId).then((doc) => setDocument(doc));
  }, [docId]);

  const getLanguageFlag = (language: string | undefined) => {
    if (language === "English") {
      return <Flag code="GB" style={{ width: "40px", height: "30px" }} />;
    }
    if (language === "Swedish") {
      return <Flag code="SE" style={{ width: "40px", height: "30px" }} />;
    }
    return <span style={{ fontSize: "20px" }}>None</span>;
  };

  return (
    <div className={`document-wrapper ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <div className="form-container-document-details">
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
            {document && document.coordinates?.length > 0 ? (
              <MiniMapDetail coordinates={document.coordinates} />
            ) : (
              <MiniMapDetail coordinates={null} />
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
              {getLanguageFlag(document?.language)}
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
              {document?.documentType?.toString() === "Architectural plan" ? (
                <>
                  <span className="blue-text">{document?.documentType}</span>
                  <span className="font-size-20">{document?.scale}</span>
                </>
              ) : (
                <span className="blue-text">{document?.scale}</span>
              )}
            </div>
          </Col>
        </Row>
        <br />
        <Row className="table-container">
          <Col xs={12} md={3} className="stakeholders margintop-15px">
            <strong>
              <img src={PersonBlue} alt="person" /> Stakeholders
            </strong>
            <div className="linked-documents-table">
              {document?.stakeholders?.map((stakeholder, index) => (
                <div
                  key={`${index}-${stakeholder}`}
                  className={`table-row ${
                    index % 2 === 0 ? "dark-row" : "light-row"
                  }`}
                >
                  <span className="document-title">{stakeholder}</span>
                </div>
              ))}
            </div>
          </Col>

          <Col xs={12} md={3} className="linked-documents margintop-15px">
            <strong>
              <img src={LinkDocument} alt="link document" />
              Linked Docs
            </strong>
            {document?.linkedDocuments &&
            document?.linkedDocuments.length > 0 ? (
              <div className="linked-documents-table">
                {[
                  ...new Map(
                    document.linkedDocuments.map((linkedDoc) => [
                      linkedDoc.documentId,
                      linkedDoc,
                    ])
                  ).values(),
                ].map((linkedDoc, index) => (
                  <div
                    key={`${index}-${linkedDoc.documentId}`}
                    className={`table-row ${
                      index % 2 === 0 ? "dark-row" : "light-row"
                    }`}
                  >
                    <span
                      className="document-title"
                      onClick={() =>
                        navigate(`/documents/${linkedDoc.documentId}`)
                      }
                    >
                      {linkedDoc.title}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-documents">No linked documents found.</div>
            )}
          </Col>
          <Col xs={12} md={3} className="resources margintop-15px">
            <strong>
              <img src={Resource} alt="upload resource" /> Resources
            </strong>
            {document?.resources && document?.resources.length > 0 ? (
              <div className="linked-documents-table">
                {document?.resources.map((resource, index) => (
                  <div
                    key={`${index}-${resource.resourceId}`}
                    className={`table-row ${
                      index % 2 === 0 ? "dark-row" : "light-row"
                    }`}
                  >
                    <span className="document-title">{resource.fileName}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-documents">No resources found.</div>
            )}
          </Col>
          <Col xs={12} md={3} className="resources margintop-15px">
            <strong>
              <img src={Attachment} alt="attachments" /> Attachments
            </strong>
            {document?.attachments && document?.attachments.length > 0 ? (
              <div className="linked-documents-table">
                {document?.attachments.map((attachment, index) => (
                  <div
                    key={`${index}-${attachment.attachmentId}`}
                    className={`table-row ${
                      index % 2 === 0 ? "dark-row" : "light-row"
                    }`}
                  >
                    <span className="document-title">
                      {attachment.fileName}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-documents">No attachments found.</div>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DocumentDetails;
