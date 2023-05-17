import TaskModal from "@/modals/TaskModal";
import { useState } from "react";
import { useSelector } from "react-redux";

function Task({ colIndex, taskIndex }) {
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;
  const col = columns.find((col, i) => i === colIndex);
  const task = col.tasks.find((task, i) => i === taskIndex);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  let completed = 0;
  let subtasks = task.subtasks;
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });

  const handleOnDrag = (e) => {
    e.dataTransfer.setData(
      "text",
      JSON.stringify({ taskIndex, prevColIndex: colIndex })
    );
  };

  return (
    <>
      <article
        // onClick={() => {
        //   setIsTaskModalOpen(true);
        // }}
        draggable
        onDragStart={handleOnDrag}
        className="w-[280px] first:my-5 rounded border bg-white dark:bg-[#2b2c37] shadow-[#364e7e1a] py-6 px-3 hover:text-[#635fc7] dark:text-white dark:hover:text-[#635fc7] cursor-pointer "
      >
        <p className="font-semibold text-gray-900 text-md">{task.title}</p>
        <p className="font-medium text-sm text-gray-600">24 Jan 2023</p>
        {/* <p className=" font-bold text-xs tracking-tighter mt-2 text-gray-500">
          {completed} of {subtasks.length} completed tasks
        </p> */}
      </article>
      {isTaskModalOpen && (
        <TaskModal
          colIndex={colIndex}
          taskIndex={taskIndex}
          setIsTaskModalOpen={setIsTaskModalOpen}
        />
      )}
    </>
  );
}

export default Task;
