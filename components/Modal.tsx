import React, { useState } from "react";

function Modal({ setShowModal }) {
  const [soNumber, setSoNumber] = useState("");
  const handleChange = () => {};
  return (
    <div className="overlay w-screen h-screen absolute left-0 top-0 bg-[#000]/50 flex justify-center items-center">
      <div className="modal w-[500px] bg-white p-10 rounded-lg shadow">
        <div className="form_title_container flex justify-between items-center">
          <h3>Fields will be auto populated</h3>
          <button
            className="border-none bg-transparent"
            onClick={() => {
              setShowModal(false);
            }}
          >
            x
          </button>
        </div>
        <form className="flex flex-col">
          <label htmlFor="service_order_no" className="sr-only">
            Service Order No
          </label>
          <input
            type="text"
            name="service_order_no"
            id="service_order_no"
            className="outline-none border-sky-600 py-2 px-2 border rounded-sm my-2"
            value={soNumber}
            onChange={(e) => {
              setSoNumber(e.target.value);
            }}
          />
          <input
            type="submit"
            value="Submit"
            className="bg-green-900 text-white font-semibold font-sans rounded py-3 px-2 my-2"
          />
        </form>
      </div>
    </div>
  );
}

export default Modal;
