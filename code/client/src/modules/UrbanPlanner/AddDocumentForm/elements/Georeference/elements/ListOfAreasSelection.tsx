import { Row, Col, Form, InputGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import MiniMapListAreaModal from "../minimap/MiniMapListAreaModal";
import "../../../../../style.css";
import { Props } from "../../../interfaces/types";

const ListOfAreasSelection = (
  props: Props & {
    showPolygonMap: boolean;
    setShowPolygonMap: React.Dispatch<React.SetStateAction<boolean>>;
  }
) => {
  const [polygonName, setPolygonName] = useState("");
  const [polygonCoordinates, setPolygonCoordinates] = useState<
    [number, number][]
  >([]);

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
              disabled
            />
          </InputGroup>
        </Col>
      </Row>
      {props.showPolygonMap && (
        <MiniMapListAreaModal
          setPolygonName={setPolygonName}
          showPolygonMap={props.showPolygonMap}
          setShowPolygonMap={props.setShowPolygonMap}
          setPolygonCoordinates={setPolygonCoordinates}
        />
      )}
    </Form.Group>
  );
};

export default ListOfAreasSelection;
