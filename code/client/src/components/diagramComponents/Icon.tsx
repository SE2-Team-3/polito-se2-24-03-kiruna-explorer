import { Handle, Position } from "@xyflow/react";
import Action from "../../assets/icons/nodeType/action.svg";
import Agreement from "../../assets/icons/nodeType/agreement.svg";
import Conflict from "../../assets/icons/nodeType/conflict.svg";
import Consultation from "../../assets/icons/nodeType/consultation.svg";
import Design from "../../assets/icons/nodeType/design document.svg";
import Informative from "../../assets/icons/nodeType/informative document.svg";
import Prescriptive from "../../assets/icons/nodeType/prescriptive document.svg";
import Technical from "../../assets/icons/nodeType/technical document.svg";
import Logo from "../../assets/icons/Kiruna Icon - 2.svg";

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
  "Design document": Design,
  "Informative document": Informative,
  "Prescriptive document": Prescriptive,
  "Technical document": Technical,
  Agreement: Agreement,
  Conflict: Conflict,
  Consultation: Consultation,
  Action: Action,
};

const FunctionIcon = ({ data, isConnectable }: FunctionIconProps) => {
  // Recupera l'icona corretta basata sul nodeType
  const iconClass = iconMap[data.nodeType] || Logo;

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
        <img
          src={iconClass}
          alt={`${data.nodeType} icon`}
          style={{ marginLeft: "5px" }}
        ></img>
      </div>
    </div>
  );
};

export default FunctionIcon;
