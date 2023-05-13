import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddEditBoardModal from "@/modals/AddEditBoardModal";
import Column from "./Column";
import EmptyBoard from "./EmptyBoard";
// import Sidebar from "./Sidebar";

function ManagementTabOne() {
  // const [windowSize, setWindowSize] = useState([
  //   window.innerWidth,
  //   window.innerHeight,
  // ]);

  // useEffect(() => {
  //   const handleWindowResize = () => {
  //     setWindowSize([window.innerWidth, window.innerHeight]);
  //   };

  //   window.addEventListener("resize", handleWindowResize);

  //   return () => {
  //     window.removeEventListener("resize", handleWindowResize);
  //   };
  // });

  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;

  // const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  return (
    <div className="flex items-start flex-row gap-5 h-full w-full p-5">
      {/* {windowSize[0] >= 768 && (
        <Sidebar
          setIsBoardModalOpen={setIsBoardModalOpen}
          isBoardModalOpen={isBoardModalOpen}
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
      )} */}

      {/* Columns Section */}

      {columns.length > 0 ? (
        <>
          {columns.map((col, index) => (
            <div className="row flex items-center gap-5">
              <Column key={index} colIndex={index} />
            </div>
          ))}
          {/* <div
            onClick={() => {
              setIsBoardModalOpen(true);
            }}
            className=" h-screen dark:bg-[#2b2c3740] flex justify-center items-center font-bold text-2xl hover:text-[#635FC7] transition duration-300 cursor-pointer bg-[#E9EFFA] scrollbar-hide mb-2   mx-5 pt-[90px] min-w-[280px] text-[#828FA3] mt-[135px] rounded-lg "
          >
            + New Column
          </div> */}
        </>
      ) : (
        <>
          <EmptyBoard type="edit" />
        </>
      )}
      {isBoardModalOpen && (
        <AddEditBoardModal
          type="edit"
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
    </div>
  );
}

export default ManagementTabOne;
