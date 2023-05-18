import { ColumnContainer, ColumnTitle } from "@/styles/styles";
import { AddNewItem } from "./AddNewItem";
import { useRef } from "react";
import { Card } from "./Card";
import { useAppState } from "@/state/AppStateContext";
import { addTask, moveList } from "@/state/actions";
import { useItemDrag } from "@/utils/useItemDrag";
import { useDrop } from "react-dnd";

type ColumnProps = {
  text: string;
  id: string;
};
export const Column = ({ text, id }: ColumnProps) => {
  const { draggedItem, getTasksByListId, dispatch } = useAppState();
  const tasks = getTasksByListId(id);
  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: "COLUMN",
    hover() {
      if (!draggedItem) {
        return;
      }
      if (draggedItem.type === "COLUMN") {
        if (draggedItem.id === id) {
          return;
        }
        dispatch(moveList(draggedItem.id, id));
      }
    },
  });
  const { drag } = useItemDrag({ type: "COLUMN", id, text });
  drag(drop(ref));
  return (
    <ColumnContainer ref={ref}>
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map((task) => (
        <Card text={task.text} key={task.id} id={task.id} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another card"
        onAdd={(text) => dispatch(addTask(text, id))}
        dark
      />
    </ColumnContainer>
  );
};
