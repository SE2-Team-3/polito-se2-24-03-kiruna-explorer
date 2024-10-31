import { Col, Row } from "react-bootstrap";
import "./style.css";

const LeftSideBar = () => {
  return (
    <div className="sidebar-container">
      <Row className="top-side-box"></Row>
      <Row className="bottom-side-box">
        <Col>
          <div className="title-text">
            <span className="login-icon-box">
              <i className="bi bi-person white-icon"></i>
            </span>
            <span className="title-text bold-text">User</span>
            <span className="logout-icon-box">
              <i className="bi bi-box-arrow-right blue-icon"></i>
            </span>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LeftSideBar;