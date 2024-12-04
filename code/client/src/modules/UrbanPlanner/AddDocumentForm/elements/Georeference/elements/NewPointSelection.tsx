import { Row, Col, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../../../../../style.css";
import { Props } from "../../../interfaces/types";
import MiniMapPointModal from "../minimap/MiniMapPointModal";

const NewPointSelection = (
  props: Props & {
    showMiniMap: boolean;
    setShowMiniMap: React.Dispatch<React.SetStateAction<boolean>>;
  }
) => {
  const [latitude, setLatitude] = useState(67.85572);
  const [longitude, setLongitude] = useState(20.22513);

  useEffect(() => {
    props.setDocument({
      ...props.document,
      georeference: [
        [Number(latitude.toFixed(5)), Number(longitude.toFixed(5))],
      ],
    });
  }, [latitude, longitude]);

  return (
    <Form.Group as={Col} className="align-items-center">
      <Row>
        <Col xs="auto">
          <label className="black-text">Lat</label>
        </Col>
        <Col xs="auto">
          <label className="black-text-coord">{latitude.toFixed(5)}</label>
        </Col>
        <Col xs="auto">
          <label className="black-text">Long</label>
        </Col>
        <Col xs="auto">
          <label className="black-text-coord">{longitude.toFixed(5)}</label>
        </Col>
      </Row>
      {props && props.showMiniMap && (
        <MiniMapPointModal
          showMiniMap={props.showMiniMap}
          setShowMiniMap={props.setShowMiniMap}
          setLatitude={setLatitude}
          setLongitude={setLongitude}
        />
      )}
    </Form.Group>
  );
};

export default NewPointSelection;
