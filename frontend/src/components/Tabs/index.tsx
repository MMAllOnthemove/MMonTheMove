import React from "react";
const TabItem = (props: any) => <div {...props} />;

type TTabs = {
  onTabClick: (data: string | number) => void;
  children: React.ReactNode | string[] | any;
  defaultIndex: number | string;
};
type TTabButtonProps = {
  props: {
    index: string | number;
    label: string | number | boolean | any;
  };
};

const Tabs = ({ defaultIndex = 0, onTabClick, children }: TTabs) => {
  const [bindIndex, setBindIndex] = React.useState(defaultIndex);
  const changeTab = (newIndex: string | number | boolean | any) => {
    if (typeof onTabClick === "function") onTabClick(newIndex);
    setBindIndex(newIndex);
  };
  const items = children.filter((item: any) => item.type.name === "TabItem");

  return (
    <div className="tabs-wrapper w-full">
      <div className="tab-menu">
        {items.map(({ props: { index, label } }: TTabButtonProps) => (
          <button
            key={`tab-btn-${index}`}
            onClick={() => changeTab(index)}
            className={bindIndex === index ? "focus" : ""}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="tab-view">
        {items.map(({ props }: any) => (
          <div
            {...props}
            className={`tab-content ${
              bindIndex === props.index ? "selected" : ""
            }`}
            key={`tab-content-${props.index}`}
          />
        ))}
      </div>
    </div>
  );
};
export { Tabs, TabItem };
// To use:
{
  /* <Tabs defaultIndex="1" onTabClick={console.log}>
  <TabItem label="A" index="1">
    Lorem ipsum
  </TabItem>
  <TabItem label="B" index="2">
    Dolor sit amet
  </TabItem>
</Tabs>; */
}
