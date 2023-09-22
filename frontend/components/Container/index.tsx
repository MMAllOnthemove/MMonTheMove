import React from "react";

interface IProps {
  children: React.ReactNode;
}
function Container(props: IProps) {
  const { children } = props;
  return <div className="container mx-auto p-2">{children}</div>;
}

export default Container;
