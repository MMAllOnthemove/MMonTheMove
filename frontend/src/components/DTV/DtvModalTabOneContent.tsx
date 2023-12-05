// External imports
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";

// Custom imports
import Button from "../Buttons";
import { engineers } from "../../../public/_data/engineers";
import { IDtvModalAddTaskContent } from "../../../utils/interfaces";

function DtvModalAddTaskContent({
  searchServiceOrder,
  setSearchServiceOrder,
  warranty,
  ticket,
  setTicket,
  engineer,
  postData,
}: IDtvModalAddTaskContent) {
  return (
    <>
      <form
        onSubmit={postData}
        className="flex flex-col overflow-auto"
        id="gspn_data_form"
      >
        <label htmlFor="ServiceOrder" className="sr-only">
          Service Order No
        </label>
        <input
          aria-labelledby="ServiceOrder"
          type="number"
          name="ServiceOrder"
          placeholder="Service Order"
          id="ServiceOrder"
          className="w-full outline-none py-2 px-2 border-2  font-semibold text-sm rounded-sm my-2"
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
          className="w-full outline-none py-2 px-2 border-2  font-semibold text-sm rounded-sm my-2"
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
          className="w-full disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none outline-none bg-white py-2 px-2 border-2 border-slate-400  font-semibold text-sm rounded-sm my-2"
          defaultValue={warranty}
          disabled
        />
        <label htmlFor="inHouseStatus" className="sr-only">
          Choose status
        </label>

        <label htmlFor="engineer" className="sr-only">
          Engineer
        </label>
        <input
          aria-labelledby="engineer"
          type="text"
          name="engineer"
          placeholder="Engineer"
          id="engineer"
          className="w-full disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none outline-none bg-white py-2 px-2 border-2 border-slate-400  font-semibold text-sm rounded-sm my-2"
          defaultValue={engineer}
          disabled
        />

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
}

export default DtvModalAddTaskContent;
