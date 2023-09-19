import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

// Custom imports
import { managementModalState } from "@/atoms/managementModalAtom";
import { getRepair } from "@/functions/getRepairJobs";
import { getSOInfoAllFunction } from "@/functions/ipass_api";
import Container from "../../components/Container";
import ModalManagement from "../../components/Modals/modal.management";
import Navbar from "../../components/Navbar";
import ToTopButton from "../../components/ToTopButton";
import ManagementSearchForm from "../../components/table/ManagementSearchForm";
import { HomepageModalTabOneContent } from "../../components/table/homepageModalTabOneContent";
import { HomepageModalTabTwoContent } from "../../components/table/homepageModalTabTwoContent";
import { getTicketNumberOnJobAdd } from "@/functions/getRepairJobs";

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

// Management columns
import { fetchDataCombinedData } from "@/functions/getCombinedFlatData";
import { columns } from "../../components/table/homepageTableColumns";

const Home = () => {
  const [tableData, setTableData] = useState<string[]>([]);

  // Not to be confused with 'setServiceOrder'
  const [searchServiceOrder, setSearchServiceOrder] = useState("");
  // Search ticket for tab two
  const [searchTicket, setSearchTicket] = useState("");

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
  const [department, setDepartment] = useState("HHP");

  const [GSPNStatus, setGSPNStatus] = useState<string | null>("");
  // We want to get the Status Desc from the last object element of this array
  let GSPNStatusGetLastElement = GSPNStatus?.slice(-1);

  // Settings the user to also be the engineer

  let user = engineer;

  // Repairshpr states start here
  const [repairServiceOrder, setRepairServiceOrder] = useState<
    string | number | undefined
  >("");
  const [repairCreatedDate, setRepairCreatedDate] = useState<
    string | number | undefined
  >("");
  const [repairCreatedTime, setRepairCreatedTime] = useState<
    string | number | undefined
  >("");
  const [repairModel, setRepairModel] = useState<string | undefined>("");
  const [repairWarranty, setRepairWarranty] = useState<string | undefined>("");
  const [repairEngineer, setRepairEngineer] = useState<string | undefined>("");
  const [repairFault, setRepairFault] = useState<string | undefined>("");
  const [repairImei, setRepairImei] = useState<string | number | undefined>("");
  const [repairSerialNumber, setRepairSerialNumber] = useState<
    string | number | undefined
  >("");
  const [repairInHouseStatus, setRepairInHouseStatus] = useState<
    string | undefined
  >("");
  const [repairEngineerAssignDate, setRepairEngineerAssignDate] = useState<
    string | number | undefined
  >("");
  const [repairEngineerAssignTime, setRepairEngineerAssignTime] = useState<
    string | number | undefined
  >("");
  const [repairTicket, setRepairTicket] = useState<string | number | undefined>(
    ""
  );
  const [repairEngineerAnalysis, setRepairEngineerAnalysis] = useState<
    string | number | undefined
  >("");
  const [repairDepartment, setRepairDepartment] = useState("HHP");
  const [repairAPILoading, setRepairAPILoading] = useState(true);

  // For the repair API
  let repairUser = repairEngineer;
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
      setGSPNStatus,
    });
  }, [searchServiceOrder]);

  useEffect(() => {
    fetchDataCombinedData({ setTableData });
  }, []);

  useEffect(() => {
    getRepair({
      searchTicket,
      setRepairFault,
      setRepairCreatedDate,
      setRepairCreatedTime,
      setRepairEngineerAssignDate,
      setRepairEngineerAssignTime,
      setRepairImei,
      setRepairServiceOrder,
      setRepairTicket,
      setRepairEngineerAnalysis,
      setRepairDepartment,
      setRepairAPILoading,
    });
  }, [searchTicket]);

  useEffect(() => {
    getTicketNumberOnJobAdd({
      searchServiceOrder,
      setTicket,
    });
  }, [searchServiceOrder]);

  // const user = session?.user?.email;

  const postData = (e: React.SyntheticEvent) => {
    e.preventDefault();
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
      GSPNStatusGetLastElement,
    };
    // console.log(postThisInfo);
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
          // console.log(data.status);
        }
        return data.json();
      })
      .then((update) => {
        // console.log(update);
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

  // Post repair data
  const postRepairData = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const postThisInfo = {
      repairServiceOrder,
      repairCreatedDate,
      repairCreatedTime,
      repairModel,
      repairWarranty,
      repairEngineer,
      repairFault,
      repairImei,
      repairSerialNumber,
      repairInHouseStatus,
      repairEngineerAssignDate,
      repairEngineerAssignTime,
      repairEngineerAnalysis,
      repairTicket,
      repairDepartment,
      repairUser,
      GSPNStatusGetLastElement,
    };
    // console.log(postThisInfo);
    fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL_MANAGEMENT}/repair`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postThisInfo),
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
  };

  // For the table
  const router = useRouter();

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

  return (
    <>
      <Head>
        <title>HHPManagement</title>
        <meta name="robots" content="noindex"></meta>
      </Head>
      <Navbar />

      <main className="space-between-navbar-and-content">
        <Container>
          <section className="flex justify-center pt-5">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl">
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

                  <Tab fontFamily="inherit" fontWeight="500">
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
                      setInHouseStatus={(e) => setInHouseStatus(e.target.value)}
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
                    <HomepageModalTabTwoContent
                      repairAPILoading={repairAPILoading}
                      searchTicket={searchTicket}
                      setSearchTicket={(e) => setSearchTicket(e.target.value)}
                      repairFault={repairFault}
                      repairWarranty={repairWarranty}
                      setRepairWarranty={(e) =>
                        setRepairWarranty(e.target.value)
                      }
                      repairImei={repairImei}
                      setRepairImei={(e) => setRepairImei(e.target.value)}
                      repairSerialNumber={repairSerialNumber}
                      setRepairSerialNumber={(e) =>
                        setRepairSerialNumber(e.target.value)
                      }
                      repairModel={repairModel}
                      setRepairModel={(e) => setRepairModel(e.target.value)}
                      repairInHouseStatus={repairInHouseStatus}
                      setRepairInHouseStatus={(e) =>
                        setRepairInHouseStatus(e.target.value)
                      }
                      repairEngineer={repairEngineer}
                      setRepairEngineer={(e) =>
                        setRepairEngineer(e.target.value)
                      }
                      postRepairData={postRepairData}
                    />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </ModalManagement>
          </section>

          <div className="row flex items-center justify-center">
            <span className="flex mx-auto text-center font-medium font-sans py-1 text-gray-500">
              To edit, double click on the row you want to edit
            </span>
          </div>
          <div className="max-h-[540px] overflow-y-auto">
            <table className="relative w-full max-w-full whitespace-nowrap text-sm text-left text-gray-500 table-auto">
              <thead className="sticky top-0 bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus:bg-[#075985] text-white font-sans text-sm uppercase font-semibold">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="font-sans font-semibold">
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
              <tbody className="z-0">
                {table.getRowModel().rows.map((row: any) => (
                  <tr
                    key={row.id}
                    onDoubleClick={(e) => handleUpdate(e, row.original.id)}
                    className="border-b cursor-pointer hover:bg-[#eee] hover:text-gray-900 focus:bg-[#eee] focus:text-gray-900 active:bg-[#eee] active:text-gray-900"
                  >
                    <td>
                      <button
                        type="button"
                        onClick={(e) => handleUpdate(e, row.original.id)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                    </td>
                    {row.getVisibleCells().map((cell: any) => (
                      <td
                        key={cell.id}
                        className="px-4 py-3 font-sans font-medium text-sm max-w-full"
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
          </div>
          <div className="h-2" />
          <div className="pagination flex gap-1">
            <button
              className="border rounded p-1"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              {"<<"}
            </button>
            <button
              className="border rounded p-1 font-sans font-medium"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<"}
            </button>
            <button
              className="border rounded p-1 font-sans font-medium"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {">"}
            </button>
            <button
              className="border rounded p-1 font-sans font-medium"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              {">>"}
            </button>
            <span className="flex items-center gap-1">
              <div className="font-sans font-semibold text-[#0d0d0d]">Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </strong>
            </span>
            <span className="flex items-center gap-1 font-sans">
              | Go to page:
              <input
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                className="border p-1 rounded w-16"
              />
            </span>
            <select
              value={table.getState().pagination.pageSize}
              className="border border-[#eee] outline-none ring-0 font-sans font-medium cursor-pointer"
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
          <ToTopButton />
        </Container>
      </main>
    </>
  );
};
export default Home;
