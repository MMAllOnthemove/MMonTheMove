import React, { useCallback } from "react";

// import styles from './tabTitle.module.css';

export type Props = {
  title: string;
  index: number;
  setSelectedTab: (index: number) => void;
  isActive?: boolean;
};

const TabTitle = (props: Props): JSX.Element => {
  const { title, setSelectedTab, index, isActive } = props;

  const handleOnClick = useCallback(() => {
    setSelectedTab(index);
  }, [setSelectedTab, index]);

  return (
    <div
      className={`inline-flex rounded-md shadow-small ${
        isActive ? "border-b border-sky-500 rounded-none" : ""
      }`}
    >
      <button
        className="transition ease-in-out px-4 py-1 text-sm text-slate-800 dark:text-[#eee] text-center font-medium border-b border-transparent rounded-t-lg hover:text-gray-600 hover:border-sky-500 dark:hover:text-gray-300"
        onClick={handleOnClick}
      >
        {title}
      </button>
    </div>
  );
};

export default TabTitle;
