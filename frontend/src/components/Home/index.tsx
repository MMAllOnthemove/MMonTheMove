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
import TableBody from "@/components/Table/TableBody";
import columns from "@/components/Table/homepageTableColumns";
import { getRepair } from "@/functions/getRepairJobs";
import { getSOInfoAllFunction } from "@/functions/ipass_api";
import { fetchCurrentUser, fetchRepairshoprTicket, fetchTableData } from "@/hooks/useFetch";
import axios from "axios";
import React from "react";
import NotLoggedIn from "../NotLoggedIn";
import PageTitle from "../PageTitle";
import Tabs from "../Tabs";
import TabPane from "../Tabs/TabPane";
import moment from "moment";

// Dynamic imports
const ManagementSearchForm = dynamic(
  () => import("@/components/Table/managementSearchForm")
);
const Container = dynamic(() => import("@/components/Container"));
const Navbar = dynamic(() => import("@/components/Navbar"));
const ToTopButton = dynamic(() => import("@/components/ToTopButton"));
const Button = dynamic(() => import("@/components/Buttons"));
const HomepageModalTabOneContent = dynamic(
  () => import("@/components/Table/homepageModalTabOneContent")
);
const HomepageModalTabTwoContent = dynamic(
  () => import("@/components/Table/homepageModalTabTwoContent")
);
const Pagination = dynamic(() => import("@/components/Table/Pagination"));
const HHPAddTaskModal = dynamic(
  () => import("../PopupModal/hhp-add-task-modal")
);

