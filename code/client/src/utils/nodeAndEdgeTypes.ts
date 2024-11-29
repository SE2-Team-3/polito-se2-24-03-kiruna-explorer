import FunctionIcon from "../components/diagramComponents/Icon";
import EdgeDirectConsequence from "../components/customEdge/EdgeDirectConsequence";
import EdgeCollateralConsequence from "../components/customEdge/EdgeCollateralConsequence";
import EdgePrevision from "../components/customEdge/EdgePrevision";
import EdgeUpdate from "../components/customEdge/EdgeUpdate";
import EdgeDefault from "../components/customEdge/EdgeDefault";

export const nodeTypes = { icon: FunctionIcon };

export const edgeTypes = {
  "direct consequence": EdgeDirectConsequence,
  "collateral consequence": EdgeCollateralConsequence,
  prevision: EdgePrevision,
  update: EdgeUpdate,
  default: EdgeDefault,
};
