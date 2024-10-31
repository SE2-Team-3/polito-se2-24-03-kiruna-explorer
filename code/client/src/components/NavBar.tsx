import { Col, Row } from "react-bootstrap";
import "./style.css";

const NavBar = () => {
  return (
    <div className="navbar-container">
      <Row>
        <Col>
          <span className="title-text">Kiruna</span>
          <span className="title-text bold-text">Explorer</span>
        </Col>
      </Row>
    </div>
  );
};

export default NavBar;
