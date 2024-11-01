import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import "../style.css";

const Home = () => {
  const [phrase, setPhrase] = useState(
    "Hello Kiruna Explorer! We're coming for you! ;)"
  );
  return (
    <div className="main-page">
      <Row>
        <Col>
          <h1>{phrase}</h1>
          <Button variant="primary" onClick={() => setPhrase("Let's explore!")}>
            Change Phrase
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
