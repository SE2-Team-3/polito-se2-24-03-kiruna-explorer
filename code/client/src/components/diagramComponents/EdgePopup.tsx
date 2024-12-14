import React, { useContext } from "react";
import API from "../../API/API";
import { Button, Row } from "react-bootstrap";
import { Edge } from "@xyflow/react";
import { useToast } from "../../modules/ToastProvider";
import Connection from "../../models/Connection";
import { UserContext } from "../../components/UserContext";
import { BsTrash } from "react-icons/bs";

interface PopupProps {
  linkTypes: string[];
  setPopupVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  deleteConnection: Connection;
  setDeleteConnection: React.Dispatch<React.SetStateAction<Connection>>;
}

const EdgePopup: React.FC<PopupProps> = ({
  linkTypes,
  setPopupVisible,
  setEdges,
  deleteConnection,
  setDeleteConnection,
}) => {
  const showToast = useToast();
  const user = useContext(UserContext);

  const handleDeleteConnection = async (linkType: string) => {
    try {
      // Call API to delete the connection
      const response = await API.unlinkDocuments(
        deleteConnection.documentId1,
        deleteConnection.documentId2,
        linkType
      );
      const { message } = response;
      showToast(message, "", false);

      // Update edges: remove the deleted edge
      setEdges((prevEdges) =>
        prevEdges.filter((edge) => edge.type !== linkType)
      );

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

      setPopupVisible(false);
    } catch (error) {
      showToast(
        "Error deleting the connection",
        "This connection could not be removed or something went wrong",
        true
      );
    }
  };

  const handleCancel = () => {
    setPopupVisible(false);
    setDeleteConnection({ documentId1: 0, documentId2: 0, connection: "" });
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
      <h3>{linkTypes.length === 1 ? "Connection Type" : "Connection Types"}</h3>
      <ul className="font-size-20" style={{ marginRight: "25px" }}>
        {linkTypes.map((linkType, index) => (
          <li key={index}>
            {linkType}
            {user ? (
              <BsTrash
                size={10}
                type="button"
                style={{ cursor: "pointer" }}
                onClick={() => handleDeleteConnection(linkType)}
                className="popup-remove-link-button"
              />
            ) : (
              <></>
            )}
          </li>
        ))}
      </ul>
      <Row className="row-box-button">
        <Button onClick={handleCancel} className="button-white mt-3">
          Close
        </Button>
      </Row>
    </div>
  );
};

export default EdgePopup;
