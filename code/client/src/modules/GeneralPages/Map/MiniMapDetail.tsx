import { LatLngExpression } from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import Logo from "../../../assets/icons/Kiruna Icon - 2.svg";
import "../../style.css";

interface Props {
  coordinates: [number, number][];
}

const MiniMapDetail = ({ coordinates }: Props) => {
  const logoIcon = new L.Icon({
    iconUrl: Logo,
    iconSize: [40, 40],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const calculatePolylineCenter = (coords: [number, number][]) => {
    const latSum = coords.reduce((acc, [lat]) => acc + lat, 0);
    const lngSum = coords.reduce((acc, [, lng]) => acc + lng, 0);
    return [latSum / coords.length, lngSum / coords.length] as LatLngExpression;
  };

  const MapZoom = () => {
    const map = useMap();

    if (coordinates.length > 0) {
      if (coordinates.length === 1) {
        // For single point, set zoom to 15
        map.setView(coordinates[0], 15);
      } else {
        // For polyline
        const bounds = L.latLngBounds(coordinates);
        map.fitBounds(bounds, { padding: [10, 10] });

        const polylineCenter = calculatePolylineCenter(coordinates);
        map.setView(polylineCenter, 14); // Set zoom level 13
      }
    }

    return null;
  };

  return (
    <MapContainer
      attributionControl={false}
      minZoom={11}
      zoomControl={true}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}" />
      <TileLayer
        attribution='&copy; <a href="https://www.esri.com/en-us/home">Esri</a>'
        url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
      />

      <MapZoom />

      {coordinates.length === 1 && (
        <Marker position={coordinates[0]} icon={logoIcon} />
      )}

      {coordinates.length > 1 && (
        <Polyline positions={coordinates} color="red" weight={3} />
      )}
    </MapContainer>
  );
};

export default MiniMapDetail;
