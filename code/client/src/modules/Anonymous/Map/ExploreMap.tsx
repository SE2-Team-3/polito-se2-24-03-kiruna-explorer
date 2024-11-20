import { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useSidebar } from "../../../components/SidebarContext";
import "../../style.css";
import API from "../../../API/API";
import Document from "../../../models/document";
import DraggableMarker from "../../UrbanPlanner/MapFeatures/DraggableMarker";

const ExploreMap = () => {
  const { isSidebarOpen } = useSidebar();
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    API.getDocuments().then((docs) => 
      setDocuments(docs));
  }, []);

  

  const kirunaPosition: LatLngExpression = [67.85572, 20.22513]; // Default position (Kiruna)

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
          {documents.map((document) => (
            <DraggableMarker
              key={document.documentId}
              document={document}
              setDocuments={setDocuments}
            />
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default ExploreMap;
