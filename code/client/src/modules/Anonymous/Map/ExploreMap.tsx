import { LatLngExpression } from "leaflet";
import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import Logo from "../../../assets/icons/logo.svg";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const ExploreMap = () => {
  const [documents, setDocuments] = useState([
    {
      documentId: 1,
      title: "Kiruna Masterplan",
      description: "The masterplan for the city of Kiruna",
      documentType: "Text",
      scale: "Text",
      nodeType: "Design document.",
      stakeholders: ["Municipality", "Architecture firms"],
      issuanceDate: "2021-01-01",
      language: "English",
      pages: "1-42",
      georeference: [[67.8557, 20.2253]],
    },
    {
      documentId: 2,
      title: "Kiruna Church",
      description: "The church of Kiruna",
      documentType: "Plan",
      scale: "1:5000",
      nodeType: "Design document.",
      stakeholders: ["Others"],
      issuanceDate: "2023-01-01",
      language: "Swedish",
      pages: "1",
      georeference: null,
    },
    {
      documentId: 3,
      title: "document-3",
      description: "document-3",
      documentType: "Text",
      scale: "Text",
      nodeType: "Prescriptive documen",
      stakeholders: ["Others"],
      issuanceDate: "2022-01-01",
      language: "English",
      pages: "1",
      georeference: [[67.868, 20.2252]],
    },
    {
      documentId: 4,
      title: "document-4",
      description: "document-4",
      documentType: "Text",
      scale: "Text",
      nodeType: "Prescriptive documen",
      stakeholders: ["Others"],
      issuanceDate: "2024-01-01",
      language: "English",
      pages: "1",
      georeference: [[67.856, 20.25]],
    },
    {
      documentId: 5,
      title: "document-5",
      description: "document-5",
      documentType: "Text",
      scale: "Text",
      nodeType: "Prescriptive documen",
      stakeholders: ["Architecture firms"],
      issuanceDate: "2024-02-01",
      language: "English",
      pages: "1",
      georeference: [[67.85, 20.22]],
    },
  ]);
  const kirunaPosition: LatLngExpression = [67.85572, 20.22513];
  const logoIcon = new L.Icon({
    iconUrl: Logo,
    iconSize: [40, 40],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <div className="map-wrapper">
      <MapContainer
        attributionControl={false}
        center={kirunaPosition}
        zoom={13}
        minZoom={12}
        zoomControl={true}
        scrollWheelZoom={true}
        className="map-container"
        style={{
          minHeight: "calc(100vh - 100px)",
        }}
      >
        <TileLayer url="https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}" />
        <TileLayer
          attribution='&copy; <a href="https://www.esri.com/en-us/home">Esri</a>'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
        />

        <MarkerClusterGroup>
          {documents.map((document) => {
            if (!document) return null;
            // No georeference (belong to municipality area)
            if (!document.georeference)
              return (
                <Marker
                  key={document.documentId}
                  icon={logoIcon}
                  position={kirunaPosition}
                >
                  <Popup autoClose={true} closeButton={true}>
                    <div>
                      <h5>Title: {document.title}</h5>
                      <p>Description: {document.description}</p>
                      <p>documentType: {document.documentType}</p>
                      <p>scale: {document.scale}</p>
                      <p>nodeType: {document.nodeType}</p>
                      <p>stakeholders: {document.stakeholders}</p>
                      <p>issuanceDate: {document.issuanceDate}</p>
                      <p>language: {document.language}</p>
                      <p>pages: {document.pages}</p>
                    </div>
                  </Popup>
                </Marker>
              );
            // Georeference (belong to a specific area)
            if (document.georeference.length === 1)
              return (
                <Marker
                  key={document.documentId}
                  icon={logoIcon}
                  position={L.latLng(
                    document.georeference[0][0],
                    document.georeference[0][1]
                  )}
                >
                  <Popup autoClose={true} closeButton={true}>
                    <div>
                      <h5>Title: {document.title}</h5>
                      <p>Description: {document.description}</p>
                      <p>documentType: {document.documentType}</p>
                      <p>scale: {document.scale}</p>
                      <p>nodeType: {document.nodeType}</p>
                      <p>stakeholders: {document.stakeholders}</p>
                      <p>issuanceDate: {document.issuanceDate}</p>
                      <p>language: {document.language}</p>
                      <p>pages: {document.pages}</p>
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
