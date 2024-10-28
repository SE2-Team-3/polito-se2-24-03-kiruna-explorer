import "../UrbanPlanner.css";
import { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  applyNodeChanges,
  Connection,
  Node,
  Edge,
} from "react-flow-renderer";

const initialNodes: Node[] = [
  {
    id: "file1",
    data: { label: "File 1" },
    position: { x: 50, y: 50 },
    type: "default",
  },
  {
    id: "file2",
    data: { label: "File 2" },
    position: { x: 200, y: 50 },
    type: "default",
  },
  {
    id: "file3",
    data: { label: "File 3" },
    position: { x: 50, y: 150 },
    type: "default",
  },
];

const initialEdges: Edge[] = [];

const Diagram = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  useEffect(() => {
    const storedNodes = loadNodesFromLocalStorage();
    setNodes(storedNodes);
  }, []);

  const saveNodesToLocalStorage = (nodes: Node[]) => {
    localStorage.setItem("nodes", JSON.stringify(nodes));
  };

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

      updatedNodes.forEach((node) => {
        if (node.id === "file1" || node.id === "file2") {
          node.position.y = 50; // Mantieni i nodi sulla stessa riga
        } else if (node.id === "file3") {
          node.position.y = 150; // Mantieni il nodo sulla seconda riga
        }
      });

      setNodes(updatedNodes);
      saveNodesToLocalStorage(updatedNodes); // Salva la nuova posizione
    },
    [nodes]
  );

  return (
    <div style={{ height: "500px" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onConnect={onConnect}
        fitView
        connectionLineStyle={{ stroke: "rgb(0, 0, 0)", strokeWidth: 2 }}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default Diagram;
