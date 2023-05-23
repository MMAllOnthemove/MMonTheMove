import React, { useState } from "react";

function Modal({ setShowModal }) {
  const [model, setModel] = useState("");
  const [warranty, setWarranty] = useState("");
  const [fault, setFault] = useState("");
  const [technician, setTechnician] = useState("");
  const postData = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/management", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model, warranty, fault, technician }),
      });
      console.log("Response is", response);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      className="overlay w-screen z-10 h-screen absolute left-0 top-0 bg-[#000]/50 flex justify-center items-center"
      onClick={() => {
        setShowModal(false);
      }}
    >
      <div className="modal w-[400px] bg-white p-10 rounded-lg shadow">
        <div className="form_title_container flex justify-between items-center">
          <h3 className="font-medium text-gray-900 capitalize">
            Fields will be auto populated
          </h3>
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
          <label htmlFor="model" className="sr-only">
            Model
          </label>
          <input
            type="text"
            name="model"
            placeholder="Model"
            id="model"
            className="outline-none border-sky-600 py-2 px-2 border rounded-sm my-2"
            value={model}
            onChange={(e) => {
              setModel(e.target.value);
            }}
          />
          <label htmlFor="warranty" className="sr-only">
            Warranty
          </label>
          <input
            type="text"
            name="warranty"
            id="warranty"
            placeholder="Warranty"
            className="outline-none border-sky-600 py-2 px-2 border rounded-sm my-2"
            value={warranty}
            onChange={(e) => {
              setWarranty(e.target.value);
            }}
          />
          <label htmlFor="fault" className="sr-only">
            Fault
          </label>
          <input
            type="text"
            name="fault"
            id="fault"
            placeholder="Fault"
            className="outline-none border-sky-600 py-2 px-2 border rounded-sm my-2"
            value={fault}
            onChange={(e) => {
              setFault(e.target.value);
            }}
          />
          <label htmlFor="technician" className="sr-only">
            Technician
          </label>
          <input
            type="text"
            name="technician"
            id="technician"
            placeholder="Technician"
            className="outline-none border-sky-600 py-2 px-2 border rounded-sm my-2"
            value={technician}
            onChange={(e) => {
              setTechnician(e.target.value);
            }}
          />
          <input
            onClick={postData}
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
