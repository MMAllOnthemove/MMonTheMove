// External imports
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

// Dynamic imports
const Navbar = dynamic(() => import("@/components/Navbar"));
const UnitsPendingCard = dynamic(() => import("@/components/UnitsPendingCard"));

// Custom imports
import { getEngineerJobsByStatusCount } from "@/functions/pendingUnitsFunc";
import { fetchCurrentUser, fetchTableData } from "@/hooks/useFetch";
import { useState } from "react";
import { engineers } from "../../../../../../public/_data/engineers";
import { minDate } from "../../../../../../utils/datemin";
import PageTitle from "@/components/PageTitle";
import NotLoggedIn from "@/components/NotLoggedIn";

function Engineers() {
  const { hhpData } = fetchTableData();
  const { userData } = fetchCurrentUser();
  const [engineerFilter, setEngineerFilter] = useState("");
  const router = useRouter();
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  var today = new Date().toISOString().split("T")[0].toString();
  return (
    <>
      <Head>
        <title>Dashboard | Pending</title>
        <meta name="robots" content="noindex, nofollow"></meta>
      </Head>
      <Navbar />
      <main className="space-between-navbar-and-content">
        <PageTitle title="Engineers breakdown" hasSpan={false} />
        {!userData ? (
          <NotLoggedIn />
        ) : (
          <section className="container mx-auto stat_cards max-w-6xl py-4 px-3 lg:px-0">
            <div className="flex flex-col items-center justify-between lg:flex-row">
              <div className="bg-white p-4 flex items-center flex-wrap my-3  dark:bg-[#15202B] dark:border dark:border-[#eee]">
                <nav aria-label="breadcrumb">
                  <ol className="flex leading-none text-blue-500 divide-x">
                    <li className="pr-4">
                      <Link
                        href="/department/hhp/dashboard"
                        className="inline-flex items-center"
                      >
                        <svg
                          className="w-5 h-auto fill-current mx-2 text-gray-400 dark:text-[#eee]"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="#000000"
                        >
                          <path d="M0 0h24v24H0V0z" fill="none" />
                          <path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z" />
                        </svg>
                      </Link>
                    </li>
                    <li
                      className="inline-flex items-center px-4 text-gray-700 "
                      aria-current="page"
                    >
                      <Link
                        href="/department/hhp/dashboard/units/pending"
                        className="text-gray-600 hover:text-blue-500 dark:text-[#eee]"
                      >
                        Units pending
                      </Link>
                    </li>

                    <li
                      className="inline-flex items-center px-4 text-gray-700"
                      aria-current="page"
                    >
                      <Link
                        href="/department/hhp/dashboard/engineers"
                        className="text-gray-600 hover:text-blue-500 dark:text-[#eee]"
                      >
                        Engineers
                      </Link>
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="flex flex-col justify-center gap-4 items-center lg:flex-row">
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
                      max={today}
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                      className="mb-2 cursor-pointer bg-white dark:bg-[#22303C] dark:text-[#eee] border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                      id="dateFrom"
                    />
                  </span>
                  <span>-</span>
                  <span>
                    <label
                      htmlFor="dateTo"
                      className="sr-only dark:text-[#eee]"
                    >
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
                    {engineers.map((eng) => (
                      <option key={eng.id} value={`${eng._name}`}>
                        {eng._name}
                      </option>
                    ))}
                  </select>
                </span>
              </div>
            </div>
            <p className="text-gray-600 text-sm text-center my-3 dark:text-[#eee]">
              The stats here are only counts, for detailed, go to{" "}
              <Link
                href="/department/hhp/dashboard/units/pending"
                className="text-blue-600 hover:text-blue-500 font-semibold"
              >
                Units pending
              </Link>
            </p>
            <p className="text-center font-medium dark:text-[#eee] text-sm my-3">
              Logged in as{" "}
              <span className="text-sky-700 font-semibold">{userData}</span>
            </p>
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 my-3">
              <UnitsPendingCard
                cardParagraph={"Booked in"}
                cardHeading={getEngineerJobsByStatusCount(
                  hhpData,
                  dateFrom,
                  dateTo,
                  "Booked in",
                  engineerFilter
                )}
              />
              <UnitsPendingCard
                cardParagraph={"Repair in progress"}
                cardHeading={getEngineerJobsByStatusCount(
                  hhpData,
                  dateFrom,
                  dateTo,
                  "Repair in progress",
                  engineerFilter
                )}
              />
              <UnitsPendingCard
                cardParagraph={"Waiting for parts"}
                cardHeading={getEngineerJobsByStatusCount(
                  hhpData,
                  dateFrom,
                  dateTo,
                  "Waiting for parts",
                  engineerFilter
                )}
              />

              <UnitsPendingCard
                cardParagraph={"Parts issued"}
                cardHeading={getEngineerJobsByStatusCount(
                  hhpData,
                  dateFrom,
                  dateTo,
                  "Parts issued",
                  engineerFilter
                )}
              />

              <UnitsPendingCard
                cardParagraph={"Parts to be ordered"}
                cardHeading={getEngineerJobsByStatusCount(
                  hhpData,
                  dateFrom,
                  dateTo,
                  "Parts to be ordered",
                  engineerFilter
                )}
              />

              <UnitsPendingCard
                cardParagraph={"Scheduled"}
                cardHeading={getEngineerJobsByStatusCount(
                  hhpData,
                  dateFrom,
                  dateTo,
                  "Scheduled",
                  engineerFilter
                )}
              />
              <UnitsPendingCard
                cardParagraph={"Customer reply"}
                cardHeading={getEngineerJobsByStatusCount(
                  hhpData,
                  dateFrom,
                  dateTo,
                  "Customer reply",
                  engineerFilter
                )}
              />

              <UnitsPendingCard
                cardParagraph={"Quality Control (QC)"}
                cardHeading={getEngineerJobsByStatusCount(
                  hhpData,
                  dateFrom,
                  dateTo,
                  "Quality Control (QC)",
                  engineerFilter
                )}
              />

              <UnitsPendingCard
                cardParagraph={"Assigned to tech"}
                cardHeading={getEngineerJobsByStatusCount(
                  hhpData,
                  dateFrom,
                  dateTo,
                  "Assigned to tech",
                  engineerFilter
                )}
              />

              <UnitsPendingCard
                cardParagraph={"Parts request 1st approval"}
                cardHeading={getEngineerJobsByStatusCount(
                  hhpData,
                  dateFrom,
                  dateTo,
                  "Parts request 1st approval",
                  engineerFilter
                )}
              />
              <UnitsPendingCard
                cardParagraph={"Quote pending"}
                cardHeading={getEngineerJobsByStatusCount(
                  hhpData,
                  dateFrom,
                  dateTo,
                  "Quote pending",
                  engineerFilter
                )}
              />
              <UnitsPendingCard
                cardParagraph={"Quote approved"}
                cardHeading={getEngineerJobsByStatusCount(
                  hhpData,
                  dateFrom,
                  dateTo,
                  "Quote approved",
                  engineerFilter
                )}
              />
              <UnitsPendingCard
                cardParagraph={"Waiting for customer"}
                cardHeading={getEngineerJobsByStatusCount(
                  hhpData,
                  dateFrom,
                  dateTo,
                  "Waiting for customer",
                  engineerFilter
                )}
              />
              <UnitsPendingCard
                cardParagraph={"Waiting SAW"}
                cardHeading={getEngineerJobsByStatusCount(
                  hhpData,
                  dateFrom,
                  dateTo,
                  "Waiting SAW",
                  engineerFilter
                )}
              />
              <UnitsPendingCard
                cardParagraph={"QC failed"}
                cardHeading={getEngineerJobsByStatusCount(
                  hhpData,
                  dateFrom,
                  dateTo,
                  "QC failed",
                  engineerFilter
                )}
              />
              <UnitsPendingCard
                cardParagraph={"QC completed"}
                cardHeading={getEngineerJobsByStatusCount(
                  hhpData,
                  dateFrom,
                  dateTo,
                  "QC completed",
                  engineerFilter
                )}
              />
              <UnitsPendingCard
                cardParagraph={"Pending Q&A"}
                cardHeading={getEngineerJobsByStatusCount(
                  hhpData,
                  dateFrom,
                  dateTo,
                  "Pending Q&A",
                  engineerFilter
                )}
              />
              <UnitsPendingCard
                cardParagraph={"SO cancel"}
                cardHeading={getEngineerJobsByStatusCount(
                  hhpData,
                  dateFrom,
                  dateTo,
                  "SO cancel",
                  engineerFilter
                )}
              />
              <UnitsPendingCard
                cardParagraph={"Scrap approved"}
                cardHeading={getEngineerJobsByStatusCount(
                  hhpData,
                  dateFrom,
                  dateTo,
                  "Scrap approved",
                  engineerFilter
                )}
              />
              <UnitsPendingCard
                cardParagraph={"Quote rejected"}
                cardHeading={getEngineerJobsByStatusCount(
                  hhpData,
                  dateFrom,
                  dateTo,
                  "Quote rejected",
                  engineerFilter
                )}
              />
              <UnitsPendingCard
                cardParagraph={"For invoicing"}
                cardHeading={getEngineerJobsByStatusCount(
                  hhpData,
                  dateFrom,
                  dateTo,
                  "For invoicing",
                  engineerFilter
                )}
              />
              <UnitsPendingCard
                cardParagraph={"Parts DNA"}
                cardHeading={getEngineerJobsByStatusCount(
                  hhpData,
                  dateFrom,
                  dateTo,
                  "Parts DNA",
                  engineerFilter
                )}
              />
              <UnitsPendingCard
                cardParagraph={"Repair Complete"}
                cardHeading={getEngineerJobsByStatusCount(
                  hhpData,
                  dateFrom,
                  dateTo,
                  "Repair complete",
                  engineerFilter
                )}
              />
            </div>
          </section>
        )}
      </main>
    </>
  );
}

export default Engineers;
