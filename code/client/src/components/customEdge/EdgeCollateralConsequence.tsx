import { EdgeProps, getStraightPath } from "@xyflow/react";

const EdgeCollateralConsequence = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
}: EdgeProps) => {
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
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
