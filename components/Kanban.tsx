import { useAppState } from "@/state/AppStateContext";
import { AppContainer } from "@/styles/styles";
import { AddNewItem } from "./AddNewItem";
import { Column } from "./Column";
import { addList } from "@/state/actions";
import CustomDragLayer from "./CustomDragLayer";
import { DragItem } from "./DragItem";


interface Task {
  id: string
  text: string
}

interface List {
  id: string
  text: string
  tasks: Task[]
}

export interface AppState {
  draggedItem: DragItem | undefined
  lists: List[]
}


const Kanban = () => {
  const { state, dispatch } = useAppState()
  return (
    <AppContainer>
      <CustomDragLayer />
      {state.lists.map((list, i) => (
        <Column id={list.id} text={list.text} key={list.id} index={i} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another list"
        onAdd={text => dispatch({ type: "ADD_LIST", payload: text })}
      />
    </AppContainer>
  )
};

export default Kanban;
