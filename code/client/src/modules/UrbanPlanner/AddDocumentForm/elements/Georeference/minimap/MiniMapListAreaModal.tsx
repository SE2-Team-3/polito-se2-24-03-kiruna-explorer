import { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { MapContainer, TileLayer, Popup, Polygon } from "react-leaflet";
import "../../../../../style.css";
import API from "../../../../../../API/API";
import Georeference from "../../../../../../models/georeference";

interface Props {
  setPolygonName: (polygonName: string) => void;
  showPolygonMap: boolean;
  setShowPolygonMap: (show: boolean) => void;
  setPolygonCoordinates: (coords: [number, number][]) => void;
}

const MiniMapListAreaModal = ({
  setPolygonName,
  showPolygonMap,
  setShowPolygonMap,
  setPolygonCoordinates,
}: Props) => {
  const [listPoint, SetList] = useState<Georeference[]>([]);

  const kirunaPosition: LatLngExpression = [67.85572, 20.22513];

  const handleClose = () => setShowPolygonMap(false);

  useEffect(() => {
    API.getGeoreferences(true).then((geo) => {
      SetList(geo);
    });
  }, []);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <Modal show={showPolygonMap} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Select an area location</Modal.Title>
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
          {listPoint.map((point, index) => {
            const coords = JSON.parse(point.coordinates);
            const polygonColor = getRandomColor();

            return coords.length > 2 ? (
              <Polygon
                key={index}
                positions={coords}
                pathOptions={{
                  color: "#3d52a0",
                  weight: 3,
                  opacity: 0.7,
                  fillColor: "#3d52a0",
                  fillOpacity: 0.3,
                }}
                eventHandlers={{
                  click: (e) => {
                    const polygonCoords = e.target.getLatLngs()[0];
                    const formattedCoords = polygonCoords.map((coord: any) => [
                      coord.lat,
                      coord.lng,
                    ]);

                    setPolygonCoordinates(formattedCoords);
                    setPolygonName(point.georeferenceName);
                    setShowPolygonMap(false);
                  },
                }}
              ></Polygon>
            ) : null;
          })}
        </MapContainer>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" className="button-small" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MiniMapListAreaModal;
