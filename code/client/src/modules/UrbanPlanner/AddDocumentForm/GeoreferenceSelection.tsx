import { Col, Form, Row, InputGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../../style.css";
import { Props } from "./interfaces/types";

const GeoreferenceSelection = (props: Props) => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    props.setDocument({
      ...props.document,
      georeference: [[latitude, longitude]],
    });
  }, [latitude, longitude]);

  return (
    <Form.Group as={Row} className="align-items-center">
      <Form.Label className="black-text">Georeference</Form.Label>
      <Col className="geo-box">
        <InputGroup>
          <InputGroup.Text className="font-size-18">Lat.</InputGroup.Text>
          <Form.Control
            type="number"
            step="0.01"
            value={latitude}
            onChange={(e) => setLatitude(parseFloat(e.target.value))}
            placeholder="Enter Latitude"
            className="font-size-20"
          />
        </InputGroup>
      </Col>

      <Col className="geo-box">
        <InputGroup>
          <InputGroup.Text className="font-size-18">Lon.</InputGroup.Text>
          <Form.Control
            type="number"
            step="0.01"
            value={longitude}
            onChange={(e) => setLongitude(parseFloat(e.target.value))}
            placeholder="Enter Longitude"
            className="font-size-20"
          />
        </InputGroup>
      </Col>
    </Form.Group>
  );
};

export default GeoreferenceSelection;
