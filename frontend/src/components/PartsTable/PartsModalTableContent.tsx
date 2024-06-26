// Custom imports
import { engineers } from "../../../public/_data/engineers";
import { partsStatus } from "../../../public/_data/statuses";
import { IPartsModalTabOneContent } from "../../../utils/interfaces";
import Accordion from "../Accordion";
import Button from "../Buttons";

const PartsModalTabOneContent = (props: IPartsModalTabOneContent) => {
  const {
    searchServiceOrder,
    setSearchServiceOrder,
    warranty,
    inHouseStatus,
    setInHouseStatus,
    ticket,
    setTicket,
    dispatchAnalysis,
    setDispatchAnalysis,
    engineer,
    setEngineer,
    department,
    setDepartment,
    children,
    postData,
  } = props;
  // Add and remove fields via button

  return (
    <>
      <form
        onSubmit={postData}
        className="flex flex-col overflow-auto"
        id="gspn_data_form"
      >
        <Accordion title="Job info">
          <label htmlFor="ServiceOrder" className="sr-only">
            Service Order No
          </label>
          <input
            aria-labelledby="ServiceOrder"
            type="number"
            name="ServiceOrder"
            placeholder="Service Order"
            id="ServiceOrder"
            className="w-full outline-none py-2 px-2 border-2 font-semibold text-sm rounded-sm my-2 dark:bg-[#22303C] dark:text-[#eee]"
            size={10}
            maxLength={10}
            value={searchServiceOrder}
            onChange={setSearchServiceOrder}
          />
          <label htmlFor="ticket" className="sr-only">
            Set ticket no.
          </label>
          <input
            aria-labelledby="ticket"
            type="number"
            name="ticket"
            required
            aria-required
            placeholder="Ticket number"
            id="ticket"
            className="w-full outline-none py-2 px-2 border-2 font-semibold text-sm rounded-sm my-2 dark:bg-[#22303C] dark:text-[#eee]"
            size={10}
            maxLength={10}
            defaultValue={ticket}
            onChange={setTicket}
          />
          <label htmlFor="warranty" className="sr-only">
            Warranty
          </label>
          <input
            aria-labelledby="warranty"
            type="text"
            name="warranty"
            placeholder="Warranty"
            id="warranty"
            className="w-full disabled:bg-slate-50 disabled:text-slate-500 disabled:dark:bg-[#22303C] disabled:dark:text-[#eee] disabled:dark:border-slate-200 disabled:shadow-none outline-none bg-white py-2 px-2 border-2 border-slate-400 font-semibold text-sm rounded-sm my-2"
            value={warranty}
            disabled
          />
          <label htmlFor="inHouseStatus" className="sr-only">
            Choose status
          </label>
          <select
            value={inHouseStatus}
            onChange={setInHouseStatus}
            required
            aria-required
            id="inHouseStatus"
            className="cursor-pointer mb-2 bg-white dark:bg-[#22303C] dark:text-[#eee] outline-none border border-gray-300 outline-0 text-gray-900  font-semibold text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option disabled value="">
              Choose status
            </option>
            {partsStatus.map((stat) => (
              <option key={stat.id} value={`${stat._status}`}>
                {stat?._status}
              </option>
            ))}
          </select>
          <label htmlFor="dispatchAnalysis" className="sr-only">
            Dispatch Analysis
          </label>
          <input
            aria-labelledby="dispatchAnalysis"
            type="text"
            name="dispatchAnalysis"
            placeholder="Dispatch Analysis"
            id="dispatchAnalysis"
            className="outline-none bg-white py-2 px-2 border-2 border-slate-400  font-semibold text-sm rounded-sm my-2"
            value={dispatchAnalysis}
            onChange={setDispatchAnalysis}
            hidden
          />

          <label htmlFor="engineer" className="sr-only">
            Engineer
          </label>
          <select
            name="engineer"
            id="engineer"
            className="cursor-pointer mb-2 bg-white dark:bg-[#22303C] dark:text-[#eee] outline-none border border-gray-300 outline-0 text-gray-900  font-semibold text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={engineer}
            onChange={setEngineer}
            required
            aria-required
          >
            <option value="" disabled>
              Select engineer
            </option>
            {engineers.map((engineer) => (
              <option key={engineer.id} value={`${engineer._name}`}>
                {engineer?._name}
              </option>
            ))}
          </select>

          <label htmlFor="department" className="sr-only">
            Department
          </label>
          <select
            name="department"
            id="department"
            className="cursor-pointer mb-2 bg-white dark:bg-[#22303C] dark:text-[#eee] outline-none border border-gray-300 outline-0 text-gray-900  font-semibold text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={department}
            onChange={setDepartment}
            required
            aria-required
          >
            <option value="" disabled>
              Select department
            </option>
            <option value="HHP">HHP</option>
            <option value="DTV">DTV</option>
            <option value="HA">HA</option>
            <option value="PS">PS</option>
          </select>
        </Accordion>
        <Accordion title="Parts info">{children}</Accordion>

        <div className="flex g-3 justify-between items-center">
          <Button
            type="submit"
            text="Add"
            className="bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus: text-white font-semibold  rounded py-3 px-2 my-2 w-full"
          />
          {/* <button
            type="submit"
            className="bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus: text-white font-semibold  rounded py-3 px-2 my-2 w-full"
          >
            Add
          </button> */}
        </div>
      </form>
    </>
  );
};

export default PartsModalTabOneContent;
