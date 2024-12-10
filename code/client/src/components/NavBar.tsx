import { Button, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "../index.css";
import Logo from "../assets/icons/logo.svg";
import { Dispatch, FC, SetStateAction } from "react";
import { LogInIcon } from "lucide-react";
import { LogOutIcon } from "lucide-react";

interface NavBarProps {
  setSearchTitle: Dispatch<SetStateAction<string>>;
  loggedIn: Boolean;
  doLogOut: () => void;
}

const NavBar: FC<NavBarProps> = (props) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const navigate = useNavigate();

  const handleChange = () => {
    var value = (document.getElementById("input") as HTMLInputElement).value;
    props.setSearchTitle(value);
  };

  const handleClear = () => {
    (document.getElementById("input") as HTMLInputElement).value = "";
    props.setSearchTitle("");
  };

  const showSearchBar =
    location.pathname === "/urban-planner/documents-list" || location.pathname === "/explore-map";

  const loggedIn = props.loggedIn;

  if (isLoginPage) {
    return null;
  }

  return (
    <div className="navbar-container">
      <Row className="navbar-row">
        <Button className="navigate-home-button" onClick={() => navigate("/home")}>
          <Row className="navbar-row">
            <Col>
              <img src={Logo} alt="logo" className="logo" />
            </Col>
            <style>
              @import
              url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            </style>
            <Col>
              <span className="title-kiruna">Kiruna</span>
              <span className="title-explorer">Explorer</span>
            </Col>
          </Row>
        </Button>
      </Row>
      {showSearchBar && (
        <Row className="search-bar-row">
          <Col>
            <div className="search-bar">
              <svg
                className="search-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input id="input" type="text" placeholder="Search..." />
              <button className="clear-button" onClick={handleClear}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </Col>
          <Col>
            <button className="search-button" onClick={handleChange}>
              Search
            </button>
          </Col>
        </Row>
      )}
      {!loggedIn && (
        <Row className="login-row">
          <Button className="login-button" onClick={() => navigate("/login")}>
            <OverlayTrigger placement="bottom" overlay={<Tooltip>Login</Tooltip>}>
              <LogInIcon size={24} color="#3d52a0" />
            </OverlayTrigger>
          </Button>
        </Row>
      )}
      {loggedIn && (
        <Row className="login-row">
          <Button className="login-button" onClick={props.doLogOut}>
            <OverlayTrigger placement="bottom" overlay={<Tooltip>Logout</Tooltip>}>
              <LogOutIcon size={24} color="#3d52a0" />
            </OverlayTrigger>
          </Button>
        </Row>
      )}
    </div>
  );
};

export default NavBar;
