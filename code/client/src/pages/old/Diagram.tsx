import "../../style/Diagram.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useCallback, useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import NodeForm from "../../components/old/NodeForm";
import DiagramArea from "../../components/old/DiagramArea";
import {
  addEdge,
  applyNodeChanges,
  Connection,
  Node,
  Edge,
} from "react-flow-renderer";

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

// Popup component with delete functionality
const Popup: React.FC<{
  message: string;
  onClose: () => void;
  onDelete: () => void;
}> = ({ message, onClose, onDelete }) => (
  <div
    style={{
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      padding: "20px",
      backgroundColor: "white",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
      zIndex: 1000,
    }}
  >
    <p>{message}</p>
    <button onClick={onDelete}>Delete Node</button>
    <button onClick={onClose}>Close</button>
  </div>
);

const Diagram = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
  const [showEdges, setShowEdges] = useState(false);
  const [newNode, setNewNode] = useState({
    id: "",
    label: "",
    x: 0,
    y: 0,
  });

  // Popup visibility state
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  // Handle node click to open popup
  const onNodeClick = (_: any, node: Node) => {
    setPopupMessage(node.data.label);
    setPopupVisible(true);
    setSelectedNodeId(node.id);
  };

  // Close popup
  const closePopup = () => setPopupVisible(false);

  const deleteNode = () => {
    if (selectedNodeId) {
      setNodes((nds) => nds.filter((node) => node.id !== selectedNodeId));
      closePopup();
    }
  };

  // Load diagram state from local storage on mount
  useEffect(() => {
    const storedState = loadDiagramState();
    if (storedState) {
      setNodes(storedState.nodes);
      setEdges(storedState.edges);
      setShowEdges(storedState.showEdges); // Load showEdges state
    }
  }, []);

  const loadDiagramState = () => {
    const storedState = localStorage.getItem("diagramState");
    return storedState ? JSON.parse(storedState) : null;
  };

  const saveDiagramState = () => {
    const state = {
      nodes,
      edges,
      showEdges,
    };
    localStorage.setItem("diagramState", JSON.stringify(state));
  };

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge(connection, eds));
      saveDiagramState(); // Save state after connection
    },
    [nodes]
  );

  const onNodesChange = useCallback(
    (changes: any) => {
      const updatedNodes = applyNodeChanges(changes, nodes);
      setNodes(updatedNodes);
      saveDiagramState(); // Save state after node changes
    },
    [nodes]
  );

  const onEdgeClick = useCallback((event: React.MouseEvent, edge: Edge) => {
    event.stopPropagation();
    setSelectedEdge(edge);
  }, []);

  const confirmDeleteEdge = () => {
    if (selectedEdge) {
      setEdges((eds) => eds.filter((e) => e.id !== selectedEdge.id));
      setSelectedEdge(null);
      saveDiagramState(); // Save state after deleting edge
    }
  };

  const toggleShowEdges = (show: boolean) => {
    setShowEdges(show);
    setNodes((prevNodes) =>
      prevNodes.map((item) => ({
        ...item,
        data: {
          ...item.data,
          showEdges: show,
        },
      }))
    );
    saveDiagramState(); // Save state after toggling edge visibility
  };

  const addNode = (e: React.FormEvent) => {
    e.preventDefault();
    const node: Node = {
      id: newNode.id,
      data: { label: newNode.label, showEdges: showEdges },
      position: { x: newNode.x, y: newNode.y },
      type: "icon",
    };
    setNodes((nds) => [...nds, node]);
    setNewNode({
      id: "",
      label: "",
      x: 0,
      y: 0,
    });
    saveDiagramState(); // Save state after adding a new node
  };

  const generateYears = () => {
    const years = [];
    for (let year = 2004; year <= 2025; year++) {
      years.push(year);
    }
    return years;
  };

  const doctype = [
    "Text",
    "Concept",
    "Plan 1:100,000",
    "Plan 1:10,000",
    "Plan 1:5,000",
    "Plan 1:1,000",
    "Blueprint/actions",
  ];

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        left: "0px",
      }}
    >
      <div style={{ display: "flex", marginTop: "15px" }}>
        <Sidebar doctype={doctype} classname={null} />
        <div className="scroll-container">
          <Header generateYears={generateYears} classname={null} />
          <DiagramArea
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onConnect={onConnect}
            onEdgeClick={onEdgeClick}
            showEdges={showEdges}
            onNodeClick={onNodeClick}
          />
        </div>
      </div>
      {selectedEdge && (
        <div className="popup">
          <p>Do you want to delete this edge?</p>
          <button onClick={confirmDeleteEdge}>Yes</button>
          <button onClick={() => setSelectedEdge(null)}>No</button>
        </div>
      )}

      {popupVisible && popupMessage && (
        <Popup
          message={popupMessage}
          onClose={closePopup}
          onDelete={deleteNode}
        />
      )}

      <div style={{ display: "flex" }}>
        <NodeForm newNode={newNode} setNewNode={setNewNode} addNode={addNode} />
        <div style={{ marginTop: "20px" }}>
          <p>
            <button onClick={() => toggleShowEdges(true)}>
              Show Handle Edge
            </button>
          </p>
          <p>
            <button onClick={() => toggleShowEdges(false)}>
              Hide Handle Edge
            </button>
          </p>
        </div>
        <span
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            padding: "8px",
          }}
        >
          {nodes.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
                minWidth: "100px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                height: "150px",
              }}
            >
              <p>
                <strong>ID:</strong> {item.id}
              </p>
              <p>
                <strong>X:</strong> {item.position.x}
              </p>
              <p>
                <strong>Y:</strong> {item.position.y}
              </p>
            </div>
          ))}
        </span>
      </div>
    </div>
  );
};

export default Diagram;