function HomeComponent() {
  const router = useRouter();
  const { hhpData } = fetchTableData();
  const { userData } = fetchCurrentUser();
  // Not to be confused with 'setServiceOrder'
  const [searchServiceOrder, setSearchServiceOrder] = useState("");

  // Search ticket for tab two
  const [searchTicket, setSearchTicket] = useState("");

  const [isHHPAddTaskModalVisible, setIsHHPAddTaskModalVisible] =
    useState(false);

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
  const [inHouseStatus, setInHouseStatus] = useState("");
  const [ticket, setTicket] = useState("");
  const [department, setDepartment] = useState("HHP");
  const [GSPNStatus, setGSPNStatus] = useState<string | null>("");
  // We want to get the Status Desc from the last object element of this array


  // Setting the user to email user is logged in with
  let user = userData?.email;

  // Repairshpr states start here
  const [repairServiceOrder, setRepairServiceOrder] = useState<
    string | number | undefined
  >("");
  const [repairCreatedDate, setRepairCreatedDate] = useState<
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
  const [repairTicket, setRepairTicket] = useState<string | number | undefined>(
    ""
  );
  const [repairId, setRepairId] = useState<string | number | undefined>(
    ""
  );
  const [repairEngineerAnalysis, setRepairEngineerAnalysis] = useState<
    string | number | undefined
  >("");
  const [repairDepartment, setRepairDepartment] = useState("HHP");

  const [assetId, setAssetId] = useState<string | number | any>([])

  // For the repair API
  // Setting the user to email user is logged in with
  let repairUser = userData?.email;

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
      setGSPNStatus,
    });
  }, [searchServiceOrder]);


  // Fetch ticket info
  useEffect(() => {
    const fetchRSData = async () => {
      const { data } = await axios.get(`https://allelectronics.repairshopr.com/api/v1/tickets?query=${searchTicket}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
        },
      });
      if (data?.tickets[0]?.number == searchTicket) {
        // console.log("data by query", data)
        setRepairServiceOrder(data?.tickets[0]["properties"]["Service Order No."])
        setRepairTicket(data?.tickets[0]?.number)
        setRepairId(data?.tickets[0]?.id)
        setRepairCreatedDate(moment(
          new Date(`${data?.tickets[0]?.created_at}`),
          moment.ISO_8601
        ).format("YYYYMMDD"))
        setRepairFault(data?.tickets[0]?.subject)
      }
    };
    fetchRSData();
  }, [searchTicket]);

  useEffect(() => {
    const fetchRSByIdData = async () => {
      const { data } = await axios.get(`https://allelectronics.repairshopr.com/api/v1/tickets/${repairId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
        },
      });

      if (data?.ticket?.id == repairId) {
        setAssetId(data?.ticket?.asset_ids[0])
      }

    };
    fetchRSByIdData();
  }, [searchTicket, repairId]);


  useEffect(() => {
    const fetchRSByAssetData = async () => {
      const { data } = await axios.get(`https://allelectronics.repairshopr.com/api/v1/customer_assets/${assetId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
        },
      });

      if (data?.asset?.id == assetId) {
        setRepairImei(data?.asset?.properties["IMEI No."])
        setRepairModel(data?.asset?.properties["Model No.:"])
        setRepairSerialNumber(data?.asset?.asset_serial)

      }

    };
    fetchRSByAssetData();
  }, [searchTicket, assetId]);

  // const user = session?.user?.email;

  let dateAdded = new Date();

  // This posts from the GSPN data

  const postData = async (e: React.SyntheticEvent) => {
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
      engineerAnalysis,
      ticket,
      department,
      user,
      GSPNStatus,
      dateAdded,
    };
    // console.log(postThisInfo)
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/hhp/jobs`, postThisInfo)
      console.log('response client hhp add', response)
      setIsHHPAddTaskModalVisible(false);
      toast.success(`${response.data}`);
    } catch (error: any) {
      console.log("frontend hhp add job error", error?.response?.data)
      toast.error(`${error?.response?.data}`);
    }





    // // This part will deposit the same data into our history table
    // For some reason it's not reading this function initially, only when user updates job
    const response2 = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/hhp/jobs/history`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postThisInfo),
      }
    )
      .then((res) => res.json())
      .then((data) => { });
  };

  // Post repair data
  const postRepairData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const postThisInfo = {
      repairServiceOrder,
      repairCreatedDate,
      repairModel,
      repairWarranty,
      repairEngineer,
      repairFault,
      repairImei,
      repairSerialNumber,
      repairInHouseStatus,
      repairEngineerAnalysis,
      repairTicket,
      repairId,
      repairDepartment,
      repairUser,
      GSPNStatus,
      dateAdded,
    };

    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/hhp/jobs/repair`, postThisInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      toast.success(`${data}`);
      setIsHHPAddTaskModalVisible(false);
    } catch (error) {
      console.log("RS ADD tasks error", error)
      // console.log("frontend hhp add job error", error?.response?.data)
      // toast.error(`${error?.response?.data}`);
    }



    // This part will deposit the same data into our history table
    const response2 = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/hhp/jobs/repair/history`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postThisInfo),
      }
    )
      .then((res) => res.json())
      .then((data) => { });
  };

  // Redirects user to the edit table page
  const handleUpdate = (e: React.SyntheticEvent, id: string | number) => {
    e.stopPropagation();
    router.push(`/department/hhp/edit/${id}`);
  };

  const table = useReactTable({
    data: hhpData,
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
        <title>HHP Management</title>
        <meta name="robots" content="noindex"></meta>
      </Head>
      <Navbar />
      <main className="space-between-navbar-and-content">
        <Container>
          <PageTitle title="Management" hasSpan={true} spanText={"HHP"} />
          {!userData ? (
            <NotLoggedIn />
          ) : (
            <>
              <section className="flex justify-between items-center py-5">
                <ManagementSearchForm
                  filtering={filtering}
                  setFiltering={(e) => setFiltering(e.target.value)}
                />

                <Button
                  type="button"
                  text="Add job"
                  className="bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus:bg-[#075985] text-white font-semibold cursor-pointer dark:text-[#eee] rounded-md p-3 my-2"
                  onClick={() => setIsHHPAddTaskModalVisible(true)}
                />
                <HHPAddTaskModal
                  isVisible={isHHPAddTaskModalVisible}
                  title="Add HHP task"
                  content={
                    <Tabs>
                      <TabPane title="Use service order">
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
                      </TabPane>
                      <TabPane title="Use ticket number">
                        <HomepageModalTabTwoContent
                          searchTicket={searchTicket}
                          setSearchTicket={(e) =>
                            setSearchTicket(e.target.value)
                          }
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
                      </TabPane>
                    </Tabs>
                  }
                  onClose={() => setIsHHPAddTaskModalVisible(false)}
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
                        <td className="px-4 py-3 font-medium text-sm max-w-full">
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

export default HomeComponent;
