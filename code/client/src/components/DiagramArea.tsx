import ReactFlow, { Background } from "react-flow-renderer";
import FunctionIcon from "./Icon"; // Import your icon component

const nodeTypes = { icon: FunctionIcon };

const DiagramArea = ({
  nodes,
  edges,
  onNodesChange,
  onConnect,
  onEdgeClick,
}: any) => {
  return (
    <div style={{ width: "3080px", height: "595px" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onConnect={onConnect}
        onEdgeClick={onEdgeClick}
        fitView
        connectionLineStyle={{ stroke: "rgb(0, 0, 0)", strokeWidth: 2 }}
        zoomOnScroll={false}
        zoomOnPinch={false}
      >
        <Background />
      </ReactFlow>
    </div>
  );
};

export default DiagramArea;
