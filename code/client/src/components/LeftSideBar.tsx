import { Col, Row } from "react-bootstrap";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useSidebar } from "./SidebarContext";
import "../index.css";
import Dashboard from "../assets/icons/dashboard notselected.svg";
import DashboardSelected from "../assets/icons/dashboard selected.svg";
import NewDocument from "../assets/icons/document notselected.svg";
import NewDocumentSelected from "../assets/icons/document selected.svg";

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
                  className={`menu-text-container ${
                    location.pathname === "/urban-planner" ? "highlighted" : ""
                  }`}
                  role="button"
                  onClick={handleNavigation0}
                >
                  <span className="file-icon-box">
                    {location.pathname === "/urban-planner" ? (
                      <img src={DashboardSelected} alt="dashboard selected" />
                    ) : (
                      <img src={Dashboard} alt="dashboard" />
                    )}
                  </span>
                  <span>Dashboard</span>
                </div>
              </Row>
              <Row>
                <div
                  className={`menu-text-container ${
                    location.pathname === "/urban-planner/add-document"
                      ? "highlighted"
                      : ""
                  }`}
                  role="button"
                  onClick={handleNavigation1}
                >
                  <span className="file-icon-box">
                    {location.pathname === "/urban-planner/add-document" ? (
                      <img
                        src={NewDocumentSelected}
                        alt="new document selected"
                      />
                    ) : (
                      <img src={NewDocument} alt="new document" />
                    )}
                  </span>
                  <span>New document</span>
                </div>{" "}
              </Row>
              <Row>
                <div
                  className={`menu-text-container ${
                    location.pathname === "/urban-planner/link-documents"
                      ? "highlighted"
                      : ""
                  }`}
                  role="button"
                  onClick={handleNavigation2}
                >
                  <span className="file-icon-box">
                    <i className="bi bi-link"></i>
                  </span>
                  <span>Link documents</span>
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
              <Row>
                <style>
                  @import
                  url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap');
                </style>
                <span className="user-name">
                  {user ? user.name : "Username"}
                </span>
                <span className="user-role">
                  {user ? "Urban Planner" : "Role here"}
                </span>
              </Row>
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
