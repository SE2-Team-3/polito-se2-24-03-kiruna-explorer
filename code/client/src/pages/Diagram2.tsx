import { ReactFlow, Node, Edge, Position } from "@xyflow/react";
import { ViewportPortal } from "@xyflow/react";
import { ReactFlowProvider } from "@xyflow/react";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import BGTable from "../components/BGTable";

import { useEffect, useState } from "react";
import { useCallback } from "react";
import { applyNodeChanges, applyEdgeChanges } from "@xyflow/react";
import FunctionIcon from "../components/Icon";
import { addEdge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import Document from "../models/document";
import { getDocuments, getConnections } from "../API/API";
import Connection from "../models/Connection";

const xPosCalculator = (date: string | null) => {
  if (date == null) return 200;
  let month = 0,
    day = 0,
    x = 200,
    y = 2004,
    temp;
  const year = parseInt(date.slice(0, 4));
  while (y < year) {
    temp = document.getElementById(`head-${y}`)?.offsetWidth;
    if (temp) x = x + temp;
    y++;
  }
  if (date.length >= 6) {
    month = parseInt(date.split("-")[1]) - 1;
    temp = document.getElementById(`head-${year}`)?.offsetWidth;
    if (temp) x = x + (month * temp) / 12;
  }
  if (date.length >= 8) {
    day = parseInt(date.split("-")[2]) - 1;
    temp = document.getElementById(`head-${year}`)?.offsetWidth;
    if (temp) x = x + (day * temp) / 12 / 30;
  }
  return x;
};

const yPosCalculator = (scale: string) => {
  const isPlan = new RegExp("^[0-9]*$");

  //650 floor 250 ceiling
  if (isPlan.test(scale)) {
    const s = parseInt(scale);
    if (s > 100000) return 650 - 400;
    if (s > 10000) return 650 - 350;
    if (s > 5000) return 650 - 250;
    if (s > 1000) return 650 - 150;
    return 650 - 50;
  }

  if (scale === "Text") return 50 + 50;
  if (scale === "Concept") return 50 + 100;
  return 50 + 650;
};

const nodeTypes = { icon: FunctionIcon };

const Diagram2 = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

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
              showEdges: true,
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
        let newEdges: Edge[] = [];
        for (const c of initialConnections) {
          newEdges.push({
            id: `${c.documentId1}-${c.documentId2}`,
            source: c.documentId1.toString(),
            target: c.documentId2.toString(),
            //type: c.connection, //uncomment when custom edges implemented
            zIndex: 4,
            type: "icon",
          });
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
            >
              <ViewportPortal>
                {/*It's 3 different tables, it's most likely better to just use one single table, will do in future maybe*/}
                <Header generateYears={null} classname="header-trans" />
                <Sidebar doctype={null} classname="sidebar-trans" />
                <BGTable />

                <h1 className="point-trans">T</h1>
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
