import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

const Home = () => {
  const [phrase, setPhrase] = useState("Hello Kiruna Explorer! We're coming for you! ;)");
  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <h1>{phrase}</h1>
          <Button variant="primary" onClick={() => setPhrase("Let's explore!")}>
            Change Phrase
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
