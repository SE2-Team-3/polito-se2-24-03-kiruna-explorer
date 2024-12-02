import FunctionIcon from "../Icon";
import EdgeDirectConsequence from "../../customEdge/EdgeDirectConsequence";
import EdgeCollateralConsequence from "../../customEdge/EdgeCollateralConsequence";
import EdgePrevision from "../../customEdge/EdgePrevision";
import EdgeUpdate from "../../customEdge/EdgeUpdate";
import EdgeDefault from "../../customEdge/EdgeDefault";

export const nodeTypes = { icon: FunctionIcon };

export const edgeTypes = {
  "direct consequence": EdgeDirectConsequence,
  "collateral consequence": EdgeCollateralConsequence,
  prevision: EdgePrevision,
  update: EdgeUpdate,
  default: EdgeDefault,
};
