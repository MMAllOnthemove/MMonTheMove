import { useDrag } from "react-dnd";
import { useAppState } from "@/state/AppStateContext";
import { DragItem } from "./DragItem";
import { useEffect } from "react";
import { getEmptyImage } from "react-dnd-html5-backend";

// export const useItemDrag = (item: DragItem) => {
//   const { dispatch } = useAppState();

//   const [{ isDragging }, drag] = useDrag({
//     type: item.type, //Contains data about the item we're trying to drag
//     //Item replaced Begin in the new version of React DnD
//     item: () => {
//       return [
//         item,
//         dispatch({
//           type: "SET_DRAGGED_ITEM",
//           payload: item,
//         }), //Need to return Item + action
//       ];
//     },

//     end: () =>
//       dispatch({
//         type: "SET_DRAGGED_ITEM",
//         payload: undefined,
//       }),
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   return { drag };
// };

export const useItemDrag = (item: DragItem) => {
  const { dispatch } = useAppState();
  const [, drag, preview] = useDrag({
    type: item.type,
    item: () => dispatch({ type: "SET_DRAGGED_ITEM", payload: item }),
    end: () => dispatch({ type: "SET_DRAGGED_ITEM", payload: undefined }),
  });
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);
  return { drag };
};
