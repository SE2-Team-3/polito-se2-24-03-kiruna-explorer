import { Edge } from "@xyflow/react";
import API from "../../../API/API";
import Connection from "../../../models/Connection";
import { Dispatch, SetStateAction } from "react";
import { useToast } from "../../../modules/ToastProvider";

export const fetchAndUpdateEdges = async (
  setEdges: Dispatch<SetStateAction<Edge[]>>,
  setPopupVisible: Dispatch<SetStateAction<boolean>>,
  showToast: ReturnType<typeof useToast>
) => {
  try {
    const updateConnections: Connection[] = await API.getConnections();

    const connectionsMap: Record<string, string[]> = {};
    updateConnections.forEach((connection) => {
      const pairKey = `${connection.documentId1}-${connection.documentId2}`;
      if (!connectionsMap[pairKey]) {
        connectionsMap[pairKey] = [];
      }
      connectionsMap[pairKey].push(connection.connection);
    });

    const updatedEdges: Edge[] = Object.entries(connectionsMap).map(
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
              data: {
                linkTypes,
                label: `${linkTypes.length} conn`,
              },
              zIndex: 4,
            };
      }
    );

    setEdges(updatedEdges);
    setPopupVisible(false);
  } catch (error) {
    console.error("Error while fetching connections:", error);
    showToast(
      "Error fetching connections",
      "Something went wrong while updating the graph.",
      true
    );
  }
};
