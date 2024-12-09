import { useState, useCallback } from "react";
import { useSidebar } from "../../../components/SidebarContext";
import { useNavigate } from "react-router-dom";
import {
  ViewportPortal,
  ReactFlow,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
} from "@xyflow/react";
import DiagramTable from "../../../components/diagramComponents/DiagramTable";
import { nodeTypes, edgeTypes } from "../../../components/diagramComponents/utils/nodeAndEdgeTypes";
import EdgePopup from "../../../components/diagramComponents/EdgePopup";
import API from "../../../API/API";

const Diagram = (props: any) => {
  const setNodes = props.setNodes;
  const setEdges = props.setEdges;
  const scrollWidth = props.scrollWidth;
  const nodes = props.nodes;
  const edges = props.edges;
  const yearWidths = props.yearWidths;

  const scrollHeight =
    750 > document.documentElement.clientHeight - 100
      ? document.documentElement.clientHeight - 100
      : 750;

  const navigate = useNavigate();
  const [popupVisible, setPopupVisible] = useState(false);
  const [linkTypesForPopup, setLinkTypesForPopup] = useState<string[]>([]);
  const [tooltip, setTooltip] = useState<{ visible: boolean; title: string; x: number; y: number }>(
    { visible: false, title: "", x: 0, y: 0 }
  );
  const { isSidebarOpen } = useSidebar();

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds: any) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds: any) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback((params: any) => setEdges((eds: any) => addEdge(params, eds)), []);

  const onEdgeHover = useCallback((event: any, edge: any) => {
    if (edge?.data?.linkTypes) {
      setLinkTypesForPopup(edge.data.linkTypes);
      setPopupVisible(true);
    }
  }, []);

  const handleNodeMouseEnter = async (event: React.MouseEvent, node: Node) => {
    const { clientX, clientY } = event;

    try {
      const response = await API.getDocumentById(node.id as unknown as number);
      const title = response?.title || "Unknown Title"; // Gestione fallback

      setTooltip({ visible: true, title, x: clientX, y: clientY });
    } catch (error) {
      console.error("Error fetching document title:", error);
      setTooltip({ visible: true, title: "Error loading title", x: clientX, y: clientY });
    }
  };

  const handleNodeMouseLeave = () => {
    setTooltip({ visible: false, title: "", x: 0, y: 0 });
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const handleNodeClick = (nodeId: string) => {
    navigate(`/documents/${nodeId}`);
  };

  return (
    <>
      {tooltip.visible && (
        <div
          className="tooltip"
          style={{
            position: "absolute",
            left: tooltip.x + "px",
            top: tooltip.y + "px",
            backgroundColor: "white",
            border: "1px solid black",
            padding: "5px",
          }}
        >
          {tooltip.title}
        </div>
      )}
      <div className={`diagram-wrapper ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <div
          style={{
            width: scrollWidth + "px",
            height: scrollHeight + "px",
            border: "none",
          }}
          className="diagram-svg-fix"
        >
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
            defaultViewport={{ x: 0, y: 0, zoom: 1 }}
            translateExtent={[
              [0, 0],
              [yearWidths.reduce((partialSum: number, a: number) => partialSum + a, 200), 750],
            ]}
            nodeExtent={[
              [200, 50],
              [+Infinity, 750],
            ]}
            minZoom={1}
            onNodeMouseEnter={(event, node) => handleNodeMouseEnter(event, node)}
            onNodeMouseLeave={handleNodeMouseLeave}
            onEdgeMouseEnter={onEdgeHover}
            onEdgeMouseLeave={() => setPopupVisible(false)}
            onNodeClick={(event, node) => handleNodeClick(node.id)}
            nodesDraggable={true}
          >
            {popupVisible && <EdgePopup linkTypes={linkTypesForPopup} />}
            <ViewportPortal>
              <DiagramTable yearWidths={yearWidths} />
            </ViewportPortal>
          </ReactFlow>
        </div>
      </div>
    </>
  );
};

export default Diagram;
