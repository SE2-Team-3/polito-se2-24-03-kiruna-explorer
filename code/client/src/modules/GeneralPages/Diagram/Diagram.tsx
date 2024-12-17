import { useState, useCallback, useEffect } from "react";
import { useSidebar } from "../../../components/SidebarContext";
import { useNavigate } from "react-router-dom";
import {
  ViewportPortal,
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  OnConnect,
  Edge,
} from "@xyflow/react";
import DiagramTable from "../../../components/diagramComponents/DiagramTable";
import {
  nodeTypes,
  edgeTypes,
} from "../../../components/diagramComponents/utils/nodeAndEdgeTypes";
import EdgePopup from "../../../components/diagramComponents/EdgePopup";
import ConnectionPopup from "../../../components/diagramComponents/ConnectionPopup";
import API from "../../../API/API";
import Connection from "../../../models/Connection";
import FilterTable from "../../UrbanPlanner/FilterTable/FilterPopup";
import Document from "../../../models/document";

interface DiagramProps {
  filterTableVisible: boolean;
  setFilterTableVisible: React.Dispatch<React.SetStateAction<boolean>>;
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
  defaultViewport: any;
}


const Diagram = (props: DiagramProps) => {
  const filterTableVisible = props.filterTableVisible;
  const setFilterTableVisible = props.setFilterTableVisible;
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
  const defaultViewport = props.defaultViewport

  const navigate = useNavigate();
  const [popupVisible, setPopupVisible] = useState(false);
  const [connectionPopupVisible, setConnectionPopupVisible] = useState(false);
  const [linkTypesForPopup, setLinkTypesForPopup] = useState<string[]>([]);
  const [allDocs, setAllDocs] = useState<Document[]>([]);
  const [tooltip, setTooltip] = useState<{ visible: boolean; title: string; x: number; y: number }>(
    { visible: false, title: "", x: 0, y: 0 }
  );
  const { isSidebarOpen } = useSidebar();
  const [newConnection, setNewConnection] = useState<Connection>({
    documentId1: 0,
    documentId2: 0,
    connection: "",
  });
  const [deleteConnection, setDeleteConnection] = useState<Connection>({
    documentId1: 0,
    documentId2: 0,
    connection: "",
  });

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds: any) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds: any) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect: OnConnect = useCallback(
    async (params) => {
      let source: number = parseInt(params.source, 10);
      let target: number = parseInt(params.target, 10);
      setNewConnection({
        documentId1: source,
        documentId2: target,
        connection: "",
      });
      setConnectionPopupVisible(true);
    },
    [edges]
  );
  useEffect(() => {
    async function setInitialDocs() {
      const allDocs = await API.getDocuments();
      setAllDocs(allDocs);
    }
    setInitialDocs();
  }, []);

  // Update nodes based on filtered documents
  useEffect(() => {
    if (filteredDocuments.length === 0) {
      setNodes([]);
    } else if (filteredDocuments.length < allDocs.length) {
      const filteredNodeIds = filteredDocuments.map((doc) => doc.documentId);
      const updatedNodes = nodes.filter((node: Node) => filteredNodeIds.includes(Number(node.id)));
      setNodes(updatedNodes);
    } else {
      setNodes(initialNodes);
    }
  }, [filteredDocuments]);

  // update documents list based on searchTitle
  useEffect(() => {
    const fetchDocuments = async () => {
      const allDocs = await API.getDocuments();
      const filtered = allDocs.filter((doc) => doc.title.toLowerCase().includes(searchTitle.toLowerCase()));
      const filteredNodeIds = filtered.map((doc) => doc.documentId);
      const updatedNodes = nodes.filter((node: Node) => filteredNodeIds.includes(Number(node.id)));
      setNodes(updatedNodes);
    };
    if (searchTitle === "") {
      setNodes(initialNodes);
    } else {
      fetchDocuments();
    }
  }, [searchTitle]);

  const onEdgeClick = useCallback((event: any, edge: any) => {
    if (edge?.data?.linkTypes) {
      setDeleteConnection({
        documentId1: edge.source,
        documentId2: edge.target,
        connection: "",
      });
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
      setTooltip({
        visible: true,
        title: "Error loading title",
        x: clientX,
        y: clientY,
      });
    }
  };

  const handleNodeMouseLeave = () => {
    setTooltip({ visible: false, title: "", x: 0, y: 0 });
  };

  const handleNodeClick = (nodeId: string) => {
    navigate(`/documents/${nodeId}`);
  };

  const handleResetNodes = async () => {
    const allDocs = await API.getDocuments();
    setFilteredDocuments(allDocs);
    setFilterTableVisible(false);
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
            defaultViewport={defaultViewport}
            minZoom={0.5}
            translateExtent={[
              [0, 0],
              [
                yearWidths.reduce(
                  (partialSum: number, a: number) => partialSum + a,
                  200
                ),
                750,
              ],
            ]}
            nodeExtent={[
              [200, 50],
              [yearWidths.reduce(
                (partialSum: number, a: number) => partialSum + a,
                200
              ), 750],
            ]}
            onNodeMouseEnter={(event, node) => handleNodeMouseEnter(event, node)}
            onNodeMouseLeave={handleNodeMouseLeave}
            onEdgeClick={onEdgeClick}
            onNodeClick={(event, node) => handleNodeClick(node.id)}
            nodesDraggable={true}
          >
            {popupVisible && (
              <EdgePopup
                linkTypes={linkTypesForPopup}
                setPopupVisible={setPopupVisible}
                setEdges={setEdges}
                deleteConnection={deleteConnection}
                setDeleteConnection={setDeleteConnection}
              />
            )}
            {connectionPopupVisible && (
              <ConnectionPopup
                newConnection={newConnection}
                setEdges={setEdges}
                setConnectionPopupVisible={setConnectionPopupVisible}
                setNewConnection={setNewConnection}
              />
            )}
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
