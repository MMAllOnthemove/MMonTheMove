import { useToast } from "@chakra-ui/react";

import { partsModalState } from "@/atoms/partsModalAtom";
import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import ManagementSearchForm from "@/components/Table/managementSearchForm";
import Head from "next/head";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import ToTopButton from "@/components/ToTopButton";
import { columns } from "@/components/PartsTable/PartsTableColumns";
import ModalManagement from "@/components/Modals/parts.modal";
import { PartsModalTabOneContent } from "@/components/PartsTable/PartsModalTableContent";
import { getSOInfoAllFunctionForParts } from "@/functions/ipass_api";
import Button from "@/components/Buttons";
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
import { useRouter } from "next/router";

function Parts() {
  const [tableData, setTableData] = useState<any[]>([]);

  // Not to be confused with 'setServiceOrder'
  const [searchServiceOrder, setSearchServiceOrder] = useState("");

  // Chakra ui toast
  const toast = useToast();

  // Global state for the modal

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
  const [dispatchBy, setDispatch] = useState("");

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
    router.push(`/parts/edit/${id}`);
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
  const fetchTableData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_URL_MANAGEMENT}/parts/get`
      );
      const data = await response.json();
      setTableData(data);
    } catch (error) {
      // console.log("Error", error);
    }
  };
  useEffect(() => {
    fetchTableData();
  }, [tableData]);

  const setPartsManagementModalState = useSetRecoilState(partsModalState);

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

  const urls = ["", ""];
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
    // console.log(postThisInfo);
    const response1 = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL_MANAGEMENT}/parts/post`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postThisInfo),
      }
    );
    if (
      searchServiceOrder.length < 10 ||
      searchServiceOrder.length < 0 ||
      searchServiceOrder.length === 0
    ) {
      setPartsManagementModalState({
        open: false,
        view: "/parts",
      });
      toast({
        title: "Job failed.",
        description: "Not enough characters.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else if (!response1.ok) {
      setPartsManagementModalState({
        open: false,
        view: "/parts",
      });
      toast({
        title: "Job failed.",
        description: "Job already exists.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      setPartsManagementModalState({
        open: false,
        view: "/parts",
      });
      await response1.json();
      toast({
        title: "Job added.",
        description: "You've added a job to the table.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      // window.location.reload();

      fetchTableData();
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
      .then((data) => console.log("data2", data));
  };

  return (
    <>
      <Head>
        <title>Parts Management</title>
        <meta name="robots" content="noindex"></meta>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="space-between-navbar-and-content">
        <Container>
          <section className="flex justify-center pt-5">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                Parts
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
              role="button"
              onClick={() =>
                setPartsManagementModalState({
                  open: true,
                  view: "/parts",
                })
              }
            >
              Add job
            </button>

            {/* Called the modal here and added a post data prop that posts data on click */}
            <ModalManagement>
              <PartsModalTabOneContent
                searchServiceOrder={searchServiceOrder}
                setSearchServiceOrder={(e) =>
                  setSearchServiceOrder(e.target.value)
                }
                warranty={warranty}
                inHouseStatus={inHouseStatus}
                dispatchBy={dispatchBy}
                setDispatch={(e) => setDispatch(e.target.value)}
                setInHouseStatus={(e) => setInHouseStatus(e.target.value)}
                ticket={ticket}
                setTicket={(e) => setTicket(e.target.value)}
                dispatchAnalysis={dispatchAnalysis}
                setDispatchAnalysis={(e) => setDispatchAnalysis(e.target.value)}
                engineer={engineer}
                setEngineer={(e) => setEngineer(e.target.value)}
                department={department}
                setDepartment={(e) => setDepartment(e.target.value)}
                postData={postData}
              >
                <span>
                  <label
                    htmlFor="partNumber"
                    className="block mb-2 text-sm font-medium font-sans text-gray-900 "
                  >
                    Parts you are issuing. <small>Max = 10</small>
                    <br />
                    <small>e.g. LED - GHS7-0000..</small>
                  </label>
                  {partsList.map((singleService, index) => (
                    <div key={index} className="services">
                      <div className="first-division flex items-center gap-4">
                        <input
                          className="my-2 border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 p-2.5"
                          name="partNumber"
                          type="text"
                          id="partNumber"
                          placeholder="Part no."
                          defaultValue={singleService?.partNumber}
                          onChange={(e) => handleServiceChange(e, index)}
                          size={10}
                          maxLength={10}
                          minLength={7}
                          aria-required
                          required
                        />
                        <input
                          className="my-2 border  border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500  p-2.5"
                          name="sealNumber"
                          type="text"
                          id="sealNumber"
                          placeholder="Seal no."
                          defaultValue={singleService?.sealNumber}
                          onChange={(e) => handleServiceChange(e, index)}
                          size={10}
                          maxLength={10}
                          minLength={7}
                        />
                        {partsList.length - 1 === index &&
                          partsList.length < 10 && (
                            <Button
                              className="my-2 bg-[#082f49]  font-sans font-semibold text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-sm text-sm p-2.5 text-center"
                              type="button"
                              onClick={handleServiceAdd}
                              text="Add part"
                            />
                            // <button
                            //   className="my-2 bg-[#082f49]  font-sans font-semibold text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-sm text-sm p-2.5 text-center"
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
                            className="bg-red-500 font-sans font-semibold text-white hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-sm text-sm px-5 py-2.5 text-center remove-btn"
                            text="Remove"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </span>
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
                      className="cursor-pointer text-sm font-medium font-sans text-gray-900"
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
                      className="mr-2 cursor-pointer accent-sky-700"
                      checked={partsChecked === "No"}
                      onChange={(e) => setPartsChecked(e.target.value)}
                    />
                    <label
                      htmlFor="partsCheckedNo"
                      className="cursor-pointer text-sm font-medium font-sans text-gray-900"
                    >
                      No
                    </label>
                  </span>
                </span>
                {partsChecked === "No" ? (
                  <span>
                    <label
                      htmlFor="reasonForIncompleteParts"
                      className="block mb-2 text-sm font-medium font-sans text-gray-900"
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
                    <th className="px-4 py-3 cursor-pointer font-sans font-semibold">
                      Action
                    </th>
                    {headerGroup.headers.map((header) => {
                      return (
                        <th
                          key={header.id}
                          className="px-4 py-3 cursor-pointer font-sans font-semibold"
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
                              }[header.column.getIsSorted() as string] ?? null}
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
                    className="border-b cursor-pointer hover:bg-[#eee] hover:text-gray-900 focus:bg-[#eee] focus:text-gray-900 active:bg-[#eee] active:text-gray-900"
                  >
                    <td className="px-4 py-3 font-sans font-medium text-sm max-w-full">
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
          <div className="pagination flex gap-1 p-2">
            <button
              role="button"
              className="border rounded p-1 font-sans font-medium page-index-button hidden md:visible"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              {"<<"}
            </button>
            <button
              role="button"
              className="border rounded p-1 font-sans font-medium"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<"}
            </button>
            <button
              role="button"
              className="border rounded p-1 font-sans font-medium"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {">"}
            </button>
            <button
              role="button"
              className="border rounded p-1 font-sans font-medium page-index-button hidden md:visible"
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
              <label htmlFor="search-page-number" className="sr-only">
                {" "}
                Go to page:
              </label>
              <input
                id="search-page-number"
                name="search-page-number"
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                className="border p-1 rounded w-16"
              />
            </span>
            <label htmlFor="showPageSize" className="sr-only">
              Show Page Size
            </label>
            <select
              id="showPageSize"
              name="showPageSize"
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
}

export default Parts;
