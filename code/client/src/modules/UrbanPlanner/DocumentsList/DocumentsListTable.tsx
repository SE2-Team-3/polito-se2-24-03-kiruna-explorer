import { useEffect, useState } from "react";
import Document from "../../../models/document";
import API from "../../../API/API";
import "../../style.css";
import {
  Badge,
  Button,
  Col,
  Form,
  OverlayTrigger,
  Pagination,
  Row,
  Table,
  Tooltip,
} from "react-bootstrap";
import LinkDocument from "../../../assets/icons/link selected.svg";
import UploadDocument from "../../../assets/icons/upload.svg";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "../../../components/SidebarContext";

export default function DocumentsListTable(props: any) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // Pagina corrente
  const [itemsPerPage, setItemsPerPage] = useState(10); // Elementi per pagina
  const { isSidebarOpen } = useSidebar();
  const navigate = useNavigate();

  useEffect(() => {
    API.getDocuments().then((documents) => setDocuments(documents));
  }, []);

  // Funzione per determinare la classe del badge
  const getBadgeClass = (documentType: string) => {
    const docType = documentType;
    //console.log(docType);
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

  // Funzione per calcolare i dati visibili sulla pagina corrente
  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return documents.slice(startIndex, endIndex);
  };

  const handleClickUpload = (documentId: number) => {
    props.setUploadDocumentId(documentId);
    navigate("/urban-planner/add-resource");
  };

  // Funzione per calcolare il numero totale di pagine
  const totalPages = Math.ceil(documents.length / itemsPerPage);

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1); // Reset alla prima pagina
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const items = [];
    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    return items;
  };

  return (
    <div className={`main-page ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <Col>
        <Row>
          <div className="form-container">
            <Table hover>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Issuance Date</th>
                  <th>Language</th>
                  <th>Pages</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {getPaginatedData().map((item, index) => (
                  <tr
                    key={item.documentId}
                    className={index % 2 === 0 ? "even-row" : "odd-row"}
                  >
                    <td>
                      <Badge className={`${getBadgeClass(item.documentType)}`}>
                        {item.documentType.charAt(0).toUpperCase()}
                      </Badge>
                      {item.title}
                    </td>
                    <td>{item.issuanceDate}</td>
                    <td>{item.language}</td>
                    <td>{item.pages}</td>
                    <td>
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Link</Tooltip>}
                      >
                        <Button
                          variant="link"
                          onClick={() =>
                            navigate("/urban-planner/link-documents")
                          }
                        >
                          <img src={LinkDocument} alt="link document" />
                        </Button>
                      </OverlayTrigger>
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>{"Upload resource(s)"}</Tooltip>}
                      >
                        <Button
                          variant="link"
                          onClick={() => handleClickUpload(item.documentId)}
                        >
                          <img src={UploadDocument} alt="upload resource" />
                        </Button>
                      </OverlayTrigger>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Row>
        <Row>
          {/* Controlli per selezionare gli elementi per pagina */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <Form.Group
              controlId="itemsPerPage"
              className="d-flex align-items-center"
            >
              <Form.Label className="me-2 mb-0">Showing</Form.Label>
              <Form.Select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                style={{ width: "80px" }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </Form.Select>
              <span className="items-per-page-span">items per page</span>
            </Form.Group>

            {/* Paginazione */}
            <Pagination>
              <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {renderPagination()}
              <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </div>
        </Row>
      </Col>
    </div>
  );
}
