import API from "../../../API/API";
import Connection from "../../../models/Connection";
import { Dispatch, SetStateAction } from "react";
import { fetchAndUpdateEdges } from "./ConnectionUtils";
import { Edge } from "@xyflow/react";
import { useToast } from "../../../modules/ToastProvider";

export const handleSaveConnection = async (
  linkType: string,
  newConnection: Connection,
  setEdges: Dispatch<SetStateAction<Edge[]>>,
  setPopupVisible: Dispatch<SetStateAction<boolean>>,
  showToast: ReturnType<typeof useToast>
) => {
  if (!linkType) {
    showToast("Please select a connection type", "", true);
    return;
  }

  try {
    const response = await API.linkDocuments(
      newConnection.documentId1,
      newConnection.documentId2,
      linkType
    );

    showToast(response.message, "", false);
    await fetchAndUpdateEdges(setEdges, setPopupVisible, showToast);
  } catch (error) {
    console.error("Error while saving the connection:", error);
    showToast(
      "Error saving the connection",
      "This connection already exists or something went wrong.",
      true
    );
  }
};

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
  resetState: () => void
) => {
  setPopupVisible(false);
  resetState();
};
