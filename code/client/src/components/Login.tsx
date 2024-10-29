import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";

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
    <Container fluid className="loginContainer">
      {/* Colonna sinistra per il form di accesso */}
      <Col md={6} className="formSection">
        <Row className="loginTitle">
          <i className="bi bi-diagram-2">Kiruna eXplorer</i>
        </Row>
        <Row className="loginFormContainer">
          <h2>Login to your account </h2>
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
          <Form.Group className="form" controlId="login">
            <Form.Control
              placeholder="Email"
              type="email"
              value={username}
              onChange={(ev) => setUsername(ev.target.value)}
            />
            <Form.Control
              className="mt-3"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
          </Form.Group>
          <Button variant="dark" type="submit" className="loginBtn" onClick={handleSubmit}>
            Login
          </Button>
        </Row>
      </Col>

      {/* Colonna destra per l'immagine */}
      <Col md={6} className="imageSection">
        <div className="imageContainer">
          <img
            src="https://i.guim.co.uk/img/media/30e82ea3c6839b6162bcc07e61b3aa1357c1535b/0_254_4493_2697/master/4493.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=d02d1df74e226c642af1b82206e4e767"
            alt="Order status illustration"
          />
          <h3>eXplore the city</h3>
        </div>
      </Col>
    </Container>
  );
}
