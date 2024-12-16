import { EdgeProps, getBezierPath, getEdgeCenter } from "@xyflow/react";

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
      />
    </>
  );
};

export default EdgeCollateralConsequence;
