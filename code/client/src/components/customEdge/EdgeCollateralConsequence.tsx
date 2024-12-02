import { EdgeProps, getBezierPath } from "@xyflow/react";

const EdgeCollateralConsequence = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
}: EdgeProps) => {
  // Otteniamo il percorso Bezier
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (
    <path
      id={id}
      d={edgePath}
      stroke="#000"
      strokeWidth={2}
      fill="none"
      strokeDasharray="5,5"
    />
  );
};

export default EdgeCollateralConsequence;
