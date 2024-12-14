import { useState, useCallback, useEffect } from "react";
import { useSidebar } from "../../../components/SidebarContext";
import { useNavigate } from "react-router-dom";
import {
  ViewportPortal,
  ReactFlow,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
} from "@xyflow/react";
import DiagramTable from "../../../components/diagramComponents/DiagramTable";
import { nodeTypes, edgeTypes } from "../../../components/diagramComponents/utils/nodeAndEdgeTypes";
import EdgePopup from "../../../components/diagramComponents/EdgePopup";
import API from "../../../API/API";
import FilterTable from "../../UrbanPlanner/FilterTable/FilterPopup";
import Document from "../../../models/document";
import { Col, Row } from "react-bootstrap";

interface DiagramProps {
  filteredDocuments: Document[];
  setFilteredDocuments: React.Dispatch<React.SetStateAction<Document[]>>;
  searchTitle: string;
  initialNodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  scrollWidth: number;
  nodes: Node[];
  edges: Edge[];
  yearWidths: number[];
}

const Diagram = (props: DiagramProps) => {
  const filteredDocuments = props.filteredDocuments;
  const setFilteredDocuments = props.setFilteredDocuments;
  const searchTitle = props.searchTitle;
  const initialNodes = props.initialNodes;
  const setNodes = props.setNodes;
  const setEdges = props.setEdges;
  const scrollWidth = props.scrollWidth;
  const nodes = props.nodes;
  const edges = props.edges;
  const yearWidths = props.yearWidths;

  const navigate = useNavigate();
  const [popupVisible, setPopupVisible] = useState(false);
  const [linkTypesForPopup, setLinkTypesForPopup] = useState<string[]>([]);
  const [tooltip, setTooltip] = useState<{ visible: boolean; title: string; x: number; y: number }>(
    { visible: false, title: "", x: 0, y: 0 }
  );
  const { isSidebarOpen } = useSidebar();
  const [filterTableVisible, setFilterTableVisible] = useState(false);

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

  const handleNodeClick = (nodeId: string) => {
    navigate(`/documents/${nodeId}`);
  };

  const handleResetNodes = () => {
    setNodes(initialNodes);
  };

  // Update nodes based on filtered documents
  useEffect(() => {
    const filteredNodeIds = filteredDocuments.map((doc) => doc.documentId);
    const updatedNodes = nodes.filter((node: Node) => filteredNodeIds.includes(Number(node.id)));
    setNodes(updatedNodes);
  }, [filteredDocuments]);

  // update documents list based on searchTitle
  useEffect(() => {
    const fetchDocuments = async () => {
      const allDocs = await API.getDocuments();
      const filtered = allDocs.filter((doc) =>
        doc.title.toLowerCase().includes(searchTitle.toLowerCase())
      );
      const filteredNodeIds = filtered.map((doc) => doc.documentId);
      const updatedNodes = nodes.filter((node: Node) => filteredNodeIds.includes(Number(node.id)));
      setNodes(updatedNodes);
      if (searchTitle === "") {
        setNodes(initialNodes);
      }
    };

    fetchDocuments();
  }, [searchTitle]);

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
      <Row>
        <Col>
          <button
            className="open-filter-table-button"
            onClick={() => setFilterTableVisible(!filterTableVisible)}
          >
            Filter
            {/* <img src={FilterIcon} alt="filter" /> */}
          </button>
        </Col>
        <Col>
          <button className="reset-filter-table-button" onClick={handleResetNodes}>
            Reset
            {/* <img src={Close} alt="close" /> */}
          </button>
        </Col>
      </Row>
      {filterTableVisible && (
        <div className="popup-diagram">
          <FilterTable
            setFilteredDocuments={setFilteredDocuments}
            setFilterTableVisible={setFilterTableVisible}
            handleResetNodes={handleResetNodes}
          />
        </div>
      )}
      <div className={`diagram-wrapper ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <div
          style={{
            width: scrollWidth + "px",
            height: "100%",
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
