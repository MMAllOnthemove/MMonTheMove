import { useAppState } from "@/state/AppStateContext";
import { AppContainer } from "@/styles/styles";
import { AddNewItem } from "./AddNewItem";
import { Column } from "./Column";
import { addList } from "@/state/actions";

const Kanban = () => {
  const { lists, dispatch } = useAppState();
  return (
    <AppContainer>
      {lists.map((list) => (
        <Column text={list.text} key={list.id} id={list.id} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another list"
        onAdd={(text) => dispatch(addList(text))}
      />
    </AppContainer>
  );
};

export default Kanban;
