import React, { ReactElement } from "react";

type Props = {
  title: string;
  children: ReactElement | ReactElement[];
};

const TabPane = ({ children }: Props): JSX.Element => (
  <div className="p-1">{children}</div>
);

export default TabPane;
