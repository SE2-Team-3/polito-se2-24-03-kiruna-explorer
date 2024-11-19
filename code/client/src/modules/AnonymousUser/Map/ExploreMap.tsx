import { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import Logo from "../../../assets/icons/Kiruna Icon - 2.svg";
import L from "leaflet";
import { useSidebar } from "../../../components/SidebarContext";
import "../../style.css";
import API from "../../../API/API";
import Document from "../../../models/document";

const ExploreMap = () => {
  const { isSidebarOpen } = useSidebar();
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    API.getDocuments().then((docs) => setDocuments(docs));
  }, []);

  const kirunaPosition: LatLngExpression = [67.85572, 20.22513];
  const logoIcon = new L.Icon({
    iconUrl: Logo,
    iconSize: [40, 40],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <div className={`map-wrapper ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <MapContainer
        attributionControl={false}
        center={kirunaPosition}
        zoom={13}
        minZoom={12}
        zoomControl={true}
        scrollWheelZoom={true}
        className="map-container"
      >
        <TileLayer url="https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}" />
        <TileLayer
          attribution='&copy; <a href="https://www.esri.com/en-us/home">Esri</a>'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
        />

        <MarkerClusterGroup>
          {documents &&
            documents.map((document) => {
              if (!document) return null;
              return (
                <Marker
                  key={document.documentId}
                  icon={logoIcon}
                  position={
                    // No georeference: belong to municipality area (to be modified in KX9)
                    !document.coordinates
                      ? kirunaPosition
                      : // With Georeference: belong to a specific location
                      JSON.parse(document.coordinates).length === 1
                      ? L.latLng(
                          JSON.parse(document.coordinates)[0][0],
                          JSON.parse(document.coordinates)[0][1]
                        )
                      : ([] as any)
                  }
                >
                  <Popup autoClose={true} closeButton={true}>
                    <div>
                      <h5>{document.title}</h5>
                      <p>Description: {document.description}</p>
                      <p>Scale: {document.scale}</p>
                      <p>Type: {document.nodeType}</p>
                      <p>Issuance Date: {document.issuanceDate}</p>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default ExploreMap;
