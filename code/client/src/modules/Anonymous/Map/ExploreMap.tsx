import { LatLngExpression } from "leaflet";
import { useEffect, useState, useMemo, useRef, useContext } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import Logo from "../../../assets/icons/Kiruna Icon - 2.svg";
import L from "leaflet";
import { useSidebar } from "../../../components/SidebarContext";
import "../../style.css";
import API from "../../../API/API";
import Document from "../../../models/document";
import { UserContext } from "../../../components/UserContext";

const ExploreMap = () => {
  const { isSidebarOpen } = useSidebar();
  const [documents, setDocuments] = useState<Document[]>([]);
  const user = useContext(UserContext);

  useEffect(() => {
    API.getDocuments().then((docs) => setDocuments(docs));
  }, []);

  const kirunaPosition: LatLngExpression = [67.85572, 20.22513]; // Default position (Kiruna)
  const logoIcon = new L.Icon({
    iconUrl: Logo,
    iconSize: [40, 40],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const handleMoveDocument = (documentId: number, newCoordinates: [number, number]) => {
    console.log("Calling API to update document", documentId, "with coordinates", newCoordinates);
    // Call the API to update document coordinates
    API.updateDocumentGeoreference(documentId, newCoordinates)
      .then(() => {
        console.log("Coordinates updated successfully");
        // Update the document state to reflect the new coordinates
        setDocuments((prevDocuments) =>
          prevDocuments.map((doc) =>
            doc.documentId === documentId
              ? { ...doc, coordinates: JSON.stringify([[newCoordinates[0], newCoordinates[1]]]) }
              : doc
          )
        );
      })
      .catch((err) => console.error("Error updating coordinates:", err));
  };

  const DraggableMarker = ({ document }: { document: Document }) => {
    const initialPosition = useMemo<[number, number]>(() => {
      if (!document.coordinates) {
        return kirunaPosition as [number, number]; // Default position if no coordinates
      }
      try {
        const coords = JSON.parse(document.coordinates);
        if (Array.isArray(coords) && coords[0] && coords[0].length === 2) {
          return [coords[0][0], coords[0][1]] as [number, number]; // Parse coordinates if valid
        }
      } catch (e) {
        console.error("Error parsing coordinates:", e);
      }
      return kirunaPosition as [number, number]; // Fallback position if coordinates are invalid
    }, [document.coordinates]);

    const [position, setPosition] = useState<[number, number]>(initialPosition);
    const [draggable, setDraggable] = useState(false);
    const markerRef = useRef<L.Marker>(null);

    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current;
          if (marker != null) {
            const newPos = marker.getLatLng();
            const newCoordinates: [number, number] = [newPos.lat, newPos.lng];
            setPosition(newCoordinates);
            handleMoveDocument(document.documentId, newCoordinates);
            setDraggable(false); // Automatically stop dragging after move
          }
        },
      }),
      [document.documentId]
    );

    const toggleDraggable = () => {
      setDraggable((prev) => !prev);
    };

    return (
      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
        icon={logoIcon}
      >
        <Popup autoClose={false} closeButton={true}>
          <div>
            <h5>{document.title}</h5>
            <p>Description: {document.description}</p>
            <p>Scale: {document.scale}</p>
            <p>Type: {document.nodeType}</p>
            <p>Issuance Date: {document.issuanceDate}</p>
            {user && (
            <button onClick={toggleDraggable}>
              {draggable ? "Stop Moving" : "Move"}
            </button>
            )}
          </div>
        </Popup>
      </Marker>
    );
  };

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
            <DraggableMarker key={document.documentId} document={document} />
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default ExploreMap;
