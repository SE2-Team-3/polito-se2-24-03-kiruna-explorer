import { Row, Col, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../../../../style.css";
import { Props } from "../../interfaces/types";
import GeoSelection from "./GeoSelection";
import ClearIcon from "../../../../../assets/icons/close.svg";

const GeoreferenceTypeSelection = (props: Props) => {
  const [geoType, setGeoType] = useState("Default");
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    if (geoType === "Default") {
      props.setDocument({
        ...props.document,
        georeference: null,
      });
    }
  }, [geoType]);

  const handleGeoSelection = (value: string) => {
    setGeoType(value);
    setShowMap(
      ["NewPoint", "ListOfPoints", "NewArea", "ListOfAreas"].includes(value)
    );
  };

  const handleDeselect = () => setGeoType("Default");

  const ClearButton = () => (
    <Col className="mt-1" xs="auto">
      <Button className="clear-button" onClick={handleDeselect}>
        <img src={ClearIcon} alt="Clear" />
      </Button>
    </Col>
  );

  const renderGeoTypeOptions = () => {
    const options: Record<string, { id: string; label: string }> = {
      Point: { id: "georeference-point", label: "Point" },
      Polygon: { id: "georeference-polygon", label: "Area" },
    };

    return (
      <Row>
        {Object.entries(options).map(([value, { id, label }]) => (
          <Col key={id} xs="auto">
            <Form.Check
              type="radio"
              id={id}
              label={label}
              name="georeference"
              value={value}
              onChange={(e) => handleGeoSelection(e.target.value)}
              className="font-size-20"
              required
            />
          </Col>
        ))}
      </Row>
    );
  };

  const renderSubOptions = (options: { id: string; label: string }[]) => (
    <Row>
      {options.map(({ id, label }) => (
        <Col key={id} className="mt-2" xs="auto">
          <Form.Check
            type="radio"
            id={id}
            label={label}
            name="georeference"
            value={id}
            onChange={(e) => handleGeoSelection(e.target.value)}
            className="font-size-20"
            required
          />
        </Col>
      ))}
      <ClearButton />
    </Row>
  );

  return (
    <Form.Group as={Col} controlId="formGridGeoType">
      <Form.Label className="black-text">Georeference</Form.Label>
      {geoType === "Default" && renderGeoTypeOptions()}
      {geoType === "Point" &&
        renderSubOptions([
          { id: "NewPoint", label: "New point" },
          { id: "ListOfPoints", label: "List of points" },
        ])}
      {geoType === "Polygon" &&
        renderSubOptions([
          { id: "NewArea", label: "New area" },
          { id: "ListOfAreas", label: "List of areas" },
          { id: "Municipality", label: "Municipality Area" },
        ])}
      {geoType !== "Default" &&
        geoType !== "Point" &&
        geoType !== "Polygon" && (
          <GeoSelection
            {...props}
            geoType={geoType}
            setGeoType={setGeoType}
            showMap={showMap}
            setShowMap={setShowMap}
          />
        )}
    </Form.Group>
  );
};

export default GeoreferenceTypeSelection;
