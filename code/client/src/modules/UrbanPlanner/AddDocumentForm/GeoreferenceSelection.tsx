import { Col, Form, InputGroup, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../../style.css";
import { Props } from "./interfaces/types";

const GeoreferenceSelection = (props: Props) => {
  const [latitude, setLatitude] = useState(67.8558);
  const [longitude, setLongitude] = useState(20.2253);
  const [latError, setLatError] = useState("");
  const [lonError, setLonError] = useState("");

  useEffect(() => {
    if (validateLatitude(latitude) && validateLongitude(longitude)) {
      props.setDocument({
        ...props.document,
        georeference: [[latitude, longitude]],
      });
    }
  }, [latitude, longitude]);

  const validateLatitude = (lat: number) => {
    const latMin = 67.82;
    const latMax = 67.89;

    if (lat < latMin || lat > latMax) {
      setLatError(
        `Latitude must be between ${latMin.toFixed(4)} and ${latMax.toFixed(
          4
        )}.`
      );
      return false;
    }
    setLatError("");
    return true;
  };

  const validateLongitude = (lon: number) => {
    const lonMin = 20.1;
    const lonMax = 20.35;

    if (lon < lonMin || lon > lonMax) {
      setLonError(
        `Longitude must be between ${lonMin.toFixed(4)} and ${lonMax.toFixed(
          4
        )}.`
      );
      return false;
    }
    setLonError("");
    return true;
  };

  const handleLatitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setLatitude(value);
    validateLatitude(value);
  };

  const handleLongitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setLongitude(value);
    validateLongitude(value);
  };

  return (
    <Form.Group as={Col} className="align-items-center">
      <Form.Label className="black-text">Georeference</Form.Label>
      {latError && (
        <Alert variant="danger" className="my-2">
          {latError}
        </Alert>
      )}
      <Col className="geo-box w-100">
        <InputGroup className="w-100">
          <InputGroup.Text className="font-size-18">Lat.</InputGroup.Text>
          <Form.Control
            type="number"
            step="0.0001"
            min="67.8200"
            max="67.8900"
            value={latitude}
            onChange={handleLatitudeChange}
            placeholder="Insert Latitude"
            className="font-size-20"
            required
          />
        </InputGroup>
      </Col>
      {lonError && (
        <Alert variant="danger" className="my-2">
          {lonError}
        </Alert>
      )}
      <Col className="geo-box w-100">
        <InputGroup className="w-100">
          <InputGroup.Text className="font-size-18">Lon.</InputGroup.Text>
          <Form.Control
            type="number"
            step="0.0001"
            min="20.1000"
            max="20.3500"
            value={longitude}
            onChange={handleLongitudeChange}
            placeholder="Insert Longitude"
            className="font-size-20"
            required
          />
        </InputGroup>
      </Col>
    </Form.Group>
  );
};

export default GeoreferenceSelection;
