import { useAppState } from "@/state/AppStateContext";
import { AppContainer } from "@/styles/styles";
import { AddNewItem } from "./AddNewItem";
import { Column } from "./Column";
import { addList } from "@/state/actions";
import { CustomDragLayer } from "./CustomDragLayer";

const Kanban = () => {
  const { lists, dispatch } = useAppState();
  return (
    <AppContainer>
      <CustomDragLayer />
      {lists.map((list) => (
        <Column id={list.id} text={list.text} key={list.id} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another list"
        onAdd={(text) => dispatch(addList(text))}
      />
    </AppContainer>
  );
};

export default Kanban;
