// External imports
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

// External imports
import PageTitle from "@/components/PageTitle";
import PartsModalTabOneContent from "@/components/PartsTable/PartsModalTableContent";
import { columns } from "@/components/PartsTable/PartsTableColumns";
import PartsAddTaskModal from "@/components/PopupModal/parts-add-task-modal";
import Pagination from "@/components/Table/Pagination";
import { getSOInfoAllFunctionForParts } from "@/functions/ipass_api";
import { fetchCurrentUser, } from "@/hooks/useFetch";
import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

// Dynamic imports
const Button = dynamic(() => import("@/components/Buttons"));
const Container = dynamic(() => import("@/components/Container"));
const ToTopButton = dynamic(() => import("@/components/ToTopButton"));
const Navbar = dynamic(() => import("@/components/Navbar"));
const ManagementSearchForm = dynamic(
  () => import("@/components/Table/managementSearchForm")
);
const NotLoggedIn = dynamic(() => import("@/components/NotLoggedIn"));

function Parts() {
  const { userData } = fetchCurrentUser();
  let dispatchBy = userData;
  // Not to be confused with 'setServiceOrder'
  const [searchServiceOrder, setSearchServiceOrder] = useState("");
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
  const [dispatchAnalysis, setDispatchAnalysis] = useState("");
  const [inHouseStatus, setInHouseStatus] = useState("");
  const [ticket, setTicket] = useState("");
  const [department, setDepartment] = useState("");

  const [isPartsAddJobVisible, setIsPartsAddJobVisible] = useState(false);

  const [partsChecked, setPartsChecked] = useState("");
  const [reasonForIncompleteParts, setReasonForIncompleteParts] = useState("");
  // Add and remove fields via button
  const [partsList, setPartsList] = useState<string[] | any[]>([
    { partNumber: "", sealNumber: "" },
  ]);
  // This is the parts list arr mapped from the partslist
  let partsArr = [...partsList].map((x) => {
    // x.partNumber.toUpperCase() + " " + x.sealNumber
    if (x.sealNumber === "") {
      return x.partNumber.toUpperCase();
    } else {
      return x.partNumber.toUpperCase() + " - " + x.sealNumber;
    }
  });
  // For the table
  const router = useRouter();

  // Redirects user to the edit table page
  const handleUpdate = (e: React.SyntheticEvent, id: string | number) => {
    e.stopPropagation();
    router.push(`/department/parts/edit/${id}`);
  };

  const table = useReactTable({
    data: partsDepartmentData,
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

  useEffect(() => {
    getSOInfoAllFunctionForParts({
      searchServiceOrder,
      setServiceOrder,
      setModel,
      setWarranty,
      setFault,
      setImei,
      setSerialNumber,
    });
  }, [searchServiceOrder]);

  const handleServiceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: string | number | any
  ) => {
    const { name, value } = e.target;
    const list = [...partsList];
    list[index][name] = value;
    setPartsList(list);
  };

  const handleServiceRemove = (index: string | number | any) => {
    const list = [...partsList];
    list.splice(index, 1);
    setPartsList(list);
  };

  const handleServiceAdd = () => {
    setPartsList([...partsList, { partNumber: "", sealNumber: "" }]);
  };

  let dateAdded = new Date(); // this will ensure we post using our exact timezone instead of the one from the db
  const postData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const postThisInfo = {
      service_order,
      warranty,
      model,
      imei,
      fault,
      serial_number,
      engineer,
      dispatchAnalysis,
      inHouseStatus,
      ticket,
      department,
      dispatchBy,
      partsArr,
      dateAdded,
      partsChecked,
      reasonForIncompleteParts,
    };
    const response1 = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL_MANAGEMENT}/parts/post`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postThisInfo),
      }
    );
    if (!response1.ok) {
      setIsPartsAddJobVisible(false);
      toast.error("Please try again");
    } else {
      setIsPartsAddJobVisible(false);
      await response1.json();
      toast.success("Successfully created!");

      // window.location.reload();
    }

    const response2 = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL_MANAGEMENT}/parts/history/post`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postThisInfo),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        //
      });
  };

  return (
    <>
      <Head>
        <title>Parts Management</title>
        <meta name="robots" content="noindex"></meta>
      </Head>
      <Navbar />

      <main className="space-between-navbar-and-content">
        <Container>
          <PageTitle hasSpan={true} spanText="Parts" title="Management" />
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
                  onClick={() => setIsPartsAddJobVisible(true)}
                >
                  Add job
                </button>
                {/* Modal */}
                <PartsAddTaskModal
                  isVisible={isPartsAddJobVisible}
                  title="Add Parts task"
                  content={
                    <PartsModalTabOneContent
                      searchServiceOrder={searchServiceOrder}
                      setSearchServiceOrder={(e) =>
                        setSearchServiceOrder(e.target.value)
                      }
                      warranty={warranty}
                      inHouseStatus={inHouseStatus}
                      setInHouseStatus={(e) => setInHouseStatus(e.target.value)}
                      ticket={ticket}
                      setTicket={(e) => setTicket(e.target.value)}
                      dispatchAnalysis={dispatchAnalysis}
                      setDispatchAnalysis={(e) =>
                        setDispatchAnalysis(e.target.value)
                      }
                      engineer={engineer}
                      setEngineer={(e) => setEngineer(e.target.value)}
                      department={department}
                      setDepartment={(e) => setDepartment(e.target.value)}
                      postData={postData}
                    >
                      <span>
                        <label
                          htmlFor="partNumber"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-[#eee]"
                        >
                          Parts you are issuing.{" "}
                          <small className="dark:text-[#eee]">Max = 10</small>
                          <br />
                          <small className="dark:text-[#eee]">
                            e.g. LED - GHS7-0000..
                          </small>
                        </label>
                        {partsList.map((singleService, index) => (
                          <div key={index} className="services">
                            <div className="first-division flex items-center gap-4">
                              <input
                                className=" dark:bg-[#22303C] dark:text-[#eee] my-2 border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 p-2.5"
                                name="partNumber"
                                type="text"
                                id="partNumber"
                                placeholder="Part no."
                                defaultValue={singleService?.partNumber}
                                onChange={(e) => handleServiceChange(e, index)}
                                size={12}
                                maxLength={12}
                                aria-required
                                required
                              />
                              <input
                                className="dark:bg-[#22303C] dark:text-[#eee] my-2 border  border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500  p-2.5"
                                name="sealNumber"
                                type="text"
                                id="sealNumber"
                                placeholder="Seal no."
                                defaultValue={singleService?.sealNumber}
                                onChange={(e) => handleServiceChange(e, index)}
                                size={12}
                                maxLength={12}
                              />
                              {partsList.length - 1 === index &&
                                partsList.length < 10 && (
                                  <Button
                                    className="my-2 bg-[#082f49]  font-semibold text-[#eee] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-sm text-sm p-2.5 text-center"
                                    type="button"
                                    onClick={handleServiceAdd}
                                    text="+"
                                  />
                                  // <button
                                  //   className="my-2 bg-[#082f49]   font-semibold text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-sm text-sm p-2.5 text-center"
                                  //   type="button"
                                  //   onClick={handleServiceAdd}
                                  // >
                                  //   Add a part
                                  // </button>
                                )}
                            </div>
                            <div className="second-division">
                              {partsList.length !== 1 && (
                                <Button
                                  type="button"
                                  onClick={() => handleServiceRemove(index)}
                                  className="bg-red-500  font-semibold text-white hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-sm text-sm px-5 py-2.5 text-center remove-btn"
                                  text="Remove"
                                />
                              )}
                            </div>
                          </div>
                        ))}
                      </span>
                      <p className=" font-semibold my-2 dark:text-[#eee] dark:font-normal">
                        <small> Parts being handed out complete?</small>
                      </p>
                      <span className="flex items-center gap-3">
                        <span className="flex items-center">
                          <input
                            type="radio"
                            id="partsCheckedYes"
                            name="partsChecked"
                            value={"Yes"}
                            className="mr-2 cursor-pointer accent-sky-700"
                            checked={partsChecked === "Yes"}
                            onChange={(e) => setPartsChecked(e.target.value)}
                            aria-required
                            required
                          />
                          <label
                            htmlFor="partsCheckedYes"
                            className="cursor-pointer text-sm font-medium  text-gray-900 dark:text-[#eee]"
                          >
                            Yes
                          </label>
                        </span>
                        <span className="flex items-center">
                          <input
                            type="radio"
                            id="partsCheckedNo"
                            name="partsChecked"
                            value={"No"}
                            className="mr-2 cursor-pointer accent-sky-700 dark:accent-[#22303C]"
                            checked={partsChecked === "No"}
                            onChange={(e) => setPartsChecked(e.target.value)}
                          />
                          <label
                            htmlFor="partsCheckedNo"
                            className="cursor-pointer text-sm font-medium text-gray-900 dark:text-[#eee]"
                          >
                            No
                          </label>
                        </span>
                      </span>
                      {partsChecked === "No" ? (
                        <span>
                          <label
                            htmlFor="reasonForIncompleteParts"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-[#eee]"
                          >
                            Reason for incomplete parts
                          </label>
                          <textarea
                            name="reasonForIncompleteParts"
                            id="reasonForIncompleteParts"
                            className="mb-2 bg-white border resize-none border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full outline-0 p-2.5 "
                            value={reasonForIncompleteParts}
                            onChange={(event) =>
                              setReasonForIncompleteParts(event.target.value)
                            }
                          ></textarea>
                        </span>
                      ) : (
                        ""
                      )}
                    </PartsModalTabOneContent>
                  }
                  onClose={() => setIsPartsAddJobVisible(false)}
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
                  <tbody className="z-0">
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
                  </tbody>
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

export default Parts;
