import { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import kirunaChurch from "../../assets/Kiruna_church.jpg";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; // Eye icons
import { FaRegUser } from 'react-icons/fa'; // User icon
import "../style.css";
import "../../index.css";

export default function Login(props: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); // Password state here
  const [showPassword, setShowPassword] = useState(false);
  

  const handleSubmit = (event: any) => {
    event.preventDefault();
    props.setMessage("");

    let valid = true;
    let msg = "";

    if (!username || username === "") {
      valid = false;
      msg += "Please insert a valid username\r\n";
    }

    if (!password || password === "") {
      valid = false;
      msg += "Please insert a valid password\r\n";
    }

    if (valid) {
      props.login(username, password);
    } else {
      props.setMessage(msg);
    }
  };

  return (
    <div className="loginContainer">
      <Row className="loginWrapper">
        {/* Colonna sinistra per il form di accesso */}
        <Col md={6} className="formSection">
          <Row>
            <Col className="col-title">
              <span className="title-text">Kiruna</span>
              <span className="explorer">Explorer</span>
            </Col>
          </Row>
          <Row className="loginFormContainer">
            <span  style={{ marginBottom: "99px" ,fontSize:"15px"}}>
              Login to your account
            </span>
            {props.message ? (
              <Alert
                className="error"
                variant="danger"
                onClose={() => props.setMessage("")}
                dismissible
              >
                {props.message}
              </Alert>
            ) : null}
   
            <Form.Group style={{textAlign:"left"}}>
               <div className="input-container">
               <label className="input-label" style={{textAlign:"left",fontSize:"15px"}}>Username</label>
                 <div className="input-field">
                  <input
                   type="text"
                   placeholder="e.g Planner"
                   value={username}
                   onChange={(event) => setUsername(event.target.value)}
                   />
                    <span className="input-icon">
                    <FaRegUser size={16} />
                     </span>
                 </div>
               </div>
               
               <div className="input-container">
                <label className="input-label">Password</label>
                 <div className="input-field">
                 <input
                  type={showPassword ? "text" : "password"}
                  placeholder="minimum 8 characters"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                 />
                   <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                   >
                   {showPassword ? (
                    <AiOutlineEyeInvisible size={16}   />
                    ) : (
                    <AiOutlineEye size={16} />
                    )}
                  </button>
               </div>
               </div>

            
             </Form.Group>
             
            <Button type="submit" className="loginBtn" onClick={handleSubmit}>
              Login
            </Button>
             <div className="divider">
              <span>or continue as</span>
              </div>
            <Button className="visitor-resident-btn"
              variant="link"
              onClick={props.loginAsGuest}
            >
              <div className="visitor-resident-btn">
              <span>Visitor | Resident </span>
              </div>
               
            </Button>

          </Row>
        </Col>

        {/* Colonna destra per l'immagine */}
        <Col md={6} className="imageSection">
          <div className="imageContainer">
            <img src={kirunaChurch} alt="Order status illustration" />
          </div>
        </Col>
      </Row>
    </div>
  );
}