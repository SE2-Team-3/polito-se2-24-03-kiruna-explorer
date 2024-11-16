import { LatLngExpression } from "leaflet";
import React, { useState } from "react";
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
      nodeType: "Design doc.",
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
      nodeType: "Design doc.",
      stakeholders: ["Others"],
      issuanceDate: "2023-01-01",
      language: "Swedish",
      pages: "1",
      georeference: null,
    },
    {
      documentId: 3,
      title: "doc-3",
      description: "doc-3",
      documentType: "Text",
      scale: "Text",
      nodeType: "Prescriptive documen",
      stakeholders: ["Others"],
      issuanceDate: "2022-01-01",
      language: "English",
      pages: "1",
      georeference: [
        [67.8558, 20.2252],
        [67.861, 20.2382],
      ],
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

        <Marker position={kirunaPosition} icon={logoIcon}>
          <Popup autoClose={true} closeButton={true}>
            <div>
              <h1>Kiruna</h1>
              <p>City of Kiruna</p>
            </div>
          </Popup>
        </Marker>

        <MarkerClusterGroup>
          {documents.map((doc, index) => {
            if (!doc) return null;
            if (!doc.georeference)
              return (
                <Marker
                  key={doc.documentId}
                  icon={logoIcon}
                  position={kirunaPosition}
                ></Marker>
              );
            if (doc.georeference.length === 1)
              return (
                <Marker
                  key={doc.documentId}
                  icon={logoIcon}
                  position={L.latLng(
                    doc.georeference[0][0],
                    doc.georeference[0][1]
                  )}
                ></Marker>
              );
          })}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default ExploreMap;
