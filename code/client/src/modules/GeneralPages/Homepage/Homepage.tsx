import { Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaProjectDiagram } from "react-icons/fa";
import "./HomePage.css"; // Aggiungi eventuali stili personalizzati

const HomePage = () => {
  const navigate = useNavigate();

  const handleMapRedirect = () => {
    navigate("/explore-map");
  };

  const handleDiagramRedirect = () => {
    navigate("/diagram");
  };

  return (
    <div className="home-page">
      <Container className="home-content">
        <Row className="text-center">
          <Col>
            <h1 className="title">Explore Kiruna</h1>
            <p className="subtitle">Welcome to the digital exploration of Kiruna, Sweden.</p>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col sm={6} className="mb-3">
            <Button className="button-explore-map btn-lg w-100" onClick={handleMapRedirect}>
              <FaMapMarkerAlt size={30} className="mr-2" />
              Explore the Map
            </Button>
          </Col>

          <Col sm={6} className="mb-3">
            <Button className="button-view-diagram btn-lg w-100" onClick={handleDiagramRedirect}>
              <FaProjectDiagram size={30} className="mr-2" />
              View the Diagram
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
