import { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import "../../../../../style.css";
import API from "../../../../../../API/API";
import Georeference from "../../../../../../models/georeference";

interface Props {
  setName: (polygonName: string) => void;
  showMap: boolean;
  setShowMap: (show: boolean) => void;
  setCoordinates: (coords: [number, number][]) => void;
  setGeoType: (value: string) => void;
}

const MiniMapListAreaModal = ({
  setName,
  showMap,
  setShowMap,
  setCoordinates,
  setGeoType,
}: Props) => {
  const [listArea, setList] = useState<Georeference[]>([]);

  const kirunaPosition: LatLngExpression = [67.85572, 20.22513];

  useEffect(() => {
    API.getGeoreferences(true).then((geo) => {
      setList(
        geo.reduce((acc: Georeference[], current: Georeference) => {
          const coord = JSON.parse(current.coordinates);
          if (
            !acc.some(
              (area) =>
                JSON.stringify(area.coordinates) === JSON.stringify(coord)
            )
          ) {
            acc.push(current);
          }
          return acc;
        }, [])
      );
    });
  }, []);

  const handleClose = () => {
    setShowMap(false);
    setGeoType("Default");
  };

  return (
    <Modal show={showMap} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Select an area location</Modal.Title>
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
          {listArea.map((area, index) => {
            const coords = JSON.parse(area.coordinates);

            return coords.length > 2 ? (
              <Polygon
                key={`${index}-${area.georeferenceId}`}
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
                    const polygonCoords: L.LatLng[] = e.target.getLatLngs()[0];
                    const firstCoord: L.LatLng = e.target.getLatLngs()[0][0];

                    const concatenatedCoords: L.LatLng[] = [
                      ...polygonCoords,
                      firstCoord,
                    ];

                    const formattedCoords: [number, number][] =
                      concatenatedCoords.map((coord) => [coord.lat, coord.lng]);

                    setCoordinates(formattedCoords);
                    setName(area.georeferenceName);
                    setShowMap(false);
                  },
                }}
              ></Polygon>
            ) : null;
          })}
        </MapContainer>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          className="button-small-cancel"
          onClick={handleClose}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MiniMapListAreaModal;
