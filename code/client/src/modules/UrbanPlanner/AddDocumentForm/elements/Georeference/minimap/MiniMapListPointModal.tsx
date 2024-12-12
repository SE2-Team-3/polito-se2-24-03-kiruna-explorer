import { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import Logo from "../../../../../../assets/icons/Kiruna Icon - 2.svg";
import "../../../../../style.css";
import API from "../../../../../../API/API";
import Georeference from "../../../../../../models/georeference";

interface Props {
  showMap: boolean;
  setShowMap: (show: boolean) => void;
  setCoordinates: (coords: [number, number][]) => void;
  setGeoType: (value: string) => void;
}

const MiniMapListPointModal = ({
  showMap,
  setShowMap,
  setCoordinates,
  setGeoType,
}: Props) => {
  const [listPoint, SetList] = useState<Georeference[]>([]);

  const kirunaPosition: LatLngExpression = [67.85572, 20.22513];

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
    API.getGeoreferences(false).then((geo) => {
      SetList(geo);
    });
  }, []);

  return (
    <Modal show={showMap} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Select one point location</Modal.Title>
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
          {listPoint.map((point, index) => {
            const coords = JSON.parse(point.coordinates);

            return coords.map((coord: any, idx: number) => {
              const [lat, lng] = coord;

              return (
                <Marker
                  key={`${index}-${idx}`}
                  position={[lat, lng]}
                  icon={logoIcon}
                  eventHandlers={{
                    click: () => {
                      setCoordinates([[lat, lng]]);
                      setShowMap(false);
                    },
                  }}
                ></Marker>
              );
            });
          })}{" "}
        </MapContainer>
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

export default MiniMapListPointModal;
