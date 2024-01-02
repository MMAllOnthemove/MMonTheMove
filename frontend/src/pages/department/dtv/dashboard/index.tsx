// External imports
import PageTitle from "@/components/PageTitle";
import { getDTVAnalytics } from "@/functions/getDtvAnalytics";
import {
  getDTVEngineerJobsAllTime,
  getDTVEngineerJobsByStatus,
} from "@/functions/pendingUnitsFunc";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { dtvEngineers } from "../../../../../public/_data/engineers";
import { minDate } from "../../../../../utils/datemin";
import { fetchCurrentUser } from "@/hooks/useFetch";

// Dynamic imports
const UnitsPendingCard = dynamic(() => import("@/components/UnitsPendingCard"));
const Navbar = dynamic(() => import("@/components/Navbar"));
const DashboardStatCards = dynamic(
  () => import("@/components/DashboardStatCards")
);

function Dashboard() {
  const { dtvData } = getDTVAnalytics();
  const router = useRouter();
  const [engineerFilter, setEngineerFilter] = useState("");
  // const [userData, setUserData] = useState("");
  const { userData } = fetchCurrentUser();
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  // console.log("dtvData", dtvData);
  var today = new Date().toISOString().split("T")[0].toString();
  return (
    <>
      <Head>
        <title>DTV Dashboard</title>
        <meta name="robots" content="noindex, nofollow"></meta>
      </Head>
      <Navbar />

      <main className="space-between-navbar-and-content">
        <PageTitle title={"DTV Analytics"} hasSpan={false} />
        <section className="container max-w-6xl px-5 mx-auto pt-5 mb-28">
          <div className="flex flex-col justify-center gap-4 items-center lg:flex-row">
            <div className="flex gap-3 items-center">
              <span>
                <label htmlFor="dateFrom" className="sr-only dark:text-[#eee]">
                  Date from
                </label>
                <input
                  type="date"
                  name="dateFrom"
                  min={minDate}
                  max={today}
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="mb-2 cursor-pointer bg-white dark:bg-[#22303C] dark:text-[#eee] border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5"
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
                  max={today}
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="mb-2 cursor-pointer bg-white dark:bg-[#22303C] dark:text-[#eee] border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                  id="dateTo"
                />
              </span>
            </div>
            <span>
              <label
                htmlFor="engineerFilter"
                className="block mb-2 text-sm font-medium  text-gray-900 dark:text-[#eee] sr-only"
              >
                Engineer filter
              </label>
              <select
                value={engineerFilter}
                onChange={(e) => setEngineerFilter(e.target.value)}
                id="engineerFilter"
                className="mb-2 bg-white border cursor-pointer border-gray-300 outline-0 dark:bg-[#22303C] dark:text-[#eee] text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option disabled value="">
                  Filter by engineer
                </option>
                {dtvEngineers.map((eng) => (
                  <option key={eng.id} value={`${eng._name}`}>
                    {eng._name}
                  </option>
                ))}
              </select>
            </span>
          </div>

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 my-3">
            <UnitsPendingCard
              cardParagraph={"Active"}
              cardHeading={getDTVEngineerJobsByStatus(
                dtvData,
                dateFrom,
                dateTo,
                "true",
                engineerFilter
              )}
            />
            <UnitsPendingCard
              cardParagraph={"Complete"}
              cardHeading={getDTVEngineerJobsByStatus(
                dtvData,
                dateFrom,
                dateTo,
                "false",
                engineerFilter
              )}
            />
            <UnitsPendingCard
              cardParagraph={"All time"}
              cardHeading={getDTVEngineerJobsAllTime(dtvData, dateFrom, dateTo)}
            />
          </div>
        </section>
      </main>
    </>
  );
}

export default Dashboard;
