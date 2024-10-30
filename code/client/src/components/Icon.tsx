import { Handle, Position } from "react-flow-renderer";

const FunctionIcon = ({ data, isConnectable }: any) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        width: "auto",
        height: "auto",
        background: "none",
        border: "none",
        padding: "0",
        cursor: "move",
        zIndex: 10,
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        id="a"
        isConnectable={isConnectable}
        style={{
          right: 10,
          visibility: data.showEdges ? "visible" : "hidden",
        }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        isConnectable={isConnectable}
        style={{
          left: 10,
          visibility: data.showEdges ? "visible" : "hidden",
        }}
      />

      {/* Icon */}
      <i className="bi bi-file-earmark" style={{ fontSize: "16px" }}></i>
      {data.label}
    </div>
  );
};

export default FunctionIcon;
