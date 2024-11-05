import { Col, Form, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../../style.css";
import { Props, NewDocument } from "./interfaces/types";

const GeoreferenceSelection = (props: Props) => {
  const [georeference, setGeoreference] = useState(
    props.document ? props.document.georeference : [[0,0]]
  );
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    setGeoreference([[latitude, longitude]]);
    props.setDocument({
      ...props.document,
      georeference: [[latitude, longitude]],
    });
  }, [latitude, longitude]);

  return (
    <Form.Group as={Row} className="align-items-center">
      <Form.Label className="black-text">Georeference</Form.Label>
      <Col ms={4}>
      <Form.Control
        type="number"
        step="0.01"
        value={latitude}
        onChange={(e) => setLatitude(parseFloat(e.target.value))}
        placeholder="Latitude"
        className="font-size-20"
      />
      </Col>
      <Col ms={4}>
      <Form.Control
        type="number"
        step="0.01"
        value={longitude}
        onChange={(e) => setLongitude(parseFloat(e.target.value))}
        placeholder="Longitude"
        className="font-size-20"
      />
      </Col>
    </Form.Group>
  );
};

export default GeoreferenceSelection;
