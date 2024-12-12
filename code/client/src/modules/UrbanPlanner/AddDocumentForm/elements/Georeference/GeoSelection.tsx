import { Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../../../../style.css";
import MiniMapPointModal from "./minimap/MiniMapPointModal";
import MiniMapAreaModal from "./minimap/MiniMapAreaModal";
import MiniMapListPointModal from "./minimap/MiniMapListPointModal";
import MiniMapListAreaModal from "./minimap/MiniMapListAreaModal";
import { Props } from "../../interfaces/types";
import ClearIcon from "../../../../../assets/icons/close.svg";

interface GeoSelectionProps extends Props {
  geoType: string;
  setGeoType: (value: string) => void;
  showMap: boolean;
  setShowMap: React.Dispatch<React.SetStateAction<boolean>>;
}

const GeoSelection: React.FC<GeoSelectionProps> = ({
  geoType,
  setGeoType,
  showMap,
  setShowMap,
  ...props
}) => {
  const [name, setName] = useState("");
  const [coordinates, setCoordinates] = useState<[number, number][] | null>(
    null
  );
  const [color, setColor] = useState("#3d52a0");

  const isPoint = geoType.includes("Point");
  const isMunicipality = geoType.includes("Municipality");
  const isEditableName = geoType === "NewArea";

  useEffect(() => {
    props.setDocument({
      ...props.document,
      georeference: coordinates,
      ...(geoType.includes("Area") && {
        georeferenceName: name || undefined,
        areaColor: color,
      }),
    });
  }, [coordinates, name, color]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  const handleDeselect = () => {
    setGeoType("Default");
    setCoordinates(null);
  };

  const renderModal = () => {
    const modalProps = {
      showMap,
      setShowMap,
      setCoordinates,
      setName,
      setGeoType,
    };

    switch (geoType) {
      case "NewPoint":
        return <MiniMapPointModal {...modalProps} />;
      case "NewArea":
        return <MiniMapAreaModal {...modalProps} />;
      case "ListOfPoints":
        return <MiniMapListPointModal {...modalProps} />;
      case "ListOfAreas":
        return <MiniMapListAreaModal {...modalProps} />;
      default:
        return null;
    }
  };

  return (
    <Form.Group as={Col} className="align-items-center">
      <Row className="geo-box w-100 align-items-center">
        {!isPoint && !isMunicipality && (
          <Col>
            <InputGroup className="w-100">
              <Form.Control
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="Enter area name"
                className="font-size-20"
                required
                disabled={!isEditableName}
              />
            </InputGroup>
          </Col>
        )}
        {!isPoint && !isMunicipality && (
          <Col md="auto" className="col-color-wheel">
            <InputGroup className="input-color-wheel">
              <Form.Control
                type="color"
                value={color}
                onChange={handleColorChange}
                className="form-color-wheel"
              />
            </InputGroup>
          </Col>
        )}
        {isPoint && coordinates ? (
          <>
            <Col xs="auto">
              <label className="black-text">Lat</label>
            </Col>
            <Col xs="auto">
              <label className="black-text-coord">{coordinates[0][0]}</label>
            </Col>
            <Col xs="auto">
              <label className="black-text">Long</label>
            </Col>
            <Col xs="auto">
              <label className="black-text-coord">{coordinates[0][1]}</label>
            </Col>
          </>
        ) : (
          <></>
        )}
        {isMunicipality && (
          <p className="text-success">Municipality area selected</p>
        )}
        <Col className="mt-1" xs="auto">
          <Button className="clear-button" onClick={handleDeselect}>
            <img src={ClearIcon} alt="Clear" />
          </Button>
        </Col>
      </Row>
      {showMap && renderModal()}
    </Form.Group>
  );
};

export default GeoSelection;
