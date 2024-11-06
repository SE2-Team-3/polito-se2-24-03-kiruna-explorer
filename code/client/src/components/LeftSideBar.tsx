import { Col, Row } from "react-bootstrap";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useSidebar } from "./SidebarContext";
import "../index.css";

const LeftSideBar = (props: { logout: () => void }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  const isLoginPage = location.pathname === "/login";
  if (isLoginPage) {
    return null;
  }

  const handleNavigation0 = () => {
    navigate("/urban-planner");
    toggleSidebar();
  };

  const handleNavigation1 = () => {
    navigate("/urban-planner/add-document"); // Redirects to /add-document
    toggleSidebar();
  };
  const handleNavigation2 = () => {
    navigate("/urban-planner/link-documents"); // Redirects to /add-document
    toggleSidebar();
  };

  return (
    <>
      <div className="menu-icon" onClick={toggleSidebar}>
        <i className="bi bi-list"></i>
      </div>
      <div className={`sidebar-container ${isSidebarOpen ? "open" : ""}`}>
        <Row className="top-side-box">
          {user ? (
            <Col>
              <Row>
                <div
                  className="menu-text"
                  role="button"
                  onClick={handleNavigation0}
                >
                  {" "}
                  <span className="file-icon-box">
                    <i className="bi bi-clipboard"></i>
                  </span>
                  <span className="menu-text bold-text">Dashboard</span>
                  <span className="arrow-icon-box">
                    <i className="bi bi-caret-right-fill"></i>
                  </span>
                </div>{" "}
              </Row>
              <Row>
                <div
                  className="menu-text"
                  role="button"
                  onClick={handleNavigation1}
                >
                  <span className="file-icon-box">
                    <i className="bi bi-files"></i>
                  </span>
                  <span className="menu-text bold-text">New document</span>
                  <span className="arrow-icon-box">
                    <i className="bi bi-caret-right-fill"></i>
                  </span>
                </div>{" "}
              </Row>
              <Row>
                <div
                  className="menu-text"
                  role="button"
                  onClick={handleNavigation2}
                >
                  <span className="file-icon-box">
                    <i className="bi bi-link"></i>
                  </span>
                  <span className="menu-text bold-text">Link documents</span>
                  <span className="arrow-icon-box">
                    <i className="bi bi-caret-right-fill"></i>
                  </span>
                </div>{" "}
              </Row>
            </Col>
          ) : (
            <></>
          )}
        </Row>
        <Row className="bottom-side-box">
          <Col>
            <div className="user-text">
              <span className="login-icon-box">
                <i className="bi bi-person white-icon"></i>
              </span>
              <span className="bold-text text-24">
                {user ? user.name : "Username"}
              </span>
              <span className="logout-icon-box" onClick={props.logout}>
                {user ? (
                  <i className="bi bi-box-arrow-right blue-icon"></i>
                ) : (
                  <i className="bi bi-box-arrow-in-right blue-icon"></i>
                )}
              </span>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default LeftSideBar;
