import { useRef, useEffect, useState } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import { MapContainer, TileLayer, FeatureGroup, useMap } from "react-leaflet";
import L, { LatLngBounds } from "leaflet";
import "leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import LocalGeoJSONReader from "../MunicipalityArea";

interface Props {
  showMap: boolean;
  setShowMap: (show: boolean) => void;
  setCoordinates: (coords: [number, number][] | null) => void;
  setGeoType: (value: string) => void;
}

const MiniMapAreaModal = ({
  showMap,
  setShowMap,
  setCoordinates,
  setGeoType,
}: Props) => {
  const featureGroupRef = useRef<L.FeatureGroup | null>(null);
  const [validationMessage, setValidationMessage] = useState("");
  const kirunaBounds: LatLngBounds = new LatLngBounds([
    [67.821, 20.182], // Southwest corner
    [67.89, 20.32], // Northeast corner
  ]);
  const validateLocation = (lat: number, lon: number) => {
    return kirunaBounds.contains([lat, lon]);
  };

  const handleSave = () => {
    const drawnItems = featureGroupRef.current?.toGeoJSON() as any;
    const polygon = drawnItems.features?.[0]?.geometry?.coordinates[0] || [];
    // check if all points are within Kiruna bounds
    const isValid = polygon.every(([lon, lat]: [number, number]) =>
      validateLocation(lat, lon)
    );
    if (!isValid) {
      setValidationMessage(
        "All points of the polygon must be within the Kiruna bounds."
      );
      setShowMap(true);
      return;
    }
    setCoordinates(
      polygon.map((coord: [number, number]) => [coord[1], coord[0]])
    );
    setShowMap(false);
  };

  useEffect(() => {
    setValidationMessage("");
  }, [showMap]);

  const MapWithDrawControl = () => {
    const map = useMap();

    useEffect(() => {
      // Rimuovi controlli esistenti (se presenti)
      map.eachLayer((layer) => {
        if (layer instanceof L.Control.Draw) {
          map.removeControl(layer);
        }
      });

      const drawControl = new L.Control.Draw({
        draw: {
          polygon: {
            allowIntersection: false,
            shapeOptions: {
              color: "#3d52a0",
            },
          },
          polyline: false,
          rectangle: false,
          circle: false,
          marker: false,
          circlemarker: false,
        },
        edit: {
          featureGroup: featureGroupRef.current as L.FeatureGroup,
        },
      });

      map.addControl(drawControl);

      map.on(L.Draw.Event.CREATED, (e: any) => {
        const layer = e.layer;
        featureGroupRef.current?.clearLayers(); // Assicura un solo poligono alla volta
        featureGroupRef.current?.addLayer(layer);
      });

      return () => {
        map.off(L.Draw.Event.CREATED); // Pulizia eventi
        map.removeControl(drawControl); // Rimuovi controllo al dismount
      };
    }, [map]);

    return null;
  };

  const handleClose = () => {
    setShowMap(false);
    setGeoType("Default");
  };

  return (
    <Modal show={showMap} onHide={() => setShowMap(false)} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Select an area on the map</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <MapContainer
          center={[67.85572, 20.22513]} // Posizione iniziale Kiruna
          zoom={13}
          minZoom={12}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer url="https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}" />
          <TileLayer
            attribution='&copy; <a href="https://www.esri.com/en-us/home">Esri</a>'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
          />
          <FeatureGroup ref={featureGroupRef}></FeatureGroup>
          <MapWithDrawControl />
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
        <Button
          variant="primary"
          className="button-small-save"
          onClick={handleSave}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MiniMapAreaModal;
