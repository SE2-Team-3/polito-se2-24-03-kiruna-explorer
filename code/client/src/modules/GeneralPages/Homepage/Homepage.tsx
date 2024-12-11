import { Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./homepage.css";
import Flag from "../../../assets/icons/kirunaflag.svg";
import MapButton from "../../../assets/map02.png";
import DiagramButton from "../../../assets/diag02.png";

interface HomepageProps {
  loggedIn: Boolean;
  username: string | undefined;
}

const HomePage = ({ loggedIn, username }: HomepageProps) => {
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
            <Row>
              <h1 className="title-explorer-homepage">
                Explore
                <em>Kiruna</em>
              </h1>
            </Row>
            <p className="subtitle">
              👋 Welcome {loggedIn ? <span className="username-span">{username}</span> : null} to
              the digital exploration of{" "}
              <span className="kiruna-flag">
                <img src={Flag} alt="Kiruna Flag" className="kiruna-flag" />
              </span>
              Kiruna, Sweden.
            </p>
          </Col>
        </Row>

        <Row className="row-buttons-map-diagram">
          <Col sm={6} className="mb-3">
            <Button className="button-explore-map btn-lg w-100" onClick={handleMapRedirect}>
              <img src={MapButton} alt="Map Button" className="map-button" />
            </Button>
          </Col>

          <Col sm={6} className="mb-3">
            <Button className="button-view-diagram btn-lg w-100" onClick={handleDiagramRedirect}>
              <img src={DiagramButton} alt="Diagram Button" className="diagram-button" />
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
