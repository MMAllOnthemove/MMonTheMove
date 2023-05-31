import { useState } from "react";
import { AddItemButton } from "@/styles/styles";
import { NewItemForm } from "./NewItemForm";

interface AddNewItemProps {
  onAdd(text: String): void;
  toggleButtonText: string;
  dark?: boolean;
}
export const AddNewItem = (props: AddNewItemProps) => {
  const [showForm, setShowForm] = useState(false);
  const { onAdd, toggleButtonText, dark } = props;
  if (showForm) {
    return (
      <NewItemForm
        onAdd={(text) => {
          onAdd(text);
          setShowForm(false);
        }}
      />
    );
  }
  return (
    <AddItemButton dark={true} onClick={() => setShowForm(true)}>
      {toggleButtonText}
    </AddItemButton>
  );
};
