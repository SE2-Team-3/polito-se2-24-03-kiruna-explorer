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
        <Row className="blue-text">
          <strong>{document?.title}</strong>
        </Row>
      
          <Row >
           <Col md={2} className="title-container">
            <img src={Calendar} alt="calendar" />
            <span >{document?.issuanceDate}</span>
           </Col>
             <Col md={2}>
               <img src={DocumentType} alt="document type" />
               <span >{document?.documentType}</span>
             </Col>
              <Col md={1}>
               <img src={PointLocation} alt="point location" />
               <span>{document?.georeferenceId}</span>
              </Col>
          </Row>
          
         <Row className="description-row">
           <strong>Description</strong>
           <span>{document?.description}</span>
         </Row>
        <Row className="table-container">
        <Col>
          <strong >
           <img src={Language} alt="language" /> Language
          </strong>
           <div style={{ display: "flex", alignItems: "flex", gap: "15px"}}>
             {document?.language === "English" ? (
             <Flag code="GB" style={{ width: "40px", height: "30px" }} />
             ) : (
             <Flag code="SE" style={{ width: "40px", height: "30px" }} />
              )}
             <span style={{ verticalAlign: "flex" }}>{document?.language}</span>
           </div>
        </Col>
            <Col>
             
             <strong><img src={Book} alt="book" /> Pages</strong>
             <div>
              <span className="blue-text">{document?.pages}</span>
             </div>
            </Col>
           <Col>
            <strong><img src={Scale} alt="scale" /> Scale</strong>
             <div>
              <span className="blue-text">Plan</span>
              <span>{document?.scale}</span>
             </div>
            </Col>
        </Row>
          <Row className="table-container" >
           <Col xs={4} className="linked-documents">
            
            <strong> <img src={LinkDocument} alt="link document" />Linked Documents</strong>
            {connections && connections.length > 0 ? (
            <div className="linked-documents-table">
             {connections.map((connection, index) => {
              const linkedDoc = documents.find(
              (doc) => doc.documentId === connection.documentId2
               );
               return (
               <div
                  key={index}
                 className={`table-row ${index % 2 === 0 ? "dark-row" : "light-row"}`}
                >
                    <span className="document-title">
                      {linkedDoc ? linkedDoc.title
                       : `Document ID: ${connection.documentId2}`}
                    </span>
                       <span className="document-connection">{connection.connection}</span>
                 </div>
                      );
                     })}
               </div>
                  ) : (
                 <div className="no-documents">No linked documents found.</div>
                  )}
            </Col>
             <Col xs={4} className="resources">
                <strong><img src={UploadDocument} alt="upload resource" /> Resources</strong>
                {resources && resources.length > 0 ? (
                <div className="linked-documents-table">
                 {resources.map((resource, index) => (
                   <div
                     key={index}
                     className={`table-row ${index % 2 === 0 ? "dark-row" : "light-row"}`}
                   >
                     <span className="document-title">{resource.fileName}</span>
                     <span className="document-connection">{resource.fileType}</span>
                   </div>
                     ))}
               </div>
                    ) : (
                        <div className="no-documents">No resources found.</div>
                  )}
             </Col>
                <Col xs={4} className="stakeholders">
                 <strong><img src={PersonBlue} alt="person" /> Stakeholders</strong>
                  <div className="linked-documents-table">
                      {document?.stakeholders.map((stakeholder, index) => (
                     <div
                      key={index}
                      className={`table-row ${index % 2 === 0 ? "dark-row" : "light-row"}`}
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
