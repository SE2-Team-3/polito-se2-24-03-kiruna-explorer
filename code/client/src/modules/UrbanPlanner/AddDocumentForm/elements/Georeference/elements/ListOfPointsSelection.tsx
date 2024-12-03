import { Row, Col, Form, InputGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../../../../style.css";
import { Props } from "../../../interfaces/types";
import MiniMapModal from "../MiniMapModal";
import API from "../../../../../../API/API";
import Georeference from "../../../../../../models/georeference";

const NewPointSelection = (
  props: Props & {
    showMiniMap: boolean;
    setShowMiniMap: React.Dispatch<React.SetStateAction<boolean>>;
  }
) => {
  const [latitude, setLatitude] = useState(67.85572);
  const [longitude, setLongitude] = useState(20.22513);
  const [listPoint, SetList] = useState<Georeference[]>([]);

  useEffect(() => {
    props.setDocument({
      ...props.document,
      georeference: [
        [Number(latitude.toFixed(5)), Number(longitude.toFixed(5))],
      ],
    });
  }, [latitude, longitude]);

  useEffect(() => {
    API.getGeoreferences(false).then((geo) => {
      SetList(geo);
    });
  }, []);

  return (
    <Form.Group as={Col} className="align-items-center">
      <Row className="geo-box w-100 align-items-center">
        {/* Added align-items-center */}
        <Col>
          <InputGroup className="w-100">
            <InputGroup.Text className="font-size-18">Lat.</InputGroup.Text>
            <Form.Control
              type="number"
              step="0.0001"
              min="67.8200"
              max="67.8900"
              value={Number(latitude.toFixed(5))}
              placeholder="Insert Latitude"
              className="font-size-20"
              required
              disabled
            />
          </InputGroup>
        </Col>
        <Col></Col>
      </Row>
      <Row className="geo-box w-100 align-items-center">
        {" "}
        {/* Added align-items-center */}
        <Col>
          <InputGroup className="w-100">
            <InputGroup.Text className="font-size-18">Lon.</InputGroup.Text>
            <Form.Control
              type="number"
              step="0.0001"
              min="20.1000"
              max="20.3500"
              value={Number(longitude.toFixed(5))}
              placeholder="Insert Longitude"
              className="font-size-20"
              required
              disabled
            />
          </InputGroup>
        </Col>
        <Col></Col>
      </Row>
      {props && props.showMiniMap && (
        <MiniMapModal
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
