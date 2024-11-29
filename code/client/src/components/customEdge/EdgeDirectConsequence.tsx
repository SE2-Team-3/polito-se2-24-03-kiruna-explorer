import { EdgeProps, getBezierPath } from "@xyflow/react";

const EdgeDirectConsequence = ({
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

  return (
    <path id={id} d={edgePath} stroke="#000" strokeWidth={2} fill="none" />
  );
};

export default EdgeDirectConsequence;
