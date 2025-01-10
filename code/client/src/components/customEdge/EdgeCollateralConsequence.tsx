import { EdgeProps, getBezierPath, getEdgeCenter } from "@xyflow/react";
import { FaRegCircle } from "react-icons/fa";

const foreignObjectSize = 16;

const EdgeCollateralConsequence = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
}: EdgeProps) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  const [edgeCenterX, edgeCenterY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <path
        id={id}
        d={edgePath}
        stroke="#000"
        strokeWidth={2}
        fill="none"
        strokeDasharray="5,5"
      />
      <foreignObject
        width={foreignObjectSize}
        height={foreignObjectSize}
        x={edgeCenterX - foreignObjectSize / 2}
        y={edgeCenterY - foreignObjectSize / 2}
        className="edgebutton-foreignobject"
        style={{ borderRadius: "50%" }}
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        {/* Fallback element for Support other browsers e.g. Firefox */}
        <span
          className="edgebutton-foreignobject"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #3d52a0"
          }}
        >
          <FaRegCircle />
        </span>
      </foreignObject>
    </>
  );
};

export default EdgeCollateralConsequence;
