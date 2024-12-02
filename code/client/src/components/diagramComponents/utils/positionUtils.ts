import { useRef } from "react";

export const useOccupiedPositions = () => {
  const occupiedPositions = useRef(new Set());

  const isPositionOccupied = (x: number, y: number) => {
    return occupiedPositions.current.has(`${x},${y}`);
  };

  const getAvailablePosition = (x: number, y: number) => {
    let newX = x;
    let newY = y;
    let offset = 0;

    while (isPositionOccupied(newX, newY)) {
      offset += 50;
      newX = x + offset;
      newY = y;
    }

    occupiedPositions.current.add(`${newX},${newY}`);
    return { x: newX, y: newY };
  };

  return { getAvailablePosition };
};
