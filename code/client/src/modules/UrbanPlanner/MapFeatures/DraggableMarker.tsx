import { useMemo, useState, useRef, useContext } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { UserContext } from "../../../components/UserContext";
import Logo from "../../../assets/icons/Kiruna Icon - 2.svg";
import API from "../../../API/API";
import Document from "../../../models/document";

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

  const initialPosition = useMemo<[number, number]>(() => {
    if (!document.coordinates) return kirunaPosition;

    try {
      const coords =
        typeof document.coordinates === "string"
          ? JSON.parse(document.coordinates)
          : document.coordinates;

      if (Array.isArray(coords) && coords.length === 2) {
        return coords as [number, number];
      }
    } catch (e) {
      //console.error("Error parsing coordinates:", e);
    }

    return kirunaPosition;
  }, [document.coordinates]);

  const [position, setPosition] = useState<[number, number]>(initialPosition);
  const [draggable, setDraggable] = useState(false);
  const markerRef = useRef<L.Marker>(null);

  const handleMoveDocument = (newCoordinates: [number, number]) => {
    console.log(
      "Calling API to update document",
      document.documentId,
      "with coordinates",
      newCoordinates
    );
    API.updateDocumentGeoreference(document.documentId, newCoordinates).then(
      () => {
        console.log("Coordinates updated successfully");
        setDocuments((prevDocuments) =>
          prevDocuments.map((doc) =>
            doc.documentId === document.documentId
              ? {
                  ...doc,
                  coordinates: JSON.stringify([
                    [newCoordinates[0], newCoordinates[1]],
                  ]),
                }
              : doc
          )
        );
      }
    );
    //.catch((err) => console.error("Error updating coordinates:", err));
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
            <button className="draggable-toggle-btn" onClick={toggleDraggable}>
              {draggable ? "Stop Moving" : "Move"}
            </button>
          )}
        </div>
      </Popup>
    </Marker>
  );
};

export default DraggableMarker;
