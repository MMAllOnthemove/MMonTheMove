// External imports
import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// Custom imports
import { columns } from "@/components/DTV/table-columns";
import TableBody from "@/components/Table/TableBody";
import ManagementSearchForm from "@/components/Table/managementSearchForm";
import useDebounce from "@/components/useDebounce";
import {
  getPartsInfoForServiceOrder,
  getSOInfoAllFunctionDtv,
} from "@/functions/ipass_api";
import useFetchRepairJobs from "@/hooks/useFetchRepairJobs";

import PageTitle from "@/components/PageTitle";
import DTVAddTaskModal from "@/components/PopupModal/dtv-add-task-modal";
import { fetchCurrentUser, fetchDTVTableData } from "@/hooks/useFetch";
import React from "react";
import NotLoggedIn from "@/components/NotLoggedIn";

// Dynamic imports
const Pagination = dynamic(() => import("@/components/Table/Pagination"));
const Container = dynamic(() => import("@/components/Container"), {
  loading: () => <p>Loading wrapper...</p>,
});
const Navbar = dynamic(() => import("@/components/Navbar"));
const ToTopButton = dynamic(() => import("@/components/ToTopButton"));
const Button = dynamic(() => import("@/components/Buttons"));
const DtvModalAddTaskContent = dynamic(
  () => import("@/components/DTV/DtvModalTabOneContent")
);

