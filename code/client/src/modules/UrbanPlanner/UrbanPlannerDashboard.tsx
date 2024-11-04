import { Col, Row } from "react-bootstrap";
import "../style.css";

const UrbanPlanner = () => {
  return (
    <div className="main-page">
      <Row>
        <Col>
          <h1 className="document-form m-5 p-5" style={{ textAlign: "center" }}>
            Welcome to Urban Planner Dashboard
          </h1>
        </Col>
      </Row>
    </div>
  );
};

export default UrbanPlanner;
