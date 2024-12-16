import React, { useContext } from "react";
import { Button, Row } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { useToast } from "../../modules/ToastProvider";
import { UserContext } from "../../components/UserContext";
import { handleDeleteConnection, handleCancel } from "./utils/EdgePopupHandlers";
import Connection from "../../models/Connection";
import { Edge } from "@xyflow/react";

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
      <h3 style={{ marginBottom: "20px" }}>
      {linkTypes.length === 1 ? "Connection Type" : "Connection Types"}
      </h3>
      <ul
       className="font-size-20"
       style={{ marginRight: "25px", marginBottom: "14px"}}
        >
        {linkTypes.map((linkType, index) => (
          <li
           key={index}
           style={{alignItems: "center",marginBottom: "14px", }}
           >
            <span style={{ flex: 1 }}>{linkType}</span>
             {user && (
               <BsTrash
                size={14}
                type="button"
                className="popup-remove-link-button"
                style={{cursor: "pointer"}}
                onClick={() =>
                handleDeleteConnection(
                linkType,
                deleteConnection,
                setEdges,
                setPopupVisible,
                showToast
               )
               }
             />
              )}
          </li>
          ))}
       </ul>

      <Row className="row-box-button">
        <Button
          onClick={() => handleCancel(setPopupVisible, setDeleteConnection)}
          className="button-white mt-3"
        >
          Close
        </Button>
      </Row>
    </div>
  );
};

export default EdgePopup;
