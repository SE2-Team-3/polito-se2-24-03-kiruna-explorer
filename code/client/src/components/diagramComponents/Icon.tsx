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
    nodeType: string;
    stakeholder: string;
    showEdges: boolean;
  };
  isConnectable: boolean;
}

// Map the icon
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

const colorMap: { [key: string]: string } = {
  Municipality: "#3D52A0",
  LKAB: "#F9837C",
  Citizen: "#75DDDD",
  "Architecture firms": "#F1D302",
  "Regional authority": "#F4D35E",
  Others: "#F1C8DB",
};

const FunctionIcon = ({ data, isConnectable }: FunctionIconProps) => {
  const iconClass = iconMap[data.nodeType] || Logo;
  const colorClass = Object.keys(colorMap).find((key) =>
    data.stakeholder.includes(key)
  )
    ? colorMap[
        Object.keys(colorMap).find((key) => data.stakeholder.includes(key))!
      ]
    : "#000";
  return (
    <div className="node-wrap" style={{ border: `3px solid ${colorClass}` }}>
      {/* Handle input */}
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
      {/* Handle output */}
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
      {/* Icona and label */}
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
