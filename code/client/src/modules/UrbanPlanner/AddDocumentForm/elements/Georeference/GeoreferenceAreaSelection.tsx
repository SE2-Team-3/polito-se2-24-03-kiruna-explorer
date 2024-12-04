import { Row, Col, Form, InputGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import PolygonMapModal from "./MiniMapAreaModal";
import "../../../../style.css";
import { Props } from "../../interfaces/types";

const AreaSelection = (
  props: Props & {
    showPolygonMap: boolean;
    setShowPolygonMap: React.Dispatch<React.SetStateAction<boolean>>;
  }
) => {
  const [polygonName, setPolygonName] = useState("");
  const [polygonCoordinates, setPolygonCoordinates] = useState<[number, number][]>([]);

  useEffect(() => {
    props.setDocument({
      ...props.document,
      georeference: polygonCoordinates,
      georeferenceName: polygonName ? polygonName : undefined,
    });
  }, [polygonName, polygonCoordinates]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPolygonName(e.target.value);
  };

  return (
    <Form.Group as={Col} className="align-items-center">
      <Row className="geo-box w-100 align-items-center">
        <Col>
          <InputGroup className="w-100">
            <InputGroup.Text className="font-size-18">Name</InputGroup.Text>
            <Form.Control
              type="text"
              value={polygonName}
              onChange={handleNameChange}
              placeholder="Enter area name"
              className="font-size-20"
              required
            />
          </InputGroup>
        </Col>
      </Row>
      {props.showPolygonMap && (
        <PolygonMapModal
          showPolygonMap={props.showPolygonMap}
          setShowPolygonMap={props.setShowPolygonMap}
          setPolygonCoordinates={setPolygonCoordinates}
        />
      )}
    </Form.Group>
  );
};

export default AreaSelection;
