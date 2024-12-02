import { EdgeProps, getBezierPath } from "@xyflow/react";

const EdgeUpdate = ({
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
    <path
      id={id}
      d={edgePath}
      stroke="#000"
      strokeWidth={2}
      fill="none"
      strokeDasharray="10,5,2,5"
    />
  );
};

export default EdgeUpdate;
