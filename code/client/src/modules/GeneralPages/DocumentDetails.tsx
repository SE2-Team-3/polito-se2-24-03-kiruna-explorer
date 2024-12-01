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
import PointLocation from "../../assets/icons/point location.svg";
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

        <Row className="title-container">
          <Col md={2} className="field-box">
            <img src={Calendar} alt="calendar" width={20} height={20} />
            <span className="font-size-20">{document?.issuanceDate}</span>
          </Col>
          <Col md={2} className="field-box">
            <img
              src={DocumentType}
              alt="document type"
              width={20}
              height={20}
            />
            <span className="font-size-20">{document?.documentType}</span>
          </Col>
          <Col md={2} className="field-box">
            <img
              src={PointLocation}
              alt="point location"
              width={20}
              height={20}
            />
            <span className="font-size-20">
              {document?.coordinates?.map((coordinate) =>
                coordinate.map((value) => parseFloat(value.toFixed(2)))
              )}
            </span>
          </Col>
        </Row>

        <Row className="description-row">
          <strong>Description</strong>
          <span className="font-size-20" style={{ color: "black" }}>
            {document?.description}
          </span>
        </Row>
        <Row className="table-container">
          <Col>
            <strong>
              <img src={Language} alt="language" /> Language
            </strong>
            <div style={{ display: "flex", alignItems: "flex", gap: "15px" }}>
              {document?.language === "English" ? (
                <Flag code="GB" style={{ width: "40px", height: "30px" }} />
              ) : document?.language === "Swedish" ? (
                <Flag code="SE" style={{ width: "40px", height: "30px" }} />
              ) : (
                <span className="font-size-20">None</span>
              )}
              <span className="font-size-20" style={{ verticalAlign: "flex" }}>
                {document?.language}
              </span>
            </div>
          </Col>
          <Col>
            <strong>
              <img src={Book} alt="book" /> Pages
            </strong>
            <div>
              <span className="blue-text">{document?.pages}</span>
            </div>
          </Col>
          <Col>
            <strong>
              <img src={Scale} alt="scale" /> Scale
            </strong>
            <div>
              <span className="blue-text">Plan</span>
              <span className="font-size-20">{document?.scale}</span>
            </div>
          </Col>
        </Row>
        <Row className="table-container">
          <Col xs={4} className="linked-documents">
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
          <Col xs={4} className="resources">
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
          <Col xs={4} className="stakeholders">
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
