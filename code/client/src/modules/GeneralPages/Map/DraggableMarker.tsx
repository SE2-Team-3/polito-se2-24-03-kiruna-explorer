import { useMemo, useState, useRef, useContext, useEffect } from "react";
import { Marker, Popup, Polygon } from "react-leaflet";
import L from "leaflet";
import { UserContext } from "../../../components/UserContext";
import Logo from "../../../assets/icons/Kiruna Icon - 2.svg";
import API from "../../../API/API";
import Document from "../../../models/document";
import { useToast } from "../../ToastProvider";
import markers from "../../../models/documentTypeMarkers";

const logoIcon = new L.Icon({
  iconUrl: Logo,
  iconSize: [40, 40],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const kirunaPosition: [number, number] = [67.85572, 20.22513];

interface DraggableMarkerProps {
  document: Document;
  setDocuments: React.Dispatch<React.SetStateAction<Document[]>>;
}

const DraggableMarker = ({ document, setDocuments }: DraggableMarkerProps) => {
  const user = useContext(UserContext);
  const showToast = useToast();

  const isPolygon = useMemo(() => {
    const coords = document.coordinates ? JSON.parse(document.coordinates) : [];
    return coords.length > 1;
  }, [document.coordinates]);

  const [position, setPosition] = useState<[number, number]>(kirunaPosition);
  const [draggable, setDraggable] = useState(false);
  const markerRef = useRef<L.Marker>(null);

  useEffect(() => {
    if (document.coordinates) {
      const coords = JSON.parse(document.coordinates);
      if (isPolygon) {
        const polygon = L.polygon(coords);
        const center = polygon.getBounds().getCenter();
        setPosition([center.lat, center.lng]);
      } else if (coords.length > 0) {
        setPosition([coords[0][0], coords[0][1]]);
      }
    }
  }, [document.coordinates, isPolygon]);

  const handleMoveDocument = (newCoordinates: [number, number]) => {
    if (
      newCoordinates[0] >= 67.82 &&
      newCoordinates[0] <= 67.89 &&
      newCoordinates[1] >= 20.1 &&
      newCoordinates[1] <= 20.35
    ) {
      API.updateDocumentGeoreference(document.documentId, [
        newCoordinates,
      ]).then((response) => {
        const { message } = response;
        setDocuments((prevDocuments) =>
          prevDocuments.map((doc) =>
            doc.documentId === document.documentId
              ? {
                  ...doc,
                  coordinates: JSON.stringify([newCoordinates]),
                }
              : doc
          )
        );
        showToast("Success!", "Georeference updated successfully", false);
      });
    } else {
      showToast(
        "Cannot update coordinates",
        "Please choose coordinates within Kiruna area",
        true
      );
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
          setDraggable(false);
        }
      },
    }),
    [document.documentId]
  );

  const toggleDraggable = () => {
    setDraggable((prev) => !prev);
  };

  return (
    <>
      {isPolygon && document.coordinates && (
        <Polygon
          positions={JSON.parse(document.coordinates)}
          color="#3d52a0"
          fillOpacity={0.5}
          eventHandlers={{
            click: (e) => {
              // Prevent the popup from opening on click of the polygon
              e.originalEvent.stopPropagation();
            },
          }}
        />
      )}
      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={position}
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
              <button
                className="draggable-toggle-btn"
                onClick={toggleDraggable}
              >
                {draggable ? "Stop Moving" : "Update georeference"}
              </button>
            )}
          </div>
        </Popup>
      </Marker>
    </>
  );
};

export default DraggableMarker;
