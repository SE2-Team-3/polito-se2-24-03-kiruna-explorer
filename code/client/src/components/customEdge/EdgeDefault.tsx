// DefaultEdge.tsx
import { EdgeProps, getBezierPath } from "@xyflow/react";

// Definiamo il nostro edge "default" come una semplice linea retta.
const EdgeDefault = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
}: EdgeProps) => {
  // Creiamo un percorso Bezier semplice (linea retta)
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
      stroke="#888" // Colore neutro per l'edge di default
      strokeWidth={2}
      fill="none"
    />
  );
};

export default EdgeDefault;
