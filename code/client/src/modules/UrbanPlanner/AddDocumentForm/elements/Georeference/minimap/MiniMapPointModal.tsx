import { LatLngExpression, LatLng } from "leaflet";
import { useEffect, useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Polygon,
} from "react-leaflet";
import L from "leaflet";
import Logo from "../../../../../../assets/icons/Kiruna Icon - 2.svg";
import "../../../../../style.css";
import LocalGeoJSONReader from "../MunicipalityArea";
import { validateLocation } from "./Validation";

interface Props {
  showMap: boolean;
  setShowMap: (show: boolean) => void;
  setCoordinates: (coords: [number, number][]) => void;
  setGeoType: (value: string) => void;
}

const MiniMapPointModal = ({
  showMap,
  setShowMap,
  setCoordinates,
  setGeoType,
}: Props) => {
  const [validationMessage, setValidationMessage] = useState("");

  const kirunaPosition: LatLngExpression = [67.85572, 20.22513];
  const [municipalityArea, setMunicipalityArea] = useState<
    LatLngExpression[][]
  >([]);

  const [cursorPosition, setCursorPosition] = useState<LatLng | null>(null);
  const logoIcon = new L.Icon({
    iconUrl: Logo,
    iconSize: [40, 40],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const handleClose = () => {
    setShowMap(false);
    setGeoType("Default");
  };

  useEffect(() => {
    const geoJsonData = LocalGeoJSONReader(); // Assuming this returns number[][][][]
    const allCoordinatesPerMultiPolygon: [number, number][][] = []; // Array di array di coordinate

    geoJsonData.forEach((multiPolygon) => {
      const singleMultiPolygonCoordinates: [number, number][] = []; // Coordinate per il multi-poligono corrente

      if (Array.isArray(multiPolygon)) {
        multiPolygon.forEach((polygon) => {
          if (Array.isArray(polygon)) {
            polygon.forEach((coord) => {
              if (Array.isArray(coord) && coord.length === 2) {
                const [lon, lat] = coord;
                singleMultiPolygonCoordinates.push([lat, lon]); // Invertito lat e lon
              }
            });
          }
        });
      }

      allCoordinatesPerMultiPolygon.push(singleMultiPolygonCoordinates);
    });
    setMunicipalityArea(allCoordinatesPerMultiPolygon);
  }, []);

  const LocationMarker = () => {
    useMapEvents({
      mousemove(e) {
        setCursorPosition(e.latlng);
      },
      click(e) {
        if (validateLocation(municipalityArea, e.latlng.lat, e.latlng.lng)) {
          setCoordinates([[e.latlng.lat, e.latlng.lng]]);
          setShowMap(false);
        } else {
          setValidationMessage("Please select a location within Kiruna.");
          setShowMap(true);
        }
      },
    });

    return null;
  };
  useEffect(() => {
    setValidationMessage("");
  }, [showMap]);

  return (
    <Modal show={showMap} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Select a location on the map</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <MapContainer
          center={kirunaPosition}
          attributionControl={false}
          zoom={12}
          minZoom={7}
          zoomControl={true}
          scrollWheelZoom={true}
          style={{ height: "400px", maxHeight: "400px", width: "100%" }}
        >
          <TileLayer url="https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}" />
          <TileLayer
            attribution='&copy; <a href="https://www.esri.com/en-us/home">Esri</a>'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
          />
          <LocationMarker />
          {cursorPosition && (
            <Marker position={cursorPosition} icon={logoIcon} />
          )}
          {municipalityArea.map((polygonCoords, index) => (
            <Polygon
              key={`polygon-${index}`}
              positions={polygonCoords}
              pathOptions={{
                color: "#3d52a0",
                weight: 3,
                opacity: 1,
                fillColor: "transparent",
                fillOpacity: 0,
              }}
            />
          ))}
        </MapContainer>
        {validationMessage && (
          <Alert variant="danger" className="mt-3">
            {validationMessage}
          </Alert>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          className="button-small"
          onClick={handleClose}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MiniMapPointModal;
