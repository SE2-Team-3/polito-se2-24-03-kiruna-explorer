import { EdgeProps, getBezierPath } from "@xyflow/react";

interface CustomEdgeProps extends EdgeProps {
  data: {
    label?: string;
  };
}

const EdgeDefault = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}: CustomEdgeProps) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  const label = data?.label;
  const midX = (sourceX + targetX) / 2;
  const midY = (sourceY + targetY) / 2;

  const labelOffset = -20;

  const labelPadding = 5;
  const labelWidth = label ? label.length * 8 + labelPadding * 2 : 0;
  const labelHeight = 20;

  return (
    <>
      <path id={id} d={edgePath} stroke="#000" strokeWidth={2} fill="none" />
      {label && (
        <>
          <rect
            x={midX - labelWidth / 2}
            y={midY - labelHeight / 2}
            width={labelWidth}
            height={labelHeight}
            fill="#fff"
            stroke="#3d52a0"
            strokeWidth={1}
            rx={5}
            ry={5}
          />
          <text
            x={midX}
            y={midY}
            textAnchor="middle"
            dominantBaseline="middle"
            style={{
              fontSize: "12px",
              fill: "#3d52a0",
              pointerEvents: "none",
              zIndex: 5,
            }}
          >
            {label}
          </text>
        </>
      )}
    </>
  );
};

export default EdgeDefault;
