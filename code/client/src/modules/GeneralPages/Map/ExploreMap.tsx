import { LatLngExpression } from "leaflet";
import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Polygon, Tooltip } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useSidebar } from "../../../components/SidebarContext";
import "../../style.css";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "./map.css";
import API from "../../../API/API";
import Document from "../../../models/document";
import DraggableMarker from "./DraggableMarker";
import { Button } from "react-bootstrap";
import Georeference from "../../../models/georeference";

interface ExploreMapProps {
  searchTitle: string;
  isViewLinkedDocuments: boolean;
  setIsViewLinkedDocuments: React.Dispatch<React.SetStateAction<boolean>>;
  filteredDocuments: Document[];
  setFilteredDocuments: React.Dispatch<React.SetStateAction<Document[]>>;
  currentLayer: "streets" | "satellite" | "terrain";
}

const ExploreMap = ({
  searchTitle,
  isViewLinkedDocuments,
  setIsViewLinkedDocuments,
  filteredDocuments,
  setFilteredDocuments,
  currentLayer,
}: ExploreMapProps) => {
  const { isSidebarOpen } = useSidebar();
  const [documents, setDocuments] = useState<Document[]>([]);
  const mapRef = useRef<L.Map | null>(null);
  const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null);
  const [showAreas, setShowAreas] = useState<boolean>(false);
  const [listArea, setList] = useState<Georeference[]>([]);

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

  const ShowAreasOnMap = () => {
    setShowAreas(!showAreas);
  };

  // Definizione dei layer disponibili
  const tileLayers = {
    streets: {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
    satellite: {
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
      attribution: '&copy; <a href="https://www.esri.com/en-us/home">Esri</a>',
    },
    terrain: {
      url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
      attribution: '&copy; <a href="https://opentopomap.org">OpenTopoMap</a>',
    },
  };

  return (
    <div className={`map-wrapper ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <Button
        variant="primary"
        className={`button-map ${showAreas ? "show" : "hide"}`}
        onClick={() => ShowAreasOnMap()}
        style={{
          position: "absolute",
          top: "20px",
          right: "110px",
          zIndex: 1000,
        }}
      >
        {showAreas ? "Hide Areas" : "Show Areas"}
      </Button>
      <MapContainer
        attributionControl={false}
        center={kirunaPosition}
        zoom={14}
        minZoom={8}
        zoomControl={true}
        scrollWheelZoom={true}
        className="map-container"
        ref={mapRef}
      >
        {currentLayer === "satellite" && (
          <TileLayer url="https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}" />
        )}
        {/* TileLayer dinamico basato sullo stato */}
        <TileLayer
          url={tileLayers[currentLayer].url}
          attribution={tileLayers[currentLayer].attribution}
        />

        {/* MarkerClusterGroup per raggruppare i marker vicini */}
        <MarkerClusterGroup>
          {filteredDocuments.map((document) => (
            <DraggableMarker
              key={document.documentId}
              document={document}
              setDocuments={setFilteredDocuments}
              isViewLinkedDocuments={isViewLinkedDocuments}
              setIsViewLinkedDocuments={setIsViewLinkedDocuments}
              mapRef={mapRef}
              selectedMarkerId={selectedMarkerId}
              setSelectedMarkerId={setSelectedMarkerId}
            />
          ))}
        </MarkerClusterGroup>
        {showAreas &&
          listArea.map((area, index) => {
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
              >
                <Tooltip sticky direction="top" opacity={1}>
                  {area.georeferenceName}
                </Tooltip>
              </Polygon>
            ) : null;
          })}
      </MapContainer>
    </div>
  );
};

export default ExploreMap;
