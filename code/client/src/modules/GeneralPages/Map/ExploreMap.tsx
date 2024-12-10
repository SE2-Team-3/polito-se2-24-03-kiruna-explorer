import { LatLngExpression } from "leaflet";
import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useSidebar } from "../../../components/SidebarContext";
import "../../style.css";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "./map.css";
import API from "../../../API/API";
import Document from "../../../models/document";
import DraggableMarker from "./DraggableMarker";

interface ExploreMapProps {
  searchTitle: string;
  isViewLinkedDocuments: boolean;
  setIsViewLinkedDocuments: React.Dispatch<React.SetStateAction<boolean>>;
  filteredDocuments: Document[];
  setFilteredDocuments: React.Dispatch<React.SetStateAction<Document[]>>;
}

const ExploreMap = ({
  searchTitle,
  isViewLinkedDocuments,
  setIsViewLinkedDocuments,
  filteredDocuments,
  setFilteredDocuments,
}: ExploreMapProps) => {
  const { isSidebarOpen } = useSidebar();
  const [documents, setDocuments] = useState<Document[]>([]);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    API.getDocuments().then((docs) => {
      setDocuments(docs);
      setFilteredDocuments(docs); // Inizializza con tutti i documenti
    });
  }, []);

  // update documents list based on searchTitle
  useEffect(() => {
    const filtered = documents.filter((doc) =>
      doc.title.toLowerCase().includes(searchTitle.toLowerCase())
    );
    setFilteredDocuments(filtered);
  }, [searchTitle, documents]);

  const kirunaPosition: LatLngExpression = [67.85572, 20.22513]; // Default position (Kiruna)

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(kirunaPosition, 13);
    }
  }, [mapRef.current]);

  return (
    <div className={`map-wrapper ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <MapContainer
        attributionControl={false}
        center={kirunaPosition}
        zoom={14}
        minZoom={12}
        zoomControl={true}
        scrollWheelZoom={true}
        className="map-container"
        ref={mapRef}
      >
        <TileLayer url="https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}" />
        <TileLayer
          attribution='&copy; <a href="https://www.esri.com/en-us/home">Esri</a>'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
        />

        <MarkerClusterGroup>
          {filteredDocuments.map((document) => (
            <DraggableMarker
              key={document.documentId}
              document={document}
              setDocuments={setFilteredDocuments}
              isViewLinkedDocuments={isViewLinkedDocuments}
              setIsViewLinkedDocuments={setIsViewLinkedDocuments}
              mapRef={mapRef}
            />
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default ExploreMap;
