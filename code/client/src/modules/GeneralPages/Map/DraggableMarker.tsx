import { useMemo, useState, useRef, useContext, useEffect } from "react";
import { Marker, Popup, Polygon } from "react-leaflet"; // Importa Polygon
import L from "leaflet";
import { UserContext } from "../../../components/UserContext";
import Logo from "../../../assets/icons/Kiruna Icon - 2.svg";
import API from "../../../API/API";
import Document from "../../../models/document";
import { useToast } from "../../ToastProvider";

import markers from "../../../models/documentTypeMarkers";

//leaving default icon here just in case there will be a use in future
const logoIcon = new L.Icon({
  iconUrl: Logo,
  iconSize: [40, 40],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const kirunaPosition: [number, number] = [67.85572, 20.22513]; // Default position (Kiruna)

interface DraggableMarkerProps {
  document: Document;
  setDocuments: React.Dispatch<React.SetStateAction<Document[]>>;
}

const DraggableMarker = ({ document, setDocuments }: DraggableMarkerProps) => {
  const user = useContext(UserContext);
  const showToast = useToast();

  // Differenzia tra marker e poligono (modifica in KX9)
  const isPolygon = useMemo(() => {
    const coords = JSON.parse(document.coordinates || "[]");
    return coords.length > 1; // Considera poligono se ci sono più di 1 set di coordinate
  }, [document.coordinates]);

  const initialPosition = useMemo(() => {
    if (!document.coordinates) return kirunaPosition; // Nessuna georeferenza, posizione predefinita
    const coords = JSON.parse(document.coordinates);
    return isPolygon ? coords : L.latLng(coords[0][0], coords[0][1]);
  }, [document.coordinates, isPolygon]);

  const [position, setPosition] = useState(initialPosition);
  const [draggable, setDraggable] = useState(false);
  const markerRef = useRef<L.Marker>(null);

  const handleMoveDocument = (newCoordinates: [number, number]) => {
    if (
      newCoordinates[0] >= 67.82 &&
      newCoordinates[0] <= 67.89 &&
      newCoordinates[1] >= 20.1 &&
      newCoordinates[1] <= 20.35
    ) {
      API.updateDocumentGeoreference(document.documentId, [newCoordinates]).then((response) => {
        const { message } = response;
        setDocuments((prevDocuments) =>
          prevDocuments.map((doc) =>
            doc.documentId === document.documentId
              ? {
                  ...doc,
                  coordinates: JSON.stringify([[newCoordinates[0], newCoordinates[1]]]),
                }
              : doc
          )
        );
        showToast("Success!", "Georeference updated successfully", false);
      });
    } else {
      showToast("Cannot update coordinates", "Please choose coordinates within Kiruna area", true);
    }
  };

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const newPos = marker.getLatLng();
          const newCoordinates: [number, number] = [newPos.lat, newPos.lng];
          setPosition(newCoordinates);
          handleMoveDocument(newCoordinates);
          setDraggable(false); // Automatically stop dragging after move
        }
      },
    }),
    [document.documentId]
  );

  const toggleDraggable = () => {
    setDraggable((prev) => !prev);
  };

  return isPolygon ? (
    <Polygon
      positions={position} // Posizioni del poligono
      color="#3d52a0"
      fillOpacity={0.5}
    >
      <Popup autoClose={false} closeButton={true}>
        <div>
          <h5>{document.title}</h5>
          <p>Description: {document.description}</p>
          <p>Scale: {document.scale}</p>
          <p>Type: {document.nodeType}</p>
          <p>Issuance Date: {document.issuanceDate}</p>
        </div>
      </Popup>
    </Polygon>
  ) : (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position as [number, number]}
      ref={markerRef}
      icon={document.nodeType ? markers.get(document.nodeType) : logoIcon}
    >
      <Popup autoClose={false} closeButton={true}>
        <div>
          <h5>{document.title}</h5>
          <p>Description: {document.description}</p>
          <p>Scale: {document.scale}</p>
          <p>Type: {document.nodeType}</p>
          <p>Issuance Date: {document.issuanceDate}</p>
          {user && (
            <button className="draggable-toggle-btn" onClick={toggleDraggable}>
              {draggable ? "Stop Moving" : "Update georeference"}
            </button>
          )}
        </div>
      </Popup>
    </Marker>
  );
};

export default DraggableMarker;
