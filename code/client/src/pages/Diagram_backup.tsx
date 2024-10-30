// src/components/Diagram.tsx
import "../style/Diagram.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useCallback, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import NodeForm from "../components/NodeForm";
import DiagramArea from "../components/DiagramArea";
import {
  addEdge,
  applyNodeChanges,
  Connection,
  Node,
  Edge,
} from "react-flow-renderer";

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

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

  useEffect(() => {
    const storedNodes = loadNodesFromLocalStorage();
    setNodes(storedNodes);
  }, []);

  const loadNodesFromLocalStorage = (): Node[] => {
    const storedNodes = localStorage.getItem("nodes");
    return storedNodes ? JSON.parse(storedNodes) : initialNodes;
  };

  const onConnect = useCallback((connection: Connection) => {
    setEdges((eds) => addEdge(connection, eds));
  }, []);

  const onNodesChange = useCallback(
    (changes: any) => {
      const updatedNodes = applyNodeChanges(changes, nodes);
      setNodes(updatedNodes);
      saveNodesToLocalStorage(updatedNodes);
    },
    [nodes]
  );

  const saveNodesToLocalStorage = (nodes: Node[]) => {
    localStorage.setItem("nodes", JSON.stringify(nodes));
  };

  const onEdgeClick = useCallback((event: React.MouseEvent, edge: Edge) => {
    event.stopPropagation();
    setSelectedEdge(edge);
  }, []);

  const confirmDeleteEdge = () => {
    if (selectedEdge) {
      setEdges((eds) => eds.filter((e) => e.id !== selectedEdge.id));
      setSelectedEdge(null);
    }
  };

  const ShowEdges = (show: boolean) => {
    // Update nodes with the new design mode
    setNodes((prevNodes) =>
      prevNodes.map((item) => ({
        ...item,
        data: {
          ...item.data,
          showEdges: show, // Update isDesignMode
        },
      }))
    );
  };

  const cancelDeleteEdge = () => setSelectedEdge(null);

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
    <div>
      <div style={{ display: "flex", marginTop: "15px" }}>
        <Sidebar doctype={doctype} />
        <div className="scroll-container">
          <Header generateYears={generateYears} />
          <DiagramArea
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onConnect={onConnect}
            onEdgeClick={onEdgeClick}
            showEdges={showEdges}
          />
        </div>
      </div>
      {selectedEdge && (
        <div className="popup">
          <p>Do you want to delete this edge?</p>
          <button onClick={confirmDeleteEdge}>Yes</button>
          <button onClick={cancelDeleteEdge}>No</button>
        </div>
      )}
      <div style={{ display: "flex" }}>
        <NodeForm newNode={newNode} setNewNode={setNewNode} addNode={addNode} />
        <div style={{ marginTop: "20px" }}>
          <p>
            <button onClick={() => ShowEdges(true)}>Show Handle Edge</button>
          </p>
          <p>
            <button onClick={() => ShowEdges(false)}>Hide Handle Edge</button>
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
