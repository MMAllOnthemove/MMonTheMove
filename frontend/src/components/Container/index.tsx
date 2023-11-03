import { IContainerWrapper } from "../../../utils/interfaces";

function Container(props: IContainerWrapper) {
  const { children } = props;
  return <div className="container mx-auto p-2">{children}</div>;
}

export default Container;
