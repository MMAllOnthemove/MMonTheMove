import { useRef } from "react";
import { CardContainer } from "@/styles/styles";
import { useItemDrag } from "@/utils/useItemDrag";
import { useDrop } from "react-dnd";
import { useAppState } from "@/state/AppStateContext";
import { moveTask, setDraggedItem } from "@/state/actions";

type CardProps = {
  text: string;
  id: string;
};
export const Card = ({ text }: CardProps) => {
  return <CardContainer>{text}</CardContainer>;
};
