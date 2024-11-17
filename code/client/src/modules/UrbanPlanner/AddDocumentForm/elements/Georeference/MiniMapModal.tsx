import { LatLngBounds, LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";

interface Props {
  showMiniMap: boolean;
  setShowMiniMap: (show: boolean) => void;
  setLatitude: (lat: number) => void;
  setLongitude: (lon: number) => void;
}

const MiniMapModal = ({
  showMiniMap,
  setShowMiniMap,
  setLatitude,
  setLongitude,
}: Props) => {
  const [validationMessage, setValidationMessage] = useState("");

  const kirunaPosition: LatLngExpression = [67.85572, 20.22513];
  const kirunaBounds: LatLngBounds = new LatLngBounds([
    [67.821, 20.182], // Southwest corner
    [67.89, 20.268], // Northeast corner
  ]);

  const handleClose = () => setShowMiniMap(false);

  const validateLocation = (lat: number, lon: number) => {
    return kirunaBounds.contains([lat, lon]);
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        if (validateLocation(e.latlng.lat, e.latlng.lng)) {
          setLatitude(e.latlng.lat);
          setLongitude(e.latlng.lng);
          setShowMiniMap(false);
        } else {
          setValidationMessage("Please select a location within Kiruna");
          setShowMiniMap(true);
        }
      },
    });

    return null;
  };

  useEffect(() => {
    setValidationMessage("");
  }, [showMiniMap]);

  return (
    <Modal show={showMiniMap} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Please Select a location on the map</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <MapContainer
          center={kirunaPosition}
          attributionControl={false}
          zoom={13}
          minZoom={12}
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
        </MapContainer>
        {validationMessage && (
          <Alert variant="danger" className="mt-3">
            {validationMessage}
          </Alert>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MiniMapModal;
