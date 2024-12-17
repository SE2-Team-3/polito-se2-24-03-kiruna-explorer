import React, { useState } from "react";
import { useToast } from "../../modules/ToastProvider";
import { Button, Col, Form, Row } from "react-bootstrap";
import {
  handleSaveConnection,
  handleCancel,
} from "./utils/ConnectionPopupHandlers";
import Connection from "../../models/Connection";
import { Edge } from "@xyflow/react";

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

  const resetState = () => {
    setNewConnection({ documentId1: 0, documentId2: 0, connection: "" });
    setLinkType("");
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
      <h3 style={{ marginBottom: "20px" }}>Select one connection type:</h3>
      <Row>
        <Col>
          <Form.Check
            type="radio"
            label="Direct consequence"
            value="direct consequence"
            className="radio-button"
            checked={linkType === "direct consequence"}
            onChange={(e) => setLinkType(e.target.value)}
          />
          <Form.Check
            type="radio"
            label="Collateral consequence"
            value="collateral consequence"
            className="radio-button"
            checked={linkType === "collateral consequence"}
            onChange={(e) => setLinkType(e.target.value)}
          />
          <Form.Check
            type="radio"
            label="Prevision"
            value="prevision"
            className="radio-button"
            checked={linkType === "prevision"}
            onChange={(e) => setLinkType(e.target.value)}
          />
          <Form.Check
            type="radio"
            label="Update"
            value="update"
            className="radio-button"
            checked={linkType === "update"}
            onChange={(e) => setLinkType(e.target.value)}
          />
        </Col>
      </Row>
      <Row className="row-box-button">
        <Button
          onClick={() => handleCancel(setConnectionPopupVisible, resetState)}
          className="button-white mt-3 me-5"
        >
          Cancel
        </Button>
        <Button
          onClick={() =>
            handleSaveConnection(
              linkType,
              newConnection,
              setEdges,
              setConnectionPopupVisible,
              showToast
            )
          }
          className="button-blue mt-3"
        >
          Submit
        </Button>
      </Row>
    </div>
  );
};

export default ConnectionPopup;
