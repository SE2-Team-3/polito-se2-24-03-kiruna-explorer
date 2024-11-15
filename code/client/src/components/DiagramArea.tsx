import ReactFlow, { Background } from "react-flow-renderer";
import FunctionIcon from "./Icon"; // Import your icon component

const nodeTypes = { icon: FunctionIcon };

const DiagramArea = ({
  nodes,
  edges,
  onNodesChange,
  onConnect,
  onEdgeClick,
  onNodeClick,
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
        onNodeClick={onNodeClick}
        fitView
        connectionLineStyle={{ stroke: "rgb(0, 0, 0)", strokeWidth: 2 }}
        zoomOnScroll={false}
        zoomOnPinch={false}
        panOnDrag={false}
        preventScrolling={false}
      >
        <Background />
      </ReactFlow>
    </div>
  );
};

export default DiagramArea;
