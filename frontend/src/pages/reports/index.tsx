import { bookingAgentFunc, bookingAgentFuncTotal } from "@/components/Reports";
import { getBookingAgentJobs } from "@/functions/getCombinedFlatData";
import { postBookingAgentsJobs } from "@/functions/ipass_api";
import { useToast } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { bookingAgents } from "../../../public/_data/booking_agents";
import { minDate } from "../../../utils/datemin";
const Navbar = dynamic(() => import("@/components/Navbar"));
const ModalManagement = dynamic(
  () => import("@/components/Modals/bookings_report.modal")
);

import { bookingsReportModalState } from "@/atoms/bookingsReport";
import { useSetRecoilState } from "recoil";

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

  const setBookingsReportModalState = useSetRecoilState(
    bookingsReportModalState
  );

  const [dateFrom, setDateFrom] = useState<string | number | Date | any>("");
  const [dateTo, setDateTo] = useState<string | number | Date | any>("");
  const [userData, setUserData] = useState("");

  var today = new Date().toISOString().split("T")[0].toString();
  var addTwoMoreDays = new Date().getDate() + 2; // does not work
  const router = useRouter();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_SERVER_URL}/auth/`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          }
        );

        const getUserData = await res.json();
        if (!getUserData) {
          router.push("/auth/login");
        }
        // console.log(getUserData);
        setUserData(getUserData.email);
      } catch (err) {
        // console.log(err);
      }
    };
    getProfile();
  }, [userData]);

  // Chakra ui toast
  const toast = useToast();

  useEffect(() => {
    postBookingAgentsJobs({
      searchServiceOrder,
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
      userData,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL_MANAGEMENT}/agents/booking-agents/jobs/add`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postThisInfo),
      }
    );
    if (!response.ok || bookingAgent === "") {
      toast({
        title: "Job failed.",
        description: "Job already exists or no agent name.",
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

  return (
    <>
      <Head>
        <title>Booking Agents</title>
      </Head>
      <Navbar />
      <main className="space-between-navbar-and-content">
        <section className="container mx-auto p-3">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-[#eee] md:text-5xl lg:text-6xl text-center">
            Booking Agents
          </h1>
          <section className="flex flex-col justify-center gap-3 py-4">
            <div className="flex gap-3 items-center justify-between flex-col lg:flex-row">
              <div className="flex gap-3 items-center">
                <span>
                  <label
                    htmlFor="dateFrom"
                    className="sr-only dark:text-[#eee]"
                  >
                    Date from
                  </label>
                  <input
                    type="date"
                    name="dateFrom"
                    min={minDate}
                    max={addTwoMoreDays}
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="mb-2 bg-white border border-gray-300 outline-0 text-gray-900 dark:bg-[#22303C] dark:text-[#eee] text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    id="dateFrom"
                  />
                </span>
                <span>-</span>
                <span>
                  <label htmlFor="dateTo" className="sr-only dark:text-[#eee]">
                    Date to
                  </label>
                  <input
                    type="date"
                    name="dateTo"
                    min={minDate}
                    max={addTwoMoreDays}
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="mb-2 bg-white border border-gray-300 outline-0 text-gray-900 dark:bg-[#22303C] dark:text-[#eee] text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    id="dateTo"
                  />
                </span>
              </div>
              <span>
                <label
                  htmlFor="searchServiceOrder"
                  className="text-center sr-only dark:text-[#eee]"
                >
                  Search Service Order
                </label>
                <input
                  type="text"
                  id="searchServiceOrder"
                  name="searchServiceOrder"
                  placeholder="Search service order"
                  className="w-full outline-none py-2 px-2 border-2  font-semibold text-sm rounded-sm my-2 mx-auto dark:bg-[#22303C] dark:text-[#eee]"
                  value={searchServiceOrder}
                  onChange={(e) => setSearchServiceOrder(e.target.value)}
                  maxLength={10}
                />
              </span>
            </div>
          </section>

          {searchServiceOrder.length === 10 ? (
            <div className="max-h-[540px] overflow-y-auto my-5">
              <table className="relative w-full max-w-full whitespace-nowrap text-sm text-left text-gray-500 table-auto">
                <thead className="sticky top-0 bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus:bg-[#075985] text-white  text-sm uppercase font-semibold">
                  <tr className=" font-semibold">
                    <th className="px-4 py-3 cursor-pointer  font-semibold">
                      Service Order No
                    </th>
                    <th className="px-4 py-3 cursor-pointer  font-semibold">
                      Agent
                    </th>
                    <th className="px-4 py-3 cursor-pointer  font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="z-0">
                  <tr className="border-b cursor-pointer dark:bg-[#22303c] hover:bg-[#eee] hover:text-gray-900 focus:bg-[#eee] focus:text-gray-900 active:bg-[#eee] active:text-gray-900  dark:hover:bg-[#eee] dark:text-[#eee] dark:hover:text-[#22303c]">
                    <td className="px-4 py-3  font-medium text-sm max-w-full">
                      {serviceOrder}
                    </td>
                    <td className="px-4 py-3  font-medium text-sm max-w-full">
                      <span>
                        <label
                          htmlFor="bookingAgent"
                          className="block mb-2 text-sm font-medium  text-gray-900 sr-only"
                        >
                          Booking agent
                        </label>
                        <select
                          value={bookingAgent}
                          onChange={(e) => setBookingAgent(e.target.value)}
                          id="bookingAgent"
                          className="mb-2 bg-white border cursor-pointer border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-sm p-2.5"
                        >
                          <option disabled value="">
                            Select agent
                          </option>
                          {bookingAgents.map((stat) => (
                            <option key={stat.id} value={`${stat.agentName}`}>
                              {stat?.agentName}
                            </option>
                          ))}
                        </select>
                      </span>
                    </td>
                    <td className="px-4 py-3  font-medium text-sm max-w-full">
                      <button
                        type="button"
                        role="button"
                        onClick={postData}
                        className="font-medium bg-[#082f49] hover:bg-[#075985] active:bg-[#075985]  text-white  rounded py-1 px-2"
                      >
                        Add
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            ""
          )}

          <div className="max-h-[540px] overflow-y-auto">
            <table className="relative w-full max-w-full whitespace-nowrap text-sm text-left text-gray-500 table-auto">
              <thead className="sticky top-0 bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus:bg-[#075985] text-white  text-sm uppercase font-semibold">
                <tr className=" font-semibold">
                  <th className="px-4 py-3 cursor-pointer  font-semibold">
                    Booking Agent
                  </th>
                  <th className="px-4 py-3 cursor-pointer  font-semibold">
                    Jobs booked
                  </th>
                </tr>
              </thead>
              <tbody className="z-0">
                <tr
                  onClick={() =>
                    setBookingsReportModalState({
                      open: true,
                      view: "shanes300123",
                    })
                  }
                  className="border-b cursor-pointer dark:bg-[#22303c] hover:bg-[#eee] hover:text-gray-900 focus:bg-[#eee] focus:text-gray-900 active:bg-[#eee] active:text-gray-900  dark:hover:bg-[#eee] dark:text-[#eee] dark:hover:text-[#22303c]"
                >
                  <td className="px-4 py-3  font-medium text-sm max-w-full">
                    Shane
                  </td>
                  <td className="px-4 py-3  font-medium text-sm max-w-full">
                    {bookingAgentFunc(
                      getBookingAgentJobsData,
                      dateFrom,
                      dateTo,
                      "shanes300123"
                    )}
                  </td>
                </tr>
                <tr
                  onClick={() =>
                    setBookingsReportModalState({
                      open: true,
                      view: "nigelc01",
                    })
                  }
                  className="border-b cursor-pointer dark:bg-[#22303c] hover:bg-[#eee] hover:text-gray-900 focus:bg-[#eee] focus:text-gray-900 active:bg-[#eee] active:text-gray-900  dark:hover:bg-[#eee] dark:text-[#eee] dark:hover:text-[#22303c]"
                >
                  <td className="px-4 py-3  font-medium text-sm max-w-full">
                    Nigel
                  </td>
                  <td className="px-4 py-3  font-medium text-sm max-w-full">
                    {bookingAgentFunc(
                      getBookingAgentJobsData,
                      dateFrom,
                      dateTo,
                      "nigelc01"
                    )}
                  </td>
                </tr>
                <tr
                  onClick={() =>
                    setBookingsReportModalState({
                      open: true,
                      view: "sherryl060223",
                    })
                  }
                  className="border-b cursor-pointer dark:bg-[#22303c] hover:bg-[#eee] hover:text-gray-900 focus:bg-[#eee] focus:text-gray-900 active:bg-[#eee] active:text-gray-900  dark:hover:bg-[#eee] dark:text-[#eee] dark:hover:text-[#22303c]"
                >
                  <td className="px-4 py-3  font-medium text-sm max-w-full">
                    Sherry
                  </td>
                  <td className="px-4 py-3  font-medium text-sm max-w-full">
                    {bookingAgentFunc(
                      getBookingAgentJobsData,
                      dateFrom,
                      dateTo,
                      "sherryl060223"
                    )}
                  </td>
                </tr>
                <tr
                  onClick={() =>
                    setBookingsReportModalState({
                      open: true,
                      view: "lavonaj01",
                    })
                  }
                  className="border-b cursor-pointer dark:bg-[#22303c] hover:bg-[#eee] hover:text-gray-900 focus:bg-[#eee] focus:text-gray-900 active:bg-[#eee] active:text-gray-900  dark:hover:bg-[#eee] dark:text-[#eee] dark:hover:text-[#22303c]"
                >
                  <td className="px-4 py-3  font-medium text-sm max-w-full">
                    Lavona
                  </td>
                  <td className="px-4 py-3  font-medium text-sm max-w-full">
                    {bookingAgentFunc(
                      getBookingAgentJobsData,
                      dateFrom,
                      dateTo,
                      "lavonaj01"
                    )}
                  </td>
                </tr>
                <tr className="border-b cursor-pointer dark:bg-[#22303c] hover:bg-[#eee] hover:text-gray-900 focus:bg-[#eee] focus:text-gray-900 active:bg-[#eee] active:text-gray-900  dark:hover:bg-[#eee] dark:text-[#eee] dark:hover:text-[#22303c]">
                  <td className="px-4 py-3  font-bold text-sm max-w-full">
                    Total
                  </td>
                  <td className="px-4 py-3  font-medium text-sm max-w-full">
                    {bookingAgentFuncTotal(
                      getBookingAgentJobsData,
                      dateFrom,
                      dateTo
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <ModalManagement
              getBookingAgentJobsData={getBookingAgentJobsData}
              dateFrom={dateFrom}
              dateTo={dateTo}
            />
          </div>
        </section>
      </main>
    </>
  );
}

export default Reports;
