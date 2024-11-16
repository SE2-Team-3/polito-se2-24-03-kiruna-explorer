import { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import kirunaChurch from "../../assets/Kiruna_church.jpg";
import "../style.css";
import "../../index.css";

export default function Login(props: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
              <span className="explorer title-text">Explorer</span>
            </Col>
          </Row>
          <Row className="loginFormContainer">
            <span className="black-text" style={{ marginBottom: "20px" }}>
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
            <Form.Group className="form">
              <Form.Control
                placeholder="Username"
                type="email"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <Form.Control
                className="mt-3"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>
            <div className="d-flex flex-column align-items-center mt-3">
              <Button type="submit" className="loginBtn" onClick={handleSubmit}>
                Login
              </Button>
              <Button
                variant="link"
                className="mt-2 small"
                onClick={props.loginAsAnonymous}
              >
                Continue as resident | visitor
              </Button>
            </div>
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
