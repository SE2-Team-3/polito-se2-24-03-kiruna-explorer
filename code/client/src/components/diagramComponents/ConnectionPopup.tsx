import React, { useState } from "react";
import { useToast } from "../../modules/ToastProvider";
import { Edge } from "@xyflow/react";
import API from "../../API/API";
import { Button, Col, Form, Row } from "react-bootstrap";
import Connection from "../../models/Connection";

interface PopupProps {
  newConnection: Connection;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  setConnectionPopupVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setNewConnection: React.Dispatch<React.SetStateAction<Connection>>;
}

const ConnectionPopup: React.FC<PopupProps> = ({
  newConnection,
  setEdges,
  setConnectionPopupVisible,
  setNewConnection,
}) => {
  const showToast = useToast();
  const [linkType, setLinkType] = useState<string>("");

  const handleSaveConnection = async () => {
    if (!linkType) {
      showToast("Please select a connection type", "", true);
      return;
    }

    try {
      // Save new edge in the backend
      const response = await API.linkDocuments(
        newConnection.documentId1,
        newConnection.documentId2,
        linkType
      );
      const { message, data } = response;
      showToast(message, "", false);

      // Update edges
      const newEdge = {
        id: `${data.documentId1}-${data.documentId2}`,
        source: data.documentId1.toString(),
        target: data.documentId2.toString(),
        type: data.linkType,
      };
      setEdges((prevEdges) => [...prevEdges, newEdge]);

      // Fetch all connections and update the edges
      const updateConnections: Connection[] = await API.getConnections();
      const connectionsMap: Record<string, string[]> = {};

      updateConnections.forEach((connection) => {
        const pairKey = `${connection.documentId1}-${connection.documentId2}`;
        if (!connectionsMap[pairKey]) {
          connectionsMap[pairKey] = [];
        }
        connectionsMap[pairKey].push(connection.connection);
      });

      const updateEdges: Edge[] = Object.entries(connectionsMap).map(
        ([pairKey, linkTypes]) => {
          const [source, target] = pairKey.split("-");
          return linkTypes.length === 1
            ? {
                id: `${source}-${target}-${linkTypes[0]}`,
                source,
                target,
                type: linkTypes[0],
                data: { linkTypes },
                zIndex: 4,
              }
            : {
                id: `${source}-${target}-default`,
                source,
                target,
                type: "default",
                data: { linkTypes, label: `${linkTypes.length} connections` },
                zIndex: 4,
              };
        }
      );

      setEdges(updateEdges);
      setConnectionPopupVisible(false);
    } catch (error) {
      //console.error("Error while saving the connection:", error);
      showToast(
        "Error saving the connection",
        "This connection already exists or something went wrong",
        true
      );
    }
  };

  const handleCancel = () => {
    setConnectionPopupVisible(false);
    setNewConnection({ documentId1: 0, documentId2: 0, connection: "" });
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "white",
        padding: "20px",
        borderRadius: "8px",
        border: "2px solid #3d52a0",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        zIndex: 9999,
      }}
    >
      <h3>Select one connection type:</h3>
      <Row>
        <Col>
          <Form.Check
            type="radio"
            label="Direct consequence"
            value="direct consequence"
            checked={linkType === "direct consequence"}
            onChange={(e) => setLinkType(e.target.value)}
          />
          <Form.Check
            type="radio"
            label="Collateral consequence"
            value="collateral consequence"
            checked={linkType === "collateral consequence"}
            onChange={(e) => setLinkType(e.target.value)}
          />
          <Form.Check
            type="radio"
            label="Prevision"
            value="prevision"
            checked={linkType === "prevision"}
            onChange={(e) => setLinkType(e.target.value)}
          />
          <Form.Check
            type="radio"
            label="Update"
            value="update"
            checked={linkType === "update"}
            onChange={(e) => setLinkType(e.target.value)}
          />
        </Col>
      </Row>
      <Row className="row-box-button">
        <Button onClick={handleCancel} className="button-white mt-3 me-3">
          Cancel
        </Button>
        <Button onClick={handleSaveConnection} className="button-blue mt-3">
          Submit
        </Button>
      </Row>
    </div>
  );
};

export default ConnectionPopup;
