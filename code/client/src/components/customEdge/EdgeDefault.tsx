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

  const labelPadding = 5;
  const labelWidth = label ? label.length * 10 + labelPadding * 2 : 0;
  const labelHeight = 20;

  return (
    <>
      <path id={id} d={edgePath} stroke="#000" strokeWidth={2} fill="none" />

      <foreignObject
        width={labelWidth}
        height={labelHeight}
        x={midX - labelWidth / 2}
        y={midY - labelHeight / 2}
        requiredExtensions="http://www.w3.org/1999/xhtml"
        className="edgebutton-foreignobject"
        style={{ borderRadius: "20%" }}
      >
        {/* Fallback element for Support other browsers e.g. Firefox */}
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            padding: `${labelPadding}px`,
            cursor: "pointer",
            textAlign: "center",
            borderRadius: "20%",
            border: "1px solid #3d52a0",
          }}
          className="edgebutton-foreignobject"
        >
          {label}
        </span>
      </foreignObject>
    </>
  );
};

export default EdgeDefault;
