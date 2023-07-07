import Head from "next/head";
import { useEffect, useState } from "react";
// import Modal from "../../../components/Modals/Modal";
import { managementModalState } from "@/atoms/managementModalAtom";
import { useSetRecoilState } from "recoil";
import ModalManagement from "../../components/Modals/modal.management";
import Navbar from "../../components/Navbar";
import { useToast } from "@chakra-ui/react";
// This is the axios instance
import { getSOInfoAllFunction } from "@/functions/ipass_api";

// Tanstack table
import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

// Next auth session hook
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { columns } from "../../components/table/columns";
import Login from "./auth/login";

const Home = () => {
  // Google auth session
  const { data: session } = useSession();

  const [tableData, setTableData] = useState<string[]>([]);

  // Not to be confused with 'setServiceOrder'
  const [searchServiceOrder, setSearchServiceOrder] = useState("");

  // Chakra ui toast
  const toast = useToast();

  // Global state for the modal
  const setManagementModalState = useSetRecoilState(managementModalState);

  // Table sorting
  const [sorting, setSorting] = useState<SortingState>([]);

  // Table filtering
  const [filtering, setFiltering] = useState("");

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
  const [ticket, setTicket] = useState("");

  useEffect(() => {
    fetchDataFromDatabase();
  }, []);

  useEffect(() => {
    getSOInfoAllFunction({
      searchServiceOrder,
      setServiceOrder,
      setCreatedDate,
      setCreatedTime,
      setModel,
      setWarranty,
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
          view: "/",
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
      // console.log("Response is", response);
    } catch (err) {
      console.log(err);
    }
  };

  // Use context from the context we created
  // destructure the context
  // const { tableInfo, setTableInfo } = useContext(TableInfoContext);
  // For the table
  const router = useRouter();

  async function fetchDataFromDatabase() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL_MANAGEMENT}/`,
      {
        cache: "default",
        next: { revalidate: 3 }, // refetch every 3 seconds
      }
    );
    const data = await response.json();
    setTableData(data);
    return data;
  }

  // Redirects user to the edit table page
  const handleUpdate = (e: React.SyntheticEvent, id: string | number) => {
    e.stopPropagation();
    router.push(`/edit/${id}`);
  };

  // Table contents
  // const memoizedData = useMemo(() => tableData, []);
  // console.log(memoizedData);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });
  // console.log(table.getRowModel().rows[0].original.id);
  if (session) {
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
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    className="bg-gray-50 font-sans border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-primary-500 block w-full pl-10 p-2"
                    placeholder="Search"
                    value={filtering}
                    onChange={(e) => setFiltering(e.target.value)}
                  />
                </div>
              </form>
              <button
                className="bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus:bg-[#075985] text-white font-semibold cursor-pointer font-sans rounded-md p-3 my-2"
                type="button"
                onClick={() =>
                  setManagementModalState({
                    open: true,
                    view: "/",
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
                    className="w-full outline-none py-2 px-2 border-2 font-sans font-semibold text-sm rounded-sm my-2"
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
                    className="w-full disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none outline-none bg-white py-2 px-2 border-2 border-slate-400 font-sans font-semibold text-sm rounded-sm my-2"
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
                    className="outline-none bg-white py-2 px-2 border-2 border-slate-400 font-sans font-semibold text-sm rounded-sm my-2"
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
                    className="outline-none bg-white py-2 px-2 border-2 border-slate-400 font-sans font-semibold text-sm rounded-sm my-2"
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
                    className="outline-none bg-white py-2 px-2 border-2 border-slate-400 font-sans font-semibold text-sm rounded-sm my-2"
                    value={engineerAnalysis}
                    onChange={(e) => setEngineerAnalysis(e.target.value)}
                    hidden
                  />
                  <label htmlFor="engineerAnalysis" className="sr-only">
                    Engineer
                  </label>
                  <select
                    name="engineer"
                    id="engineer"
                    className="mb-2 bg-white outline-none border border-gray-300 outline-0 text-gray-900 font-sans font-semibold text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    value={engineer}
                    onChange={(e) => setEngineer(e.target.value)}
                  >
                    <option value="" disabled>
                      Select engineer
                    </option>
                    <option value="Acklas Sakala">Acklas Sakala</option>
                    <option value="Manuel Kaba">Manuel Kaba</option>
                    <option value="Olivier Munguakolwa">
                      Olivier Munguakolwa
                    </option>
                    <option value="Paulas Gambu">Paulas Gambu</option>
                    <option value="Pule Mokoena">Pule Mokoena</option>
                    <option value="Sizwe Phungwayo">Sizwe Phungwayo</option>
                  </select>

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
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-auto">
                <thead className="bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus:bg-[#075985] text-white font-sans text-sm uppercase font-semibold  table-auto">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr
                      key={headerGroup.id}
                      className="font-sans font-semibold"
                    >
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          onClick={header.column.getToggleSortingHandler()}
                          className="px-4 py-3 cursor-pointer font-sans font-semibold"
                        >
                          <div>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: " 🔼",
                              desc: " 🔽",
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row: any) => (
                    <tr
                      key={row.id}
                      onDoubleClick={(e) => handleUpdate(e, row.original.id)}
                      className="border-b dark:border-gray-700"
                    >
                      {row.getVisibleCells().map((cell: any) => (
                        <td
                          key={cell.id}
                          className="px-4 py-3 font-sans font-medium text-sm"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
            <div className="pagination flex gap-1">
              <button
                onClick={() => table.setPageIndex(0)}
                type="button"
                className="border border-sky-700 rounded-sm font-sans font-semibold text-gray-900 px-2 py-1"
              >
                Page 1
              </button>
              <button
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.previousPage()}
                type="button"
                className="border border-sky-700 rounded-sm font-sans font-semibold text-gray-900 px-2 py-1"
              >
                Prev
              </button>
              <button
                disabled={!table.getCanNextPage()}
                onClick={() => table.nextPage()}
                type="button"
                className="border border-sky-700 rounded-sm font-sans font-semibold text-gray-900 px-2 py-1"
              >
                Next
              </button>
              <button
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                type="button"
                className="border border-sky-700 rounded-sm font-sans font-semibold text-gray-900 px-2 py-1"
              >
                Last
              </button>
            </div>
          </div>
        </main>
      </>
    );
  } else {
    return <Login />;
  }
};
export default Home;
