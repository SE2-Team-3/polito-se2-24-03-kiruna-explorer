import { Col, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "./style.css";

const NavBar = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  if (isLoginPage) {
    return null;
  }

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
