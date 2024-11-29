import { Col, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "../index.css";
import Logo from "../assets/icons/logo.svg";

const NavBar = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  if (isLoginPage) {
    return null;
  }

  return (
    <div className="navbar-container">
      <Row className="navbar-row">
        <Col>
          <img src={Logo} alt="logo" className="logo" />
        </Col>
        <Col>
          <style>
            @import
            url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
          </style>
          <span className="title-kiruna">Kiruna</span>
          <span className="title-explorer">Explorer</span>
        </Col>
      </Row>
    </div>
  );
};

export default NavBar;
