import { Dispatch, SetStateAction } from "react";
import API from "../../../API/API";
import { Edge } from "@xyflow/react";
import Connection from "../../../models/Connection";
import { fetchAndUpdateEdges } from "./ConnectionUtils";
import { useToast } from "../../../modules/ToastProvider";

export const handleDeleteConnection = async (
  linkType: string,
  deleteConnection: Connection,
  setEdges: Dispatch<SetStateAction<Edge[]>>,
  setPopupVisible: Dispatch<SetStateAction<boolean>>,
  showToast: ReturnType<typeof useToast>
) => {
  try {
    const response = await API.unlinkDocuments(
      deleteConnection.documentId1,
      deleteConnection.documentId2,
      linkType
    );
    showToast(response.message, "", false);

    // Update edges by removing the deleted connection
    setEdges((prevEdges) => prevEdges.filter((edge) => edge.type !== linkType));

    // Fetch and update edges using the shared utility
    await fetchAndUpdateEdges(setEdges, setPopupVisible, showToast);
  } catch (error) {
    console.error("Error while deleting the connection:", error);
    showToast(
      "Error deleting the connection",
      "This connection could not be removed or something went wrong.",
      true
    );
  }
};

export const handleCancel = (
  setPopupVisible: Dispatch<SetStateAction<boolean>>,
  setDeleteConnection: Dispatch<SetStateAction<Connection>>
) => {
  setPopupVisible(false);
  setDeleteConnection({ documentId1: 0, documentId2: 0, connection: "" });
};
