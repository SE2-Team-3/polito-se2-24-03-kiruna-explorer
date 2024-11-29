import { ReactFlow, Node, Edge } from "@xyflow/react";
import { ViewportPortal } from "@xyflow/react";
import { ReactFlowProvider } from "@xyflow/react";
import { useNavigate } from "react-router-dom";

import Header from "../../../components/diagramComponents/Header";
import Sidebar from "../../../components/diagramComponents/Sidebar";
import BGTable from "../../../components/diagramComponents/BGTable";
import EdgePopup from "../../../components/diagramComponents/EdgePopup";

import { useEffect, useState } from "react";
import { useCallback } from "react";
import { applyNodeChanges, applyEdgeChanges } from "@xyflow/react";
import { addEdge } from "@xyflow/react";

import Document from "../../../models/document";
import Connection from "../../../models/Connection";
import API from "../../../API/API";
import { useSidebar } from "../../../components/SidebarContext";

import {
  xPosCalculator,
  yPosCalculator,
} from "../../../utils/positionCalculators";
import { nodeTypes, edgeTypes } from "../../../utils/nodeAndEdgeTypes";
import { useOccupiedPositions } from "../../../utils/positionUtils";

const Diagram = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [linkTypesForPopup, setLinkTypesForPopup] = useState<string[]>([]);
  const { isSidebarOpen } = useSidebar();
  const [yearWidths, setYearWidths] = useState<number[]>([]);
  const navigate = useNavigate();
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
              label: d.documentId,
              nodeType: d.nodeType,
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
        const calculatedYearWidths = years.map(
          (y) => 75 + counts[y - 2004] * 50
        );
        setYearWidths(calculatedYearWidths);

        setNodes(newNodes);
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

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onEdgeClick = useCallback((event: any, edge: any) => {
    if (edge?.type === "default" && edge?.data?.linkTypes) {
      setLinkTypesForPopup(edge.data.linkTypes);
      setPopupVisible(true);
    }
  }, []);

  const closePopup = () => {
    setPopupVisible(false);
  };

  const handleNodeClick = (nodeId: string) => {
    navigate(`/documents/${nodeId}`);
  };

  return (
    <div className={`diagram-wrapper ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <ReactFlowProvider>
        {/*<h1>Sopra diagramma</h1>*/}
        <div style={{ width: "100vw", height: "750px", border: "none" }}>
          <div style={{ height: "100%" }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              connectionLineStyle={{ stroke: "rgb(0, 0, 0)", strokeWidth: 2 }}
              panOnDrag={true}
              panOnScroll={true}
              preventScrolling={false}
              onConnect={onConnect}
              translateExtent={[
                [0, 0],
                [5000, 748],
              ]}
              minZoom={1}
              onEdgeClick={onEdgeClick}
              onNodeClick={(event, node) => handleNodeClick(node.id)}
              nodesDraggable={false} 
            >
              {popupVisible && (
                <EdgePopup linkTypes={linkTypesForPopup} onClose={closePopup} />
              )}
              <ViewportPortal>
                {/*It's 3 different tables, it's most likely better to just use one single table, will do in future maybe*/}
                <Header
                  generateYears={null}
                  yearWidths={yearWidths}
                  classname="header-trans"
                />
                <Sidebar doctype={null} classname="sidebar-trans" />
                <BGTable yearWidths={yearWidths} />
              </ViewportPortal>
            </ReactFlow>
          </div>

          {/*<h1>Sotto diagramma</h1>*/}
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default Diagram;
