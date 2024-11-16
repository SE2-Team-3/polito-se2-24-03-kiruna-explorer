import { useEffect, useState } from "react";
import Document from "../../../models/document";
import API from "../../../API/API";
import { Badge, Button, OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import LinkDocument from "../../../assets/icons/link selected.svg";
import UploadDocument from "../../../assets/icons/upload.svg";

export default function DocumentsListTable() {
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    API.getDocuments().then((documents) => setDocuments(documents));
  }, []);

  // Funzione per determinare la classe del badge
  const getBadgeClass = (documentType: string) => {
    const docType = documentType;
    console.log(docType);
    switch (docType) {
      case "Text":
        return "badge-text";
      case "Plan":
        return "badge-plan";
      case "Concept":
        return "badge-concept";
      case "Actions":
        return "badge-actions";
    }
  };

  return (
    <div className="main-page">
      <div className="form-container">
        <Table hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Issuance Date</th>
              <th>Connections</th>
              <th>Pages</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {documents.map((item, index) => (
              <tr key={item.documentId} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                <td>
                  <Badge className={`${getBadgeClass(item.documentType)}`}>
                    {item.documentType.charAt(0).toUpperCase()}
                  </Badge>
                  {item.title}
                </td>
                <td>{item.issuanceDate}</td>
                <td>{item.issuanceDate}</td>
                <td>{item.pages}</td>
                <td>
                  <OverlayTrigger placement="top" overlay={<Tooltip>Link</Tooltip>}>
                    <Button variant="link">
                      <img src={LinkDocument} alt="link document" />
                    </Button>
                  </OverlayTrigger>
                  <OverlayTrigger placement="top" overlay={<Tooltip>Upload</Tooltip>}>
                    <Button variant="link">
                      <img src={UploadDocument} alt="upload resource" />
                    </Button>
                  </OverlayTrigger>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
