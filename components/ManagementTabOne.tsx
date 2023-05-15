import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddEditBoardModal from "@/modals/AddEditBoardModal";
import Column from "./Column";
import EmptyBoard from "./EmptyBoard";
import { nanoid } from "@reduxjs/toolkit";
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
    // <div className="flex items-start flex-row gap-5 h-full w-full py-2">

    //   {/* Columns Section */}

    //   {columns.length > 0 ? (
    //     console.log(columns)
    //     <>
    //       {columns.map((col: any, index: any) => (
    //         <div className="row flex items-center gap-5">
    //           <Column key={col.name} colIndex={index} />
    //         </div>
    //       ))}
    //     </>
    //   ) : (
    //     <>
    //       <EmptyBoard type="edit" />
    //     </>
    //   )}
    //   {isBoardModalOpen && (
    //     <AddEditBoardModal
    //       type="edit"
    //       setIsBoardModalOpen={setIsBoardModalOpen}
    //     />
    //   )}
    // </div>
    <section className="flex items-start flex-row h-full w-full gap-5">
      {columns.length > 0 ? (
        <>
          {columns.map((col: any, index: any) => (
            <Column key={index} colIndex={index} />
          ))}
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
    </section>
  );
}

export default ManagementTabOne;
