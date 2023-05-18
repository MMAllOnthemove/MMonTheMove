import React from "react";
import { XYCoord, useDragLayer } from "react-dnd";
import { Column } from "./Column";
import { CustomDragLayerContainer } from "./styles";
import { Card } from "./Card";

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

export const CustomDragLayer: React.FC = () => {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  if (!isDragging) {
    return null;
  }

  return (
    <CustomDragLayerContainer>
      <div style={getItemStyles(currentOffset)}>
        {item.type === "COLUMN" ? (
          <Column id={item.id} text={item.text} isPreview={true} />
        ) : (
          <Card
            columnId={item.columnId}
            isPreview={true}
            id={item.id}
            text={item.text}
          />
        )}
      </div>
    </CustomDragLayerContainer>
  );
};
