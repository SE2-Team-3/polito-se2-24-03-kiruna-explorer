import { ReactFlow, Node, Edge } from "@xyflow/react";
import { ViewportPortal } from "@xyflow/react";
import { ReactFlowProvider } from "@xyflow/react";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import BGTable from "../components/BGTable";
import Popup from "../components/Popup";

import { useEffect, useState } from "react";
import { useCallback } from "react";
import { applyNodeChanges, applyEdgeChanges } from "@xyflow/react";
import { addEdge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import Document from "../models/document";
import Connection from "../models/Connection";
import { getDocuments, getConnections } from "../API/API";

import { xPosCalculator, yPosCalculator } from "../utils/positionCalculators";
import { nodeTypes, edgeTypes } from "../utils/nodeAndEdgeTypes";

const Diagram2 = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [linkTypesForPopup, setLinkTypesForPopup] = useState<string[]>([]);

  useEffect(() => {
    async function getDocs() {
      const initialDocs: Document[] = await getDocuments();
      const initialConnections: Connection[] = await getConnections();
      if (initialDocs.length) {
        let newNodes: Node[] = [];
        for (const d of initialDocs) {
          newNodes.push({
            id: d.documentId.toString(),
            data: {
              label: d.documentId,
              nodeType: d.nodeType,
              showEdges: false,
            },
            width: 30,
            position: {
              x: xPosCalculator(d.issuanceDate),
              y: yPosCalculator(d.scale),
            },
            zIndex: 5,
            type: "icon",
          });
        }

        const years = [
          2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014,
          2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
        ];
        const counts = [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ];
        for (const d of initialDocs) {
          if (d.issuanceDate) {
            const year = parseInt(d.issuanceDate.slice(0, 4));
            counts[year - 2004]++;
          }
        }
        for (const y of years) {
          let e = document.getElementById(`head-${y}`);
          e?.style.setProperty("width", 75 + counts[y - 2004] * 50 + "px");
        }
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

  return (
    <>
      <ReactFlowProvider>
        <h1>Sopra diagramma</h1>
        <div
          style={{ width: "100vw", height: "750px", border: "solid 1px green" }}
        >
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
            >
              {popupVisible && (
                <Popup linkTypes={linkTypesForPopup} onClose={closePopup} />
              )}
              <ViewportPortal>
                {/*It's 3 different tables, it's most likely better to just use one single table, will do in future maybe*/}
                <Header generateYears={null} classname="header-trans" />
                <Sidebar doctype={null} classname="sidebar-trans" />
                <BGTable />

                {/*<h1 className="point-trans">T</h1>*/}
              </ViewportPortal>
            </ReactFlow>
          </div>

          <h1>Sotto diagramma</h1>
        </div>
      </ReactFlowProvider>
    </>
  );
};

export default Diagram2;
