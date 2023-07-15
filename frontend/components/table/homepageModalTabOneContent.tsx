import React from "react";

interface IProps {
  searchServiceOrder: string;
  setSearchServiceOrder: (e: React.ChangeEvent<HTMLInputElement>) => void;
  warranty: string;
  inHouseStatus: string;
  setInHouseStatus: (e: React.ChangeEvent<HTMLInputElement>) => void;
  ticket: string;
  setTicket: (e: React.ChangeEvent<HTMLInputElement>) => void;
  engineerAnalysis: string;
  setEngineerAnalysis: (e: React.ChangeEvent<HTMLInputElement>) => void;
  engineer: string;
  setEngineer: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  department: string;
  setDepartment: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  postData: () => void;
}

export function HomepageModalTabOneContent(props: IProps) {
  return (
    <>
      <section className="flex flex-col overflow-auto">
        <label htmlFor="ServiceOrder" className="sr-only">
          Service Order No
        </label>
        <input
          aria-labelledby="ServiceOrder"
          type="text"
          name="ServiceOrder"
          placeholder="Service Order"
          id="ServiceOrder"
          className="w-full outline-none py-2 px-2 border-2 font-sans font-semibold text-sm rounded-sm my-2"
          size={10}
          maxLength={10}
          value={props.searchServiceOrder}
          onChange={props.setSearchServiceOrder}
        />
        <label htmlFor="Warranty" className="sr-only">
          Warranty
        </label>
        <input
          aria-labelledby="warranty"
          type="text"
          name="warranty"
          placeholder="Warranty"
          id="warranty"
          className="w-full disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none outline-none bg-white py-2 px-2 border-2 border-slate-400 font-sans font-semibold text-sm rounded-sm my-2"
          value={props.warranty}
          disabled
        />
        <label htmlFor="inHouseStatus" className="sr-only">
          In house status
        </label>
        <input
          aria-labelledby="inHouseStatus"
          type="text"
          name="inHouseStatus"
          placeholder="In house status"
          id="inHouseStatus"
          className="outline-none bg-white py-2 px-2 border-2 border-slate-400 font-sans font-semibold text-sm rounded-sm my-2"
          value={props.inHouseStatus}
          onChange={props.setInHouseStatus}
          hidden
        />
        <label htmlFor="ticketNumber" className="sr-only">
          Ticket Number
        </label>
        <input
          aria-labelledby="ticketNumber"
          type="text"
          name="ticketNumber"
          placeholder="Ticket Number"
          id="ticketNumber"
          className="outline-none bg-white py-2 px-2 border-2 border-slate-400 font-sans font-semibold text-sm rounded-sm my-2"
          value={props.ticket}
          onChange={props.setTicket}
          hidden
        />
        <label htmlFor="engineerAnalysis" className="sr-only">
          Engineer Analysis
        </label>
        <input
          aria-labelledby="engineerAnalysis"
          type="text"
          name="engineerAnalysis"
          placeholder="Engineer Analysis"
          id="engineerAnalysis"
          className="outline-none bg-white py-2 px-2 border-2 border-slate-400 font-sans font-semibold text-sm rounded-sm my-2"
          value={props.engineerAnalysis}
          onChange={props.setEngineerAnalysis}
          hidden
        />
        <label htmlFor="engineerAnalysis" className="sr-only">
          Engineer
        </label>
        <select
          name="engineer"
          id="engineer"
          className="mb-2 bg-white outline-none border border-gray-300 outline-0 text-gray-900 font-sans font-semibold text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          value={props.engineer}
          onChange={props.setEngineer}
        >
          <option value="" disabled>
            Select engineer
          </option>
          <option value="Acklas Sakala">Acklas Sakala</option>
          <option value="Manuel Kaba">Manuel Kaba</option>
          <option value="Olivier Munguakolwa">Olivier Munguakolwa</option>
          <option value="Paulas Gambu">Paulas Gambu</option>
          <option value="Pule Mokoena">Pule Mokoena</option>
          <option value="Sizwe Phungwayo">Sizwe Phungwayo</option>
        </select>
        <label htmlFor="engineerAnalysis" className="sr-only">
          Department
        </label>
        <select
          name="engineer"
          id="engineer"
          className="mb-2 bg-white outline-none border border-gray-300 outline-0 text-gray-900 font-sans font-semibold text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          value={props.department}
          onChange={props.setDepartment}
        >
          <option value="" disabled>
            Select department
          </option>
          <option value="HHP">HHP</option>
        </select>
        <div className="flex g-3 justify-between items-center">
          <button
            onClick={props.postData}
            type="button"
            className="bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus: text-white font-semibold font-sans rounded py-3 px-2 my-2 w-full"
          >
            Add
          </button>
        </div>
      </section>
    </>
  );
}
