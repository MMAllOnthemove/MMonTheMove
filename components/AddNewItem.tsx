import { useState } from "react";
import { AddItemButton } from "@/styles/style";
import { NewItemForm } from "./NewItemForm";

type AddNewItemProps = {
  onAdd(text: string): void;
  toggleButtonText: string;
  dark?: boolean;
};

export const AddNewItem = (props: AddNewItemProps) => {
  // It holds a showForm boolean state. When this state is true, we show an input with
  // the “Create” button. When it’s false, we render the button with toggleButtonText on it.

  //   In our case we passed the boolean value false, so TypeScript was able to infer that
  // the type of the showForm state is boolean.
  const [showForm, setShowForm] = useState<boolean>(false);
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
    <AddItemButton dark={dark} onClick={() => setShowForm(true)}>
      {toggleButtonText}
    </AddItemButton>
  );
};
