import { getBookingAgentJobs } from "@/functions/getCombinedFlatData";
import { postBookingAgentsJobs } from "@/functions/ipass_api";
import { useToast } from "@chakra-ui/react";
import moment from "moment";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { minDate } from "../../../utils/datemin";
import { bookingAgentFunc } from "../../../components/Reports";

function Reports() {
  const [searchServiceOrder, setSearchServiceOrder] = useState("");
  const [serviceOrder, setServiceOrder] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [createdTime, setCreatedTime] = useState("");
  const [warranty, setWarranty] = useState("");
  const [bookingAgent, setBookingAgent] = useState("");
  const [getBookingAgentJobsData, setGetBookingAgentJobsData] = useState<
    string[] | any[]
  >([]);

  const [bookingAgentFilter, setBookingAgentFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const [dateFrom, setDateFrom] = useState<string | number | Date | any>("");
  const [dateTo, setDateTo] = useState<string | number | Date | any>("");

  var today = new Date().toISOString().split("T")[0].toString();

  // Chakra ui toast
  const toast = useToast();

  useEffect(() => {
    postBookingAgentsJobs({
      searchServiceOrder,
      setBookingAgent,
      setCreatedDate,
      setCreatedTime,
      setWarranty,
      setServiceOrder,
    });
  }, [searchServiceOrder]);

  const postData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const postThisInfo = {
      serviceOrder,
      createdDate,
      createdTime,
      warranty,
      bookingAgent,
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_MANAGEMENT_AGENTS}/booking-agents/jobs/add`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postThisInfo),
      }
    );
    if (!response.ok) {
      toast({
        title: "Job failed.",
        description: "Job already exists.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      await response.json();
      toast({
        title: "Job added.",
        description: "You've added a job to the table.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      // window.location.reload();
      getBookingAgentJobs({ setGetBookingAgentJobsData });
      // return json;
    }
  };
  useEffect(() => {
    getBookingAgentJobs({ setGetBookingAgentJobsData });
  }, []);

  // Booking agent Shane
  // let getJobsByAgentShane =
  //   dateFrom.length > 0 && dateTo.length > 0
  //     ? getBookingAgentJobsData.filter((agent) => {
  //         let date = moment(agent.created_date).format("YYYY-MM-DD");
  //         return (
  //           date >= dateFrom &&
  //           agent.booking_agent === "shanes300123" &&
  //           date <= dateTo &&
  //           agent.booking_agent === "shanes300123"
  //         );
  //       })
  //     : [];
  // let getJobsByAgentShane;
  // bookingAgentFunc(getBookingAgentJobsData, dateFrom, dateTo, "shanes300123");
  // console.log(getJobsByAgentShane);

  // Booking agent Sherry
  // let getJobsByAgentSherry =
  //   dateFrom.length > 0 && dateTo.length > 0
  //     ? getBookingAgentJobsData.filter((agent) => {
  //         let date = moment(agent.created_date).format("YYYY-MM-DD");
  //         return (
  //           date >= dateFrom &&
  //           agent.booking_agent === "sherryl060223" &&
  //           date <= dateTo &&
  //           agent.booking_agent === "sherryl060223"
  //         );
  //       })
  //     : [];

  // console.log(getJobsByAgentSherry);

  // Booking agent Nigel
  // let getJobsByAgentNigel =
  //   dateFrom.length > 0 && dateTo.length > 0
  //     ? getBookingAgentJobsData.filter((agent) => {
  //         let date = moment(agent.created_date).format("YYYY-MM-DD");
  //         return (
  //           date >= dateFrom &&
  //           agent.booking_agent === "nigelc01" &&
  //           date <= dateTo &&
  //           agent.booking_agent === "nigelc01"
  //         );
  //       })
  //     : [];

  // Booking agent Livonna
  // let getJobsByAgentLavona =
  //   dateFrom.length > 0 && dateTo.length > 0
  //     ? getBookingAgentJobsData.filter((agent) => {
  //         let date = moment(agent.created_date).format("YYYY-MM-DD");
  //         return (
  //           date >= dateFrom &&
  //           agent.booking_agent === "lavonaj01" &&
  //           date <= dateTo &&
  //           agent.booking_agent === "lavonaj01"
  //         );
  //       })
  //     : [];

  return (
    <>
      <Head>
        <title>Booking Agents</title>
      </Head>
      <Navbar />
      <main className="space-between-navbar-and-content">
        <section className="container mx-auto p-3">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl text-center">
            Booking Agents
          </h1>
          <section className="flex flex-col justify-center gap-3 py-4">
            <div className="flex gap-3 items-center justify-between">
              <div className="flex gap-3 items-center">
                <span>
                  <label htmlFor="dateFrom" className="sr-only">
                    Date from
                  </label>
                  <input
                    type="date"
                    name="dateFrom"
                    min={minDate}
                    max={today}
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="mb-2 bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    id="dateFrom"
                  />
                </span>
                <span>-</span>
                <span>
                  <label htmlFor="dateTo" className="sr-only">
                    Date to
                  </label>
                  <input
                    type="date"
                    name="dateTo"
                    min={minDate}
                    max={today}
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="mb-2 bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    id="dateTo"
                  />
                </span>
              </div>
              <span>
                <label
                  htmlFor="searchServiceOrder"
                  className="text-center sr-only"
                >
                  Search Service Order
                </label>
                <input
                  type="text"
                  id="searchServiceOrder"
                  name="searchServiceOrder"
                  placeholder="Search service order"
                  className="w-max-lg outline-none py-2 px-2 border-2 font-sans font-semibold text-sm rounded-sm my-2 mx-auto"
                  value={searchServiceOrder}
                  onChange={(e) => setSearchServiceOrder(e.target.value)}
                  maxLength={10}
                />
              </span>
            </div>
          </section>

          {searchServiceOrder.length === 10 && (
            <div className="max-h-[540px] overflow-y-auto my-5">
              <table className="relative w-full max-w-full whitespace-nowrap text-sm text-left text-gray-500 table-auto">
                <thead className="sticky top-0 bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus:bg-[#075985] text-white font-sans text-sm uppercase font-semibold">
                  <tr className="font-sans font-semibold">
                    <th className="px-4 py-3 cursor-pointer font-sans font-semibold">
                      Service Order No
                    </th>
                    <th className="px-4 py-3 cursor-pointer font-sans font-semibold">
                      Agent
                    </th>
                    <th className="px-4 py-3 cursor-pointer font-sans font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="z-0">
                  <tr className="border-b cursor-pointer hover:bg-[#eee] hover:text-gray-900 focus:bg-[#eee] focus:text-gray-900 active:bg-[#eee] active:text-gray-900">
                    <td className="px-4 py-3 font-sans font-medium text-sm max-w-full">
                      {serviceOrder}
                    </td>
                    <td className="px-4 py-3 font-sans font-medium text-sm max-w-full">
                      {bookingAgent}
                    </td>
                    <td className="px-4 py-3 font-sans font-medium text-sm max-w-full">
                      <button
                        type="button"
                        role="button"
                        onClick={postData}
                        className="font-medium bg-[#082f49] hover:bg-[#075985] active:bg-[#075985]  text-white font-sans rounded py-1 px-2"
                      >
                        Add
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          <div className="max-h-[540px] overflow-y-auto">
            <table className="relative w-full max-w-full whitespace-nowrap text-sm text-left text-gray-500 table-auto">
              <thead className="sticky top-0 bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus:bg-[#075985] text-white font-sans text-sm uppercase font-semibold">
                <tr className="font-sans font-semibold">
                  <th className="px-4 py-3 cursor-pointer font-sans font-semibold">
                    Booking Agent
                  </th>
                  <th className="px-4 py-3 cursor-pointer font-sans font-semibold">
                    Jobs booked
                  </th>
                </tr>
              </thead>
              <tbody className="z-0">
                <tr className="border-b cursor-pointer hover:bg-[#eee] hover:text-gray-900 focus:bg-[#eee] focus:text-gray-900 active:bg-[#eee] active:text-gray-900">
                  <td className="px-4 py-3 font-sans font-medium text-sm max-w-full">
                    Shane
                  </td>
                  <td className="px-4 py-3 font-sans font-medium text-sm max-w-full">
                    {bookingAgentFunc(
                      getBookingAgentJobsData,
                      dateFrom,
                      dateTo,
                      "shanes300123"
                    )}
                  </td>
                </tr>
                <tr className="border-b cursor-pointer hover:bg-[#eee] hover:text-gray-900 focus:bg-[#eee] focus:text-gray-900 active:bg-[#eee] active:text-gray-900">
                  <td className="px-4 py-3 font-sans font-medium text-sm max-w-full">
                    Nigel
                  </td>
                  <td className="px-4 py-3 font-sans font-medium text-sm max-w-full">
                    {bookingAgentFunc(
                      getBookingAgentJobsData,
                      dateFrom,
                      dateTo,
                      "nigelc01"
                    )}
                  </td>
                </tr>
                <tr className="border-b cursor-pointer hover:bg-[#eee] hover:text-gray-900 focus:bg-[#eee] focus:text-gray-900 active:bg-[#eee] active:text-gray-900">
                  <td className="px-4 py-3 font-sans font-medium text-sm max-w-full">
                    Sherry
                  </td>
                  <td className="px-4 py-3 font-sans font-medium text-sm max-w-full">
                    {bookingAgentFunc(
                      getBookingAgentJobsData,
                      dateFrom,
                      dateTo,
                      "sherryl060223"
                    )}
                  </td>
                </tr>
                <tr className="border-b cursor-pointer hover:bg-[#eee] hover:text-gray-900 focus:bg-[#eee] focus:text-gray-900 active:bg-[#eee] active:text-gray-900">
                  <td className="px-4 py-3 font-sans font-medium text-sm max-w-full">
                    Lavona
                  </td>
                  <td className="px-4 py-3 font-sans font-medium text-sm max-w-full">
                    {bookingAgentFunc(
                      getBookingAgentJobsData,
                      dateFrom,
                      dateTo,
                      "lavonaj01"
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
}

export default Reports;
