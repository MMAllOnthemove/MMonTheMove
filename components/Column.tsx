import React from "react";
import { ColumnType } from "../utils/enums";
import { PlusIcon } from "@heroicons/react/24/outline";

const ColumnColorScheme: Record<ColumnType, string> = {
  Todo: "gray",
  "In Progress": "blue",
  Blocked: "red",
  Completed: "green",
};

function Column({ column }: { column: ColumnType }) {
  return (
    <>
      <h2 className="text-medium mb-4 tracking-wide">
        <span className="badge px-2 py-1 rounded border">{column}</span>
      </h2>
    </>
  );
}

export default Column;
