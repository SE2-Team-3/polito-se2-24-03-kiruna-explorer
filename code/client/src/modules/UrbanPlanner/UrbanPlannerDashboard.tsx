import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../style.css";

const UrbanPlanner = () => {
  return (
    <div className="main-page">
      <Row>
        <Col>
          <h1>Welcome to Urban Planner Dashboard</h1>
          <Link className="btn btn-primary me-1" to="/add-document">
            Add Document
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default UrbanPlanner;
