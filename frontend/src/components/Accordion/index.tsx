import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

const Accordion = ({
  children,
  title,
}: {
  children: React.ReactNode | any;
  title: string;
}) => {
  const [expand, setExpand] = useState(false);
  return (
    <div className="accordion mb-2 w-full cursor-pointer text-sm text-slate-800 font-bold border border-[#eee] rounded-sm">
      <div
        className="accordion-title-box p-2"
        onClick={() => setExpand((expand) => !expand)}
      >
        <span className="flex items-center justify-between">
          {title}
          {!expand ? (
            <ChevronDownIcon className="h-6 w-6 text-slate-800" />
          ) : (
            <ChevronUpIcon className="h-6 w-6 text-slate-800" />
          )}
        </span>

        <div className="accordion-clearfix"></div>
      </div>
      {expand && (
        <div className="accordion-content p-2 shadow-sm">{children}</div>
      )}
    </div>
  );
};

export default Accordion;
