import { Handle, Position } from "@xyflow/react";

interface FunctionIconProps {
  data: {
    label: string;
    nodeType: string; // Cambiato per usare nodeType
    showEdges: boolean;
  };
  isConnectable: boolean;
}

// Mappa delle icone per ciascun tipo di nodo (basato su nodeType)
const iconMap: { [key: string]: string } = {
  "Design document": "bi-file-earmark-richtext",
  "Informative document": "bi-file-earmark-font",
  "Prescriptive document": "bi-file-earmark-lock",
  "Technical document": "bi-file-earmark-ruled",
  Agreement: "bi-globe2",
  Conflict: "bi-people",
  Consultation: "bi-question-circle",
  Action: "bi-file-earmark-plus",
};

const FunctionIcon = ({ data, isConnectable }: FunctionIconProps) => {
  // Recupera l'icona corretta basata sul nodeType
  const iconClass = iconMap[data.nodeType] || "bi-x";

  return (
    <div className="node-wrap">
      {/* Handle per la connessione in entrata */}
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        style={{
          width: 10,
          height: 10,
          background: "#555",
          borderRadius: "50%",
          visibility: data.showEdges ? "visible" : "hidden",
        }}
      />
      {/* Handle per la connessione in uscita */}
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        style={{
          width: 10,
          height: 10,
          background: "#555",
          borderRadius: "50%",
          visibility: data.showEdges ? "visible" : "hidden",
        }}
      />
      {/* Icona e label del nodo */}
      <div
        style={{
          textAlign: "center",
          fontSize: "14px",
          color: "#333",
          padding: "auto",
        }}
      >
        <span>{data.label}</span>
        <i
          className={`bi ${iconClass}`}
          style={{ fontSize: "20px", marginTop: "10px" }}
        ></i>
      </div>
    </div>
  );
};

export default FunctionIcon;
