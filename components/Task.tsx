import React from "react";
import { TaskModel } from "../utils/models";
import { TrashIcon } from "@heroicons/react/24/outline";

type TaskProps = {
  index: number;
  task: TaskModel;
};

function Task({ index, task }: TaskProps) {
  return (
    <article className="relative rounded w-200 pl-3 pr-7 pt-3 pb-1 shadow-sm cursor-grab">
      <TrashIcon className="absolute top-0 right-0 bg-gray-700 opacity-0 hover:opacity-10" />
      <label htmlFor="w3review" className="sr-only">
        {""}
      </label>
      <textarea id="w3review" name="w3review" value={task.title} className="font-semibold cursor-inherit border-0 resize-none min-h-70 max-h-200 focus:outline-none focus:border-0"></textarea>
    </article>
  );
}

export default Task;
