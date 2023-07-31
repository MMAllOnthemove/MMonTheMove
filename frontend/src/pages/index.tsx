import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import Modal from "../../../components/Modals/Modal";
import { managementModalState } from "@/atoms/managementModalAtom";
import { useToast } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import ModalManagement from "../../components/Modals/modal.management";
import Navbar from "../../components/Navbar";
// This is the axios instance
import { getSOInfoAllFunction } from "@/functions/ipass_api";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import Login from "./auth/login";
import ManagementSearchForm from "../../components/table/ManagementSearchForm";
import { HomepageModalTabOneContent } from "../../components/table/homepageModalTabOneContent";
import Container from "../../components/Container";
// Tanstack table functionality
import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

// Next auth session hook using google auth
import { useSession } from "next-auth/react";

// Management columns
import { columns } from "../../components/table/homepageTableColumns";

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

  // GSPN
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
  const [department, setDepartment] = useState("");

  // GSPN DATA
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
  const user = session?.user?.email;
  // console.log(user);
  const postData = () => {
    const postThisInfo = {
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
      department,
      user,
    };
    const response = fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL_MANAGEMENT}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postThisInfo),
      }
    )
      .then((data: any) => {
        if (!data.ok) {
          console.log(data.status);
        }
        return data.json();
      })
      .then((update) => {
        console.log(update);
      });
    setManagementModalState({
      open: false,
      view: "/",
    });
    toast({
      title: "Job added.",
      description: "You've added a job to the table.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    window.location.reload();
    // console.log("Response is", response);
  };

  // For the table
  const router = useRouter();

  // Fetch gspn data that's now stored in our database
  async function fetchDataFromDatabase() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL_MANAGEMENT}`,
      {
        cache: "default",
        next: { revalidate: 2 }, // refetch every 3 seconds
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

  if (session) {
    return (
      <>
        <Head>
          <title>Management</title>
          <meta name="robots" content="noindex"></meta>
        </Head>
        <Navbar />

        <main>
          <Container>
            <section className="flex justify-center pt-5">
              <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                  HHP
                </span>{" "}
                Management.
              </h1>
            </section>
            <section className="flex justify-between items-center py-5">
              <ManagementSearchForm
                filtering={filtering}
                setFiltering={(e) => setFiltering(e.target.value)}
              />

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
                <Tabs defaultIndex={0} isFitted>
                  <TabList>
                    <Tab fontFamily="inherit" fontWeight="500">
                      Use service order
                    </Tab>

                    <Tab fontFamily="inherit" fontWeight="500" isDisabled>
                      Use ticket number
                    </Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel>
                      <HomepageModalTabOneContent
                        searchServiceOrder={searchServiceOrder}
                        setSearchServiceOrder={(e) =>
                          setSearchServiceOrder(e.target.value)
                        }
                        warranty={warranty}
                        inHouseStatus={inHouseStatus}
                        setInHouseStatus={(e) =>
                          setInHouseStatus(e.target.value)
                        }
                        ticket={ticket}
                        setTicket={(e) => setTicket(e.target.value)}
                        engineerAnalysis={engineerAnalysis}
                        setEngineerAnalysis={(e) =>
                          setEngineerAnalysis(e.target.value)
                        }
                        engineer={engineer}
                        setEngineer={(e) => setEngineer(e.target.value)}
                        department={department}
                        setDepartment={(e) => setDepartment(e.target.value)}
                        postData={postData}
                      />
                    </TabPanel>
                    <TabPanel>
                      <p>Please do not use this.</p>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
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
            <div className="flex flex-row items-center gap-2 my-3">
              <span className="flex gap-1">
                <p className="font-sans font-semibold text-sky-700">
                  {table.getRowModel().rows.length}
                </p>{" "}
                Rows
              </span>
              <span className="flex items-center gap-1">
                <div className="font-sans">Page</div>
                <strong className="font-sans text-sky-700">
                  {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount()}
                </strong>
              </span>
              <select
                className="border outline-none cursor-pointer font-semibold font-sans"
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>
          </Container>
        </main>
      </>
    );
  }
};
export default Home;
