import AddEditBoardModal from "@/modals/AddEditBoardModal";
import AddEditTaskModal from "@/modals/AddEditTaskModal";
import DeleteModal from "@/modals/DeleteModal";
import boardsSlice from "@/redux/boardsSlice";
import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import ElipsisMenu from "./ElipsisMenu";
import HeaderDropDown from "./ManagementTabOneHeaderDropdown";
import { Menu, Transition } from "@headlessui/react";

function ManagementTabOneHeader({ setIsBoardModalOpen, isBoardModalOpen }) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
  const [boardType, setBoardType] = useState("add");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const dispatch = useDispatch();

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);

  const onDropdownClick = () => {
    setOpenDropdown((state) => !state);
    setIsElipsisMenuOpen(false);
    setBoardType("add");
  };

  const setOpenEditModal = () => {
    setIsBoardModalOpen(true);
    setIsElipsisMenuOpen(false);
  };
  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  const onDeleteBtnClick = (e) => {
    if (e.target.textContent === "Delete") {
      dispatch(boardsSlice.actions.deleteBoard());
      dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
      setIsDeleteModalOpen(false);
    } else {
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="w-full flex items-center">
      <header className="w-full flex items-center justify-between mb-3">
        {/* Left Side  */}
        <h3 className="truncate md:text-2xl text-xl font-bold font-sans">
          {board.name}
        </h3>

        {/* Right Side */}

        <div className="flex place-content-end items-center gap-2">
          {/* <button
            className="border rounded"
            onClick={() => {
              setIsBoardModalOpen(true);
            }}
          >
            Add new column
          </button>
          <button
            className="border"
            onClick={() => {
              setIsTaskModalOpen((prevState) => !prevState);
            }}
          >
            Add New Task
          </button>
          <button
            onClick={() => {
              setIsTaskModalOpen((prevState) => !prevState);
            }}
            className=" button py-1 px-3 md:hidden "
          >
            +
          </button> */}

          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                Menu
                {/* <ChevronDownIcon
                    className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                    aria-hidden="true"
                  /> */}
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-100 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    <button
                      className={`
                              text-gray-900
                          group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      Edit
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      className={`
                              text-gray-900
                          group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      Duplicate
                    </button>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          <Menu as="div" className="relative inline-block text-left">
            <div
              onClick={() => {
                setBoardType("edit");
                setOpenDropdown(false);
                setIsElipsisMenuOpen((prevState) => !prevState);
              }}
            >
              <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                  />
                </svg>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-100 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    <button
                      onClick={() => {
                        setOpenEditModal();
                      }}
                      className={`
                              text-gray-900
                          group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      Edit
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      onClick={() => setOpenDeleteModal()}
                      className={`
                              text-gray-900
                          group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      Delete
                    </button>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          {/* 
          <svg
            onClick={() => {
              // setBoardType("edit");
              // setOpenDropdown(false);
              setIsElipsisMenuOpen((prevState) => !prevState);
            }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
            />
          </svg> */}

          {/* <img
            onClick={() => {
              setBoardType("edit");
              setOpenDropdown(false);
              setIsElipsisMenuOpen((prevState) => !prevState);
            }}
            src={elipsis}
            alt="elipsis"
            className=" cursor-pointer"
          /> */}
          {isElipsisMenuOpen && (
            <Menu>
              <Menu.Items
                type="Boards"
                setOpenEditModal={setOpenEditModal}
                setOpenDeleteModal={setOpenDeleteModal}
                className="absolute right-0 mt-2 w-100 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    <button
                      onClick={() => {
                        setOpenEditModal();
                      }}
                      className={`
                            text-gray-900
                        group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      Edit
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      onClick={() => setOpenDeleteModal()}
                      className={`
                            text-gray-900
                        group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      Delete
                    </button>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
            // <ElipsisMenu
            //   type="Boards"
            //   setOpenEditModal={setOpenEditModal}
            //   setOpenDeleteModal={setOpenDeleteModal}
            // />
          )}
        </div>

        {openDropdown && (
          <HeaderDropDown
            setOpenDropdown={setOpenDropdown}
            setIsBoardModalOpen={setIsBoardModalOpen}
          />
        )}
      </header>
      {isTaskModalOpen && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setIsTaskModalOpen}
          type="add"
          device="mobile"
        />
      )}

      {isBoardModalOpen && (
        <AddEditBoardModal
          setBoardType={setBoardType}
          type={boardType}
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          type="board"
          title={board.name}
          onDeleteBtnClick={onDeleteBtnClick}
        />
      )}
    </div>
  );
}

export default ManagementTabOneHeader;
