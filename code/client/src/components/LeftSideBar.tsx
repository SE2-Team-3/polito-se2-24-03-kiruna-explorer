import { Col, Row } from "react-bootstrap";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useSidebar } from "./SidebarContext";
import "../index.css";
import NewDocument from "../assets/icons/document notselected.svg";
import { TiDocumentAdd } from "react-icons/ti";
import { HiDocumentAdd } from "react-icons/hi";
import NewDocumentSelected from "../assets/icons/document selected.svg";
import NewLinkSelected from "../assets/icons/link selected.svg";
import NewLink from "../assets/icons/link notselected.svg";
import { PiMapPinAreaDuotone, PiMapPinAreaLight } from "react-icons/pi";
import { CiLogin } from "react-icons/ci";

const LeftSideBar = (props: { logout: () => void }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  const isLoginPage = location.pathname === "/login";
  if (isLoginPage) {
    return null;
  }

  const handleNavigation1 = () => {
    navigate("/urban-planner/add-document");
    toggleSidebar();
  };

  const handleNavigation2 = () => {
    navigate("/urban-planner/link-documents");
    toggleSidebar();
  };

  const handleNavigation3 = () => {
    navigate("/urban-planner/documents-list");
    toggleSidebar();
  };
  const handleNavigation4 = () => {
    navigate("/explore-map");
    toggleSidebar();
  };
  const handleNavigation3 = () => {
    navigate("/explore-map");
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
                    location.pathname === "/explore-map" ? "highlighted" : ""
                  }`}
                  role="button"
                  onClick={handleNavigation4}
                >
                  <span className="file-icon-box">
                    {location.pathname === "/explore-map" ? (
                      <PiMapPinAreaDuotone />
                    ) : (
                      <PiMapPinAreaLight />
                    )}
                  </span>
                  <span className="text-box">View documents</span>
                </div>
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
                    {location.pathname === "/urban-planner/link-documents" ? (
                      <img src={NewLinkSelected} alt="new document selected" />
                    ) : (
                      <img src={NewLink} alt="new document" />
                    )}
                  </span>
                  <span className="text-box">Link documents</span>
                </div>
              </Row>

              <Row>
                <div
                  className={`menu-text-container ${
                    location.pathname === "/urban-planner/documents-list"
                      ? "highlighted"
                      : ""
                  }`}
                  role="button"
                  onClick={handleNavigation3}
                >
                  <span className="file-icon-box">
                    {location.pathname === "/urban-planner/documents-list" ? (
                      <img
                        src={NewDocumentSelected}
                        alt="new document selected"
                      />
                    ) : (
                      <img src={NewDocument} alt="new document" />
                    )}
                  </span>
                  <span className="text-box">Documents List</span>
                </div>
              </Row>
              <Row>
                <div
                  className={`menu-text-container ${
                    location.pathname === "/explore-map" ? "highlighted" : ""
                  }`}
                  role="button"
                  onClick={handleNavigation4}
                >
                  <span className="file-icon-box">
                    {location.pathname === "/explore-map" ? (
                      <PiMapPinAreaDuotone />
                    ) : (
                      <PiMapPinAreaLight />
                    )}
                  </span>
                  <span>View documents</span>
                </div>{" "}
              </Row>
            </Col>
          ) : (
            <Row>
              <div
                className={`menu-text-container ${
                  location.pathname === "/explore-map" ? "highlighted" : ""
                }`}
                role="button"
                onClick={handleNavigation3}
              >
                <span className="file-icon-box">
                  {location.pathname === "/explore-map" ? (
                    <PiMapPinAreaDuotone />
                  ) : (
                    <PiMapPinAreaLight />
                  )}
                </span>
                <span>View documents</span>
              </div>{" "}
            </Row>
          )}
        </Row>
        <Row className="bottom-side-box">
          <Col>
            {user ? (
              //  Logout
              <div className="user-text">
                <span className="login-icon-box">
                  <i className="bi bi-person white-icon"></i>
                </span>
                <Row>
                  <style>
                    @import
                    url('https://fonts.googleapis.com/css?family=Poppins:200,300,400,
                    500,700,900');
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
            ) : (
              // Login
              <div className="user-text">
                <span className="login-icon-box">
                  <i className="bi bi-person white-icon"></i>
                </span>
                <Row>
                  <style>
                    @import
                    url('https://fonts.googleapis.com/css?family=Poppins:200,300,400,
                    500,700,900');
                  </style>
                  <span className="user-name">Guest</span>
                  <span className="user-role">Visitor</span>
                </Row>
                <span
                  className="logout-icon-box"
                  onClick={() => navigate("/login")}
                >
                  <CiLogin />
                </span>
              </div>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default LeftSideBar;
