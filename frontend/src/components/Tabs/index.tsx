import React, { ReactElement, useState } from "react";

// import styles from './tabs.module.css';
import TabTitle, { Props as TabTitleProps } from "./TabTitle";

type Props = {
  children: ReactElement<TabTitleProps>[];
  preSelectedTabIndex?: number;
};

const Tabs = (props: Props): JSX.Element => {
  const { children, preSelectedTabIndex } = props;

  // First tab is shown by default
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(
    preSelectedTabIndex || 0
  );

  return (
    <div>
      <ul>
        {children.map((item, index) => (
          <TabTitle
            key={item.props.title}
            title={item.props.title}
            index={index}
            isActive={index === selectedTabIndex}
            setSelectedTab={setSelectedTabIndex}
          />
        ))}
      </ul>

      {/* show selcted tab by index*/}
      {children[selectedTabIndex]}
    </div>
  );
};

export default Tabs;
