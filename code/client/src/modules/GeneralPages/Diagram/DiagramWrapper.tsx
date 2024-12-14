import { Node, Edge } from "@xyflow/react";

import { useEffect, useState } from "react";

import Document from "../../../models/document";
import Connection from "../../../models/Connection";
import API from "../../../API/API";

import {
  xPosCalculator,
  yPosCalculator,
} from "../../../components/diagramComponents/utils/positionCalculators";
import { useOccupiedPositions } from "../../../components/diagramComponents/utils/positionUtils";
import Diagram from "./Diagram";

const DiagramWrapper = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [initialNodes, setInitialNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const [yearWidths, setYearWidths] = useState<number[]>([]);
  const [scrollWidth, setScrollWidth] = useState<number>(1);

  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);

  const { getAvailablePosition } = useOccupiedPositions();

  useEffect(() => {
    async function getDocs() {
      const initialDocs: Document[] = await API.getDocuments();
      const initialConnections: Connection[] = await API.getConnections();
      if (initialDocs.length) {
        let newNodes: Node[] = [];
        for (const d of initialDocs) {
          let { x, y } = {
            x: xPosCalculator(d.issuanceDate),
            y: yPosCalculator(d.scale),
          };

          const availablePosition = getAvailablePosition(x, y);
          x = availablePosition.x;
          y = availablePosition.y;

          newNodes.push({
            id: d.documentId.toString(),
            data: {
              nodeType: d.nodeType,
              stakeholder: d.stakeholders,
              showEdges: false,
            },
            width: 30,
            position: { x, y },
            zIndex: 5,
            type: "icon",
          });
        }

        const years = Array.from({ length: 22 }, (_, index) => 2004 + index);

        const counts: number[] = new Array(23).fill(0);

        for (const d of initialDocs) {
          if (d.issuanceDate) {
            const year = parseInt(d.issuanceDate.slice(0, 4));
            counts[year - 2004]++;
          }
        }
        const calculatedYearWidths = years.map((y) => 75 + counts[y - 2004] * 50);
        setYearWidths(calculatedYearWidths);

        let x = 200;
        for (const y of calculatedYearWidths) x += y;
        if (x < document.documentElement.clientWidth - 75) setScrollWidth(x);
        else setScrollWidth(document.documentElement.clientWidth - 75);

        setNodes(newNodes);
        setInitialNodes(newNodes);
      }
      if (initialConnections.length) {
        const connectionsMap: Record<string, string[]> = {};

        for (const c of initialConnections) {
          const pairKey = `${c.documentId1}-${c.documentId2}`;
          if (!connectionsMap[pairKey]) {
            connectionsMap[pairKey] = [];
          }
          connectionsMap[pairKey].push(c.connection);
        }

        let newEdges: Edge[] = [];
        for (const [pairKey, linkTypes] of Object.entries(connectionsMap)) {
          const [source, target] = pairKey.split("-");

          if (linkTypes.length === 1) {
            newEdges.push({
              id: `${source}-${target}-${linkTypes[0]}`,
              source,
              target,
              type: linkTypes[0],
              data: { linkTypes },
              zIndex: 4,
            });
          } else {
            newEdges.push({
              id: `${source}-${target}-default`,
              source,
              target,
              type: "default",
              data: { linkTypes, label: `${linkTypes.length} connections` },
              zIndex: 4,
            });
          }
        }
        setEdges(newEdges);
      }
    }
    if (!nodes.length) getDocs();
  }, []);

  return (
    <Diagram
      initialNodes={initialNodes}
      setNodes={setNodes}
      setEdges={setEdges}
      scrollWidth={scrollWidth}
      nodes={nodes}
      edges={edges}
      yearWidths={yearWidths}
    />
  );
};

export default DiagramWrapper;
