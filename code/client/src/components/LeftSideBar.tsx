import { Col, Row } from "react-bootstrap";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import "./style.css";

const LeftSideBar = (props: { logout: () => void }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  if (isLoginPage) {
    return null;
  }

  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/add-document"); // Redirects to /add-document
  };

  const user = useContext(UserContext);

  return (
    <div className="sidebar-container">
      <Row className="top-side-box">
        {user ? (
          <Col>
            <div className="menu-text">
              <span className="file-icon-box">
                <i className="bi bi-files"></i>
              </span>
              <span className="menu-text bold-text">New document</span>
              <span className="arrow-icon-box" onClick={handleNavigation}>
                <i className="bi bi-caret-right-fill"></i>{" "}
              </span>
            </div>
          </Col>
        ) : (
          <></>
        )}
      </Row>
      <Row className="bottom-side-box">
        <Col>
          <div className="title-text">
            <span className="login-icon-box">
              <i className="bi bi-person white-icon"></i>
            </span>
            <span className="title-text bold-text">
              {user ? user.name : "User"}
            </span>
            <span className="logout-icon-box" onClick={props.logout}>
              <i className="bi bi-box-arrow-right blue-icon"></i>
            </span>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LeftSideBar;