function DTVHome() {
  const { userData } = fetchCurrentUser();
  const { dtvData } = fetchDTVTableData();
  const router = useRouter();
  // Table sorting
  const [sorting, setSorting] = useState<SortingState>([]);

  // Table filtering
  const [filtering, setFiltering] = useState("");

  const [searchServiceOrder, setSearchServiceOrder] = useState("");
  const [ticket, setTicket] = useState("");
  const [ticketNumberId, setTicketNumberId] = useState<string | number | any>(
    ""
  );
  const jobStatus = true; // when adding a job it's automatically true
  const [engineerPhoneNumber, setEngineerPhoneNumber] = useState("");

  // GSPN
  const [acknowledgeDate, setAcknowledgeDate] = useState("");
  const [acknowledgeTime, setAcknowledgeTime] = useState("");
  const [engineerAssignDate, setEngineerAssignDate] = useState("");
  const [engineerAssignTime, setEngineerAssignTime] = useState("");
  const [engineer, setEngineer] = useState("");
  const [model, setModel] = useState("");
  const [remark, setRemark] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [serviceOrder, setServiceOrder] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [createdTime, setCreatedTime] = useState("");
  const [warranty, setWarranty] = useState("");
  const [warrantyRepairType, setWarrantyRepairType] = useState("");
  const [fault, setFault] = useState("");
  const [IMEI, setImei] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerFirstName, setCustomerFirstName] = useState("");
  const [customerLastName, setCustomerLastName] = useState("");
  const [customerStreetAddress, setCustomerStreetAddress] = useState("");
  const [customerStreetAddressTwo, setCustomerStreetAddressTwo] = useState("");
  const [customerCity, setCustomerCity] = useState("");
  const [customerCountry, setCustomerCountry] = useState("");
  const [customerProvince, setCustomerProvince] = useState("");
  const [customerDistrict, setCustomerDistrict] = useState("");
  const [customerHomePhone, setCustomerHomePhone] = useState("");
  const [customerMobilePhone, setCustomerMobilePhone] = useState("");

  const debouncedTicketSearch = useDebounce(ticket, 500);
  // TODO: remove this - e.g ticket (99104)
  const [repairData] = useFetchRepairJobs(
    `https://allelectronics.repairshopr.com/api/v1/tickets?number=${ticket}`
  );

  useEffect(() => {
    if (repairData !== "") {
      setTicketNumberId("");
    } else if (repairData?.length > 0) {
      setTicketNumberId(repairData?.tickets[0]?.id);
    }
  }, [repairData]);

  // Parts given to job
  const [partsAssignedForJob, setPartsAssignedForJob] = useState<
    string | any
  >();

  useEffect(() => {
    getSOInfoAllFunctionDtv({
      searchServiceOrder,
      setAcknowledgeDate,
      setAcknowledgeTime,
      setEngineerAssignDate,
      setEngineerAssignTime,
      setEngineer,
      setModel,
      setRemark,
      setSerialNumber,
      setServiceOrder,
      setCreatedDate,
      setCreatedTime,
      setWarranty,
      setWarrantyRepairType,
      setFault,
      setImei,
      setCustomerEmail,
      setCustomerFirstName,
      setCustomerLastName,
      setCustomerStreetAddress,
      setCustomerStreetAddressTwo,
      setCustomerCity,
      setCustomerCountry,
      setCustomerProvince,
      setCustomerDistrict,
      setCustomerHomePhone,
      setCustomerMobilePhone,
    });
    getPartsInfoForServiceOrder({
      searchServiceOrder,
      setPartsAssignedForJob,
    });
  }, [searchServiceOrder]);

  async function postData(e: React.SyntheticEvent) {
    e.preventDefault();
    const dateAdded = new Date();
    const infoToPost = {
      ticket,
      ticketNumberId,
      acknowledgeDate,
      acknowledgeTime,
      engineerAssignDate,
      engineerAssignTime,
      engineer,
      model,
      remark,
      serialNumber,
      serviceOrder,
      createdDate,
      createdTime,
      warranty,
      warrantyRepairType,
      fault,
      IMEI,
      customerEmail,
      customerFirstName,
      customerLastName,
      customerStreetAddress,
      customerStreetAddressTwo,
      customerCity,
      customerCountry,
      customerProvince,
      customerDistrict,
      customerHomePhone,
      customerMobilePhone,
      partsAssignedForJob,
      dateAdded,
      jobStatus,
      engineerPhoneNumber,
      userData,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(infoToPost),
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_DTV}task/create`,
      requestOptions
    );
    if (!response.ok) {
      setIsDTVAddTaskModalVisible(false);
      toast.error("Task failed, try again");
    } else {
      setIsDTVAddTaskModalVisible(false);
      await response.json();
      // fetchTableData();
    }
  }
  // Table contents

  const table = useReactTable({
    data: dtvData,
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

  // Redirects user to the edit table page
  const handleUpdate = (e: React.SyntheticEvent, id: string | number) => {
    e.stopPropagation();
    router.push(`/department/dtv/edit/${id}`);
  };

  const [isDTVAddTaskModalVisible, setIsDTVAddTaskModalVisible] =
    useState(false);
  return (
    <>
      <Head>
        <title>DTV Management</title>
        <meta name="robots" content="noindex"></meta>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="space-between-navbar-and-content">
        <Container>
          <PageTitle title="Management" hasSpan={true} spanText={"DTV"} />
          {!userData ? (
            <NotLoggedIn />
          ) : (
            <>
              <section className="flex justify-between items-center py-5">
                <ManagementSearchForm
                  filtering={filtering}
                  setFiltering={(e) => setFiltering(e.target.value)}
                />
                <button
                  className="bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus:bg-[#075985] text-white font-semibold cursor-pointer rounded-md p-3 my-2 dark:text-[#eee]"
                  type="button"
                  role="button"
                  onClick={() => setIsDTVAddTaskModalVisible(true)}
                >
                  Add job
                </button>
                {/* Called the modal here and added a post data prop that posts data on click */}
                <DTVAddTaskModal
                  isVisible={isDTVAddTaskModalVisible}
                  title="Add DTV task"
                  content={
                    <DtvModalAddTaskContent
                      searchServiceOrder={searchServiceOrder}
                      setSearchServiceOrder={(e) =>
                        setSearchServiceOrder(e.target.value)
                      }
                      warranty={warranty}
                      ticket={ticket}
                      setTicket={(e) => setTicket(e.target.value)}
                      engineer={engineer}
                      postData={postData}
                    />
                  }
                  onClose={() => setIsDTVAddTaskModalVisible(false)}
                />
              </section>
              <div className="max-h-[540px] overflow-y-auto">
                <table className="relative w-full max-w-full whitespace-nowrap text-sm text-left text-gray-500 table-auto">
                  <thead className="sticky top-0 bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus:bg-[#075985] text-white dark:text-[#eee] text-sm uppercase font-semibold">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id} className=" font-semibold">
                        <th className="px-4 py-3 cursor-pointer  font-semibold">
                          Action
                        </th>

                        {headerGroup.headers.map((header) => {
                          return (
                            <th
                              key={header.id}
                              className="px-4 py-3 cursor-pointer  font-semibold"
                            >
                              {header.isPlaceholder ? null : (
                                <div
                                  {...{
                                    className: header.column.getCanSort()
                                      ? "cursor-pointer select-none"
                                      : "",
                                    onClick:
                                      header.column.getToggleSortingHandler(),
                                  }}
                                >
                                  {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                                  {{
                                    asc: " ▽",
                                    desc: " △",
                                  }[header.column.getIsSorted() as string] ??
                                    null}
                                </div>
                              )}
                            </th>
                          );
                        })}
                      </tr>
                    ))}
                  </thead>

                  <TableBody>
                    {table.getRowModel().rows.map((row: any) => (
                      <tr
                        key={row.id}
                        onDoubleClick={(e) => handleUpdate(e, row.original.id)}
                        className="border-b cursor-pointer dark:bg-[#22303c] hover:bg-[#eee] hover:text-gray-900 focus:bg-[#eee] focus:text-gray-900 active:bg-[#eee] active:text-gray-900  dark:hover:bg-[#eee] dark:text-[#eee] dark:hover:text-[#22303c]"
                      >
                        <td className="px-4 py-3  font-medium text-sm max-w-full">
                          <button
                            type="button"
                            role="button"
                            onClick={(e) => handleUpdate(e, row.original.id)}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </button>
                        </td>

                        {row.getVisibleCells().map((cell: any) => (
                          <td
                            key={cell.id}
                            className="px-4 py-3  font-medium text-sm max-w-full"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </TableBody>
                </table>
              </div>
              <div className="h-2" />
              <Pagination table={table} />
              <ToTopButton />
            </>
          )}
        </Container>
      </main>
    </>
  );
}

export default DTVHome;
