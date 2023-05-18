import React from "react";
import { XYCoord, useDragLayer } from "react-dnd";
import { Column } from "./Column";
import { CustomDragLayerContainer, DragPreviewWrapper } from "@/styles/styles";
import { Card } from "./Card";
import { useAppState } from "@/state/AppStateContext";

function getItemStyles(currentOffset: XYCoord | null) {
  if (!currentOffset) {
    return {
      display: "none",
    };
  }

  const { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

export const CustomDragLayer = () => {
  const { draggedItem } = useAppState();
  const { currentOffset } = useDragLayer((monitor) => ({
    currentOffset: monitor.getSourceClientOffset(),
  }));
  return draggedItem && currentOffset ? (
    <DragPreviewWrapper position={currentOffset}>
      <Column id={draggedItem.id} text={draggedItem.text} isPreview />
    </DragPreviewWrapper>
  ) : null;
};
