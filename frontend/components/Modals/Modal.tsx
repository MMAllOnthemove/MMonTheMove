import React, { useEffect, useState } from "react";

interface Props {
  setShowModal: any;
  children: React.ReactNode;
  modalTitle: string;
  setCloseModal?: () => void;
}

function Modal({ setShowModal, children, modalTitle, setCloseModal }: Props) {
  return (
    <div className="overlay w-screen z-10 h-screen absolute left-0 top-0 bg-[#000]/20 flex justify-center items-center flex-col">
      <div className=" bg-white  p-10 rounded-lg shadow">
        <div className="capitalize flex justify-between items-center">
          <h3 className="font-medium text-gray-900 capitalize text-[1.2rem]">
            {modalTitle}
          </h3>
          <button
            className="border-none bg-transparent"
            onClick={() => {
              setShowModal(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
