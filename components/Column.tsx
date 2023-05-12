import { ColumnContainer, ColumnTitle } from "@/styles/style";
import React, { FC } from "react";
import { AddNewItem } from "./AddNewItem";

type ColumnProps = {
  // We want the text prop to be required, so don’t add the question mark.
  text?: string | undefined;
  children: React.ReactNode;
};

// pass the Card components children to our Column components.
// used the React.FC type to define the children prop on our component.
export const Column: FC<ColumnProps> = ({ text, children }) => {
  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      {children}
      <AddNewItem
        toggleButtonText="+ Add another task"
        onAdd={console.log}
        dark
      />
    </ColumnContainer>
  );
};
