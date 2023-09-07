import React from "react";
import Button from "../Buttons";
import { unitStatus } from "../../public/_data/statuses";

interface IProps {
  searchTicket: string | number;
  setSearchTicket: (e: React.ChangeEvent<HTMLInputElement>) => void;
  repairFault: string | undefined;
  repairWarranty: string | undefined;
  setRepairWarranty: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  repairImei: string | number | undefined;
  setRepairImei: (e: React.ChangeEvent<HTMLInputElement>) => void;
  repairSerialNumber: string | number | undefined;
  setRepairSerialNumber: (e: React.ChangeEvent<HTMLInputElement>) => void;
  repairModel: string | undefined;
  setRepairModel: (e: React.ChangeEvent<HTMLInputElement>) => void;
  repairInHouseStatus: string | undefined;
  setRepairInHouseStatus: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  repairEngineer: string | undefined;
  setRepairEngineer: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  postRepairData: (e: React.SyntheticEvent) => void;
  repairAPILoading: boolean;
}

export function HomepageModalTabTwoContent(props: IProps) {
  const {
    searchTicket,
    setSearchTicket,
    repairFault,
    repairWarranty,
    setRepairWarranty,
    repairImei,
    setRepairImei,
    repairSerialNumber,
    setRepairSerialNumber,
    repairModel,
    setRepairModel,
    repairInHouseStatus,
    setRepairInHouseStatus,
    repairEngineer,
    setRepairEngineer,
    postRepairData,
    repairAPILoading,
  } = props;
  return (
    <form
      onSubmit={postRepairData}
      className="flex flex-col overflow-auto"
      id="repairshpr_api_form"
    >
      <input
        type="text"
        name="searchTicket"
        id="searchTicket"
        className="w-full outline-none py-2 px-2 border-2 font-sans font-semibold text-sm rounded-sm my-2"
        placeholder="Search Ticket"
        value={searchTicket}
        onChange={setSearchTicket}
      />

      {repairAPILoading ? (
        "Loading..."
      ) : (
        <>
          <label htmlFor="subject" className="sr-only">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            placeholder="Subject"
            className="w-full disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none outline-none bg-white py-2 px-2 border-2 border-slate-400 font-sans font-semibold text-sm rounded-sm my-2"
            defaultValue={repairFault}
            disabled
            aria-disabled
          />
          <label htmlFor="repairWarranty" className="sr-only">
            Warranty
          </label>
          <select
            name="repairWarranty"
            id="repairWarranty"
            className="cursor-pointer mb-2 bg-white outline-none border border-gray-300 outline-0 text-gray-900 font-sans font-semibold text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            value={repairWarranty || ""}
            onChange={setRepairWarranty}
          >
            <option value="" disabled>
              Select warranty
            </option>
            <option value="LP">LP</option>
            <option value="OW">OOW</option>
          </select>
          <label htmlFor="repairImei" className="sr-only">
            IMEI
          </label>
          <input
            type="text"
            name="repairImei"
            id="repairImei"
            placeholder="IMEI"
            className="w-full outline-none py-2 px-2 border-2 font-sans font-semibold text-sm rounded-sm my-2"
            value={repairImei || ""}
            onChange={setRepairImei}
          />
          <label htmlFor="repairSerialNumber" className="sr-only">
            Serial Number
          </label>
          <input
            type="text"
            name="repairSerialNumber"
            id="repairSerialNumber"
            placeholder="Serial Number"
            className="w-full outline-none py-2 px-2 border-2 font-sans font-semibold text-sm rounded-sm my-2"
            value={repairSerialNumber || ""}
            onChange={setRepairSerialNumber}
            required
            aria-required
          />
          <label htmlFor="repairModel" className="sr-only">
            Model
          </label>
          <input
            type="text"
            name="repairModel"
            id="repairModel"
            className="w-full outline-none py-2 px-2 border-2 font-sans font-semibold text-sm rounded-sm my-2"
            placeholder="Model"
            value={repairModel}
            onChange={setRepairModel}
          />
          <select
            value={repairInHouseStatus || ""}
            onChange={setRepairInHouseStatus}
            required
            aria-required
            id="repairInHouseStatus"
            className="cursor-pointer mb-2 bg-white outline-none border border-gray-300 outline-0 text-gray-900 font-sans font-semibold text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option disabled value="">
              Choose status
            </option>
            {unitStatus.map((stat) => (
              <option key={stat.id} value={`${stat._status}`}>
                {stat?._status}
              </option>
            ))}
          </select>
          <label htmlFor="repairEngineer" className="sr-only">
            Engineer
          </label>
          <select
            name="repairEngineer"
            id="repairEngineer"
            required
            aria-required
            className="cursor-pointer mb-2 bg-white outline-none border border-gray-300 outline-0 text-gray-900 font-sans font-semibold text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            value={repairEngineer || ""}
            onChange={setRepairEngineer}
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

          <Button
            type="submit"
            text="Add"
            className="bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus: text-white font-semibold font-sans rounded py-3 px-2 my-2 w-full"
          />
          {/* <button
        type="submit"
        className="bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus: text-white font-semibold font-sans rounded py-3 px-2 my-2 w-full"
      >
        Add
      </button> */}
        </>
      )}
    </form>
  );
}
