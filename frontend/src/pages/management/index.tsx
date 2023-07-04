import Head from "next/head";
import { memo, useContext, useEffect, useState } from "react";
// import Modal from "../../../components/Modals/Modal";
import { managementModalState } from "@/atoms/managementModalAtom";
import { useSetRecoilState } from "recoil";
import ModalManagement from "../../../components/Modals/modal.management";
import Navbar from "../../../components/Navbar";
import { AccountContext } from "@/state/AccountContext";
// This is the axios instance
import { getSOInfoAllFunction } from "@/functions/ipass_api";
import UnitFinder from "../api/UnitFinder";
// Table
import { TableInfoContext } from "@/context/TableInfoContext";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Management = () => {
  const [data, setData] = useState<null | any>(null);
  const [isLoading, setLoading] = useState(false);
  // Not to be confused with 'setServiceOrder'
  const [searchServiceOrder, setSearchServiceOrder] = useState("");
  const { user, setUser } = useContext(AccountContext);
  const toast = useToast();
  // Global state for the modal
  const setManagementModalState = useSetRecoilState(managementModalState);

  const [service_order, setServiceOrder] = useState("");
  const [warranty, setWarranty] = useState("");
  const [model, setModel] = useState("");
  const [imei, setImei] = useState("");
  const [fault, setFault] = useState("");
  const [serial_number, setSerialNumber] = useState("");
  const [engineer, setEngineer] = useState("");
  const [engineerAnalysis, setEngineerAnalysis] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [createdTime, setCreatedTime] = useState("");
  const [engineerAssignDate, setEngineerAssignDate] = useState("");
  const [engineerAssignTime, setEngineerAssignTime] = useState("");
  const [inHouseStatus, setInHouseStatus] = useState("");
  const [qualityControl, setQualityControl] = useState("");
  const [ticket, setTicket] = useState("");

  useEffect(() => {
    getSOInfoAllFunction({
      searchServiceOrder,
      setServiceOrder,
      setCreatedDate,
      setCreatedTime,
      setModel,
      setWarranty,
      setEngineer,
      setFault,
      setImei,
      setSerialNumber,
      setEngineerAssignDate,
      setEngineerAssignTime,
    });
  }, [searchServiceOrder]);

  const postData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_URL_MANAGEMENT}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service_order,
            createdDate,
            createdTime,
            model,
            warranty,
            engineer,
            fault,
            imei,
            serial_number,
            inHouseStatus,
            engineerAssignDate,
            engineerAssignTime,
            engineerAnalysis,
            ticket,
          }),
        }
      );
      if (response) {
        toast({
          title: "Job added.",
          description: "You've added a job to the table.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setManagementModalState({
          open: false,
          view: "management",
        });
        window.location.reload();
      } else {
        toast({
          title: "Job failed to add.",
          description: "Failed to add a job to the table.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        window.location.reload();
      }
      console.log("Response is", response);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  // For the table
  const router = useRouter();

  // Use context from the context we created
  // destructure the context
  const { tableInfo, setTableInfo } = useContext(TableInfoContext);

  // Fetching info from our database
  const fetchDataFromDatabase = async () => {
    try {
      //  '/' not to be confused with home
      // the / is putting it at the end of our axios instance url defined in api folder
      const response = await UnitFinder.get("/");
      // console.log("Response is", response);
      // Accesing the response like this because we logged it to see how it was structured
      setTableInfo(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDataFromDatabase();
  }, []);

  // Redirects user to the edit table page
  const handleUpdate = (e: React.SyntheticEvent, id: string | number) => {
    e.stopPropagation();
    router.push(`/management/edit/${id}`);
  };

  // Table contents

  const TableContent = (props: any) =>
    props.list.map((item: any) => {
      const {
        id,
        service_order_no,
        created_date,
        model,
        warranty,
        engineer,
        fault,
        imei,
        serial_number,
        in_house_status,
        engineer_assign_date,
        partsPendingDate,
        partsOrderedDate,
        partsIssuedDate,
        qcCompletedDate,
        repairCompletedDate,
        engineer_analysis,
        ticket,
      } = item;
      return (
        <>
          <tr
            key={id}
            onDoubleClick={(e) => handleUpdate(e, id)}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <td
              scope="row"
              className="px-6 py-4 font-sans whitespace-nowrap dark:text-white"
            >
              {service_order_no}
            </td>
            <td className="px-6 py-4">{created_date}</td>
            <td className="px-6 py-4">{model}</td>
            <td className="px-6 py-4">{warranty}</td>
            <td className="px-6 py-4">{engineer}</td>
            <td className="px-6 py-4">{fault}</td>
            <td className="px-6 py-4">{imei}</td>
            <td className="px-6 py-4">{serial_number}</td>
            <td className="px-6 py-4">{in_house_status}</td>
            <td className="px-6 py-4">{engineer_assign_date}</td>
            <td className="px-6 py-4">{partsPendingDate}</td>
            <td className="px-6 py-4">{partsOrderedDate}</td>
            <td className="px-6 py-4">{partsIssuedDate}</td>
            <td className="px-6 py-4">{qcCompletedDate}</td>
            <td className="px-6 py-4">{repairCompletedDate}</td>
            <td className="px-6 py-4">{engineer_analysis}</td>
            <td className="px-6 py-4">{ticket}</td>
          </tr>
        </>
      );
    });

  // Table search and local storage
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const filterTableContents = tableInfo.filter((cell: string | any) => {
    return (
      cell.service_order_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cell.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cell.engineer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cell.imei.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cell.serial_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cell.ticket.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  return (
    <>
      <Head>
        <title>Management</title>
      </Head>
      <Navbar />

      <main>
        <div className="container flex justify-center flex-col mx-auto p-2">
          <section className="flex justify-center pt-5">
            <h1 className="md:text-3xl text-xl font-semibold leading-3 text-gray-800">
              HHP Management
            </h1>
          </section>
          <section className="flex justify-between items-center py-5">
            <form className="flex items-center">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 font-sans border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-primary-500 block w-full pl-10 p-2"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </form>
            <button
              className="bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus:bg-[#075985] text-white font-semibold cursor-pointer font-sans rounded-md p-3 my-2"
              type="button"
              onClick={() =>
                setManagementModalState({
                  open: true,
                  view: "management",
                })
              }
            >
              Add job
            </button>

            {/* Called the modal here and added a post data prop that posts data on click */}
            <ModalManagement>
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
                  className="w-full outline-none py-2 px-2 border-2 rounded-md my-2"
                  size={10}
                  maxLength={10}
                  value={searchServiceOrder}
                  onChange={(e) => {
                    setSearchServiceOrder(e.target.value);
                  }}
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
                  className="w-full disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-noneoutline-none bg-white py-2 px-2 border-2 border-slate-400 rounded-md my-2"
                  value={warranty}
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
                  className="outline-none bg-white py-2 px-2 border-2 border-slate-400 rounded-md my-2"
                  value={inHouseStatus}
                  onChange={(e) => setInHouseStatus(e.target.value)}
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
                  className="outline-none bg-white py-2 px-2 border-2 border-slate-400 rounded-md my-2"
                  value={ticket}
                  onChange={(e) => setTicket(e.target.value)}
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
                  className="outline-none bg-white py-2 px-2 border-2 border-slate-400 rounded-md my-2"
                  value={engineerAnalysis}
                  onChange={(e) => setEngineerAnalysis(e.target.value)}
                  hidden
                />

                <div className="flex g-3 justify-between items-center">
                  <button
                    onClick={postData}
                    type="button"
                    className="bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus: text-white font-semibold font-sans rounded py-3 px-2 my-2 w-full ml-3"
                  >
                    Add
                  </button>
                </div>
              </section>
            </ModalManagement>
          </section>

          <section className="relative overflow-x-auto shadow-md rounded-sm my-5">
            <div className="row flex items-center justify-center">
              <span className="flex mx-auto text-center font-medium font-sans py-1 text-gray-500">
                To edit, double click on the row you want to edit
              </span>
            </div>
            <table className="w-full text-sm text-left text-gray-500 font-medium dark:text-gray-400 table-auto">
              <thead className="text-xs text-white uppercase bg-[#075985] dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {/* <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th> */}
                  <th scope="col" className="px-6 py-3">
                    Service Order
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Booking
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Model
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Warranty
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Technician
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Fault
                  </th>
                  <th scope="col" className="px-6 py-3">
                    IMEI
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Serial Number
                  </th>
                  <th scope="col" className="px-6 py-3">
                    In house status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quality Control
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Assessment Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Engineer Analysis
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Ticket number
                  </th>
                </tr>
              </thead>
              <tbody>
                <TableContent list={filterTableContents} />
              </tbody>
            </table>
          </section>
        </div>
      </main>
    </>
  );
};
export default memo(Management);
