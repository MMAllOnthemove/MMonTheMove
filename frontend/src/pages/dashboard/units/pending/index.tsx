import { unitsPendingReportModalState } from "@/atoms/unitspendingAtom";
import ModalManagement from "@/components/Modals/unitspending.modal";
import Navbar from "@/components/Navbar";
import UnitsPendingCard from "@/components/UnitsPendingCard";
import {
  getFilteredBookedInJobs,
  getFilteredJobsByStatusCount,
  getMappedJobsByApprovedOrRejectedStatusCount,
} from "@/functions/pendingUnitsFunc";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { minDate } from "../../../../../utils/datemin";

function Pending() {
  const [fetchAlldata, setFetchAlldata] = useState<any[]>([]);
  const setPendingUnitsModalState = useSetRecoilState(
    unitsPendingReportModalState
  );
  const [fetchJobsApprovedAndRejected, setFetchJobsApprovedAndRejected] =
    useState<any[]>([]);
  const router = useRouter();
  var today = new Date().toISOString().split("T")[0].toString();

  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Repair and gspn combined data
  const fetchDataCombinedData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_URL_MANAGEMENT}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setFetchAlldata(data);
    } catch (error) {
      // console.log("Error", error);
    }
  };
  const countJobsApprovedAndRejected = async () => {
    // Get these from the history table
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_URL_MANAGEMENT}/units/history/get`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      // console.log(data.length);
      // console.log(data);
      setFetchJobsApprovedAndRejected(data);
    } catch (error) {
      // console.log("Error", error);
    }
  };

  useEffect(() => {
    countJobsApprovedAndRejected();
  }, [fetchJobsApprovedAndRejected]);
  useEffect(() => {
    fetchDataCombinedData();
  }, []);
  // console.log(
  //   getMappedJobsByApprovedOrRejectedStatusCount(
  //     fetchJobsApprovedAndRejected,
  //     dateFrom,
  //     dateTo,
  //     "Quote approved"
  //   )
  // );
  return (
    <>
      <Head>
        <title>Dashboard | Pending</title>
      </Head>
      <Navbar />
      <main className="space-between-navbar-and-content">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl text-center fonts-sans">
          Pending status breakdown
        </h1>

        <section className="container mx-auto stat_cards max-w-6xl py-4">
          <div className="breadcrumb_and_date_filter flex items-center justify-between">
            <div className="bg-white p-4 flex items-center flex-wrap">
              <nav aria-label="breadcrumb">
                <ol className="flex leading-none text-blue-500 divide-x">
                  <li className="pr-4">
                    <Link
                      href="/dashboard"
                      className="inline-flex items-center"
                    >
                      <svg
                        className="w-5 h-auto fill-current mx-2 text-gray-400"
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
                    className="inline-flex items-center px-4 text-gray-700 font-sans"
                    aria-current="page"
                  >
                    <Link
                      href="/dashboard/units/pending"
                      className="text-gray-600 hover:text-blue-500 font-sans"
                    >
                      Units pending
                    </Link>
                  </li>

                  <li
                    className="inline-flex items-center px-4 text-gray-700"
                    aria-current="page"
                  >
                    <Link
                      href="/dashboard/engineers"
                      className="text-gray-600 hover:text-blue-500 font-sans"
                    >
                      Engineers
                    </Link>
                  </li>
                </ol>
              </nav>
            </div>
            <div className="date_input ">
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
                <span className="font-sans">-</span>
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
            </div>
          </div>

          {/* The modal, we are putting it here because it won't matter */}
          <ModalManagement
            fetchAlldata={fetchAlldata}
            fetchJobsApprovedAndRejected={fetchJobsApprovedAndRejected}
            dateFrom={dateFrom}
            dateTo={dateTo}
          />
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 my-3">
            <UnitsPendingCard
              onClick={() =>
                setPendingUnitsModalState({
                  open: true,
                  view: "booked-in",
                })
              }
              cardParagraph={"Booked in"}
              cardHeading={getFilteredBookedInJobs(
                fetchAlldata,
                dateFrom,
                dateTo
              )}
            />
            <UnitsPendingCard
              onClick={() =>
                setPendingUnitsModalState({
                  open: true,
                  view: "repair-in-progress",
                })
              }
              cardParagraph={"Repair in progress"}
              cardHeading={getFilteredJobsByStatusCount(
                fetchAlldata,
                dateFrom,
                dateTo,
                "Repair in progress"
              )}
            />
            <UnitsPendingCard
              onClick={() =>
                setPendingUnitsModalState({
                  open: true,
                  view: "waiting-for-parts",
                })
              }
              cardParagraph={"Waiting for parts"}
              cardHeading={getFilteredJobsByStatusCount(
                fetchAlldata,
                dateFrom,
                dateTo,
                "Waiting for parts"
              )}
            />

            <UnitsPendingCard
              onClick={() =>
                setPendingUnitsModalState({
                  open: true,
                  view: "parts-issued",
                })
              }
              cardParagraph={"Parts issued"}
              cardHeading={getFilteredJobsByStatusCount(
                fetchAlldata,
                dateFrom,
                dateTo,
                "Parts issued"
              )}
            />

            <UnitsPendingCard
              onClick={() =>
                setPendingUnitsModalState({
                  open: true,
                  view: "parts-to-be-ordered",
                })
              }
              cardParagraph={"Parts to be ordered"}
              cardHeading={getFilteredJobsByStatusCount(
                fetchAlldata,
                dateFrom,
                dateTo,
                "Parts to be ordered"
              )}
            />

            <UnitsPendingCard
              onClick={() =>
                setPendingUnitsModalState({
                  open: true,
                  view: "scheduled",
                })
              }
              cardParagraph={"Scheduled"}
              cardHeading={getFilteredJobsByStatusCount(
                fetchAlldata,
                dateFrom,
                dateTo,
                "Scheduled"
              )}
            />

            <UnitsPendingCard
              onClick={() =>
                setPendingUnitsModalState({
                  open: true,
                  view: "customer-reply",
                })
              }
              cardParagraph={"Customer reply"}
              cardHeading={getFilteredJobsByStatusCount(
                fetchAlldata,
                dateFrom,
                dateTo,
                "Customer reply"
              )}
            />

            <UnitsPendingCard
              onClick={() =>
                setPendingUnitsModalState({
                  open: true,
                  view: "quality-control",
                })
              }
              cardParagraph={"Quality Control (QC)"}
              cardHeading={getFilteredJobsByStatusCount(
                fetchAlldata,
                dateFrom,
                dateTo,
                "Quality Control (QC)"
              )}
            />

            <UnitsPendingCard
              onClick={() =>
                setPendingUnitsModalState({
                  open: true,
                  view: "assigned-to-tech",
                })
              }
              cardParagraph={"Assigned to tech"}
              cardHeading={getFilteredJobsByStatusCount(
                fetchAlldata,
                dateFrom,
                dateTo,
                "Assigned to tech"
              )}
            />

            <UnitsPendingCard
              onClick={() =>
                setPendingUnitsModalState({
                  open: true,
                  view: "first-approval",
                })
              }
              cardParagraph={"Parts request 1st approval"}
              cardHeading={getFilteredJobsByStatusCount(
                fetchAlldata,
                dateFrom,
                dateTo,
                "Parts request 1st approval"
              )}
            />

            <UnitsPendingCard
              onClick={() =>
                setPendingUnitsModalState({
                  open: true,
                  view: "quote-pending",
                })
              }
              cardParagraph={"Quote pending"}
              cardHeading={getFilteredJobsByStatusCount(
                fetchAlldata,
                dateFrom,
                dateTo,
                "Quote pending"
              )}
            />
            <UnitsPendingCard
              onClick={() =>
                setPendingUnitsModalState({
                  open: true,
                  view: "quote-approved",
                })
              }
              cardParagraph={"Quote approved"}
              cardHeading={getMappedJobsByApprovedOrRejectedStatusCount(
                fetchJobsApprovedAndRejected,
                dateFrom,
                dateTo,
                "Quote approved"
              )}
            />
            <UnitsPendingCard
              onClick={() =>
                setPendingUnitsModalState({
                  open: true,
                  view: "waiting-for-customer",
                })
              }
              cardParagraph={"Waiting for customer"}
              cardHeading={getFilteredJobsByStatusCount(
                fetchAlldata,
                dateFrom,
                dateTo,
                "Waiting for customer"
              )}
            />
            <UnitsPendingCard
              onClick={() =>
                setPendingUnitsModalState({
                  open: true,
                  view: "waiting-saw",
                })
              }
              cardParagraph={"Waiting SAW"}
              cardHeading={getFilteredJobsByStatusCount(
                fetchAlldata,
                dateFrom,
                dateTo,
                "Waiting SAW"
              )}
            />
            <UnitsPendingCard
              onClick={() =>
                setPendingUnitsModalState({
                  open: true,
                  view: "qc-failed",
                })
              }
              cardParagraph={"QC failed"}
              cardHeading={getFilteredJobsByStatusCount(
                fetchAlldata,
                dateFrom,
                dateTo,
                "QC failed"
              )}
            />
            <UnitsPendingCard
              onClick={() =>
                setPendingUnitsModalState({
                  open: true,
                  view: "qc-completed",
                })
              }
              cardParagraph={"QC completed"}
              cardHeading={getFilteredJobsByStatusCount(
                fetchAlldata,
                dateFrom,
                dateTo,
                "QC completed"
              )}
            />
            <UnitsPendingCard
              onClick={() =>
                setPendingUnitsModalState({
                  open: true,
                  view: "pending-q-and-a",
                })
              }
              cardParagraph={"Pending Q&A"}
              cardHeading={getFilteredJobsByStatusCount(
                fetchAlldata,
                dateFrom,
                dateTo,
                "Pending Q&A"
              )}
            />
            <UnitsPendingCard
              onClick={() =>
                setPendingUnitsModalState({
                  open: true,
                  view: "so-cancel",
                })
              }
              cardParagraph={"SO cancel"}
              cardHeading={getFilteredJobsByStatusCount(
                fetchAlldata,
                dateFrom,
                dateTo,
                "SO cancel"
              )}
            />
            <UnitsPendingCard
              onClick={() =>
                setPendingUnitsModalState({
                  open: true,
                  view: "scrap-approved",
                })
              }
              cardParagraph={"Scrap approved"}
              cardHeading={getFilteredJobsByStatusCount(
                fetchAlldata,
                dateFrom,
                dateTo,
                "Scrap approved"
              )}
            />
            <UnitsPendingCard
              onClick={() =>
                setPendingUnitsModalState({
                  open: true,
                  view: "quote-rejected",
                })
              }
              cardParagraph={"Quote rejected"}
              cardHeading={getMappedJobsByApprovedOrRejectedStatusCount(
                fetchJobsApprovedAndRejected,
                dateFrom,
                dateTo,
                "Quote rejected"
              )}
            />
            <UnitsPendingCard
              onClick={() =>
                setPendingUnitsModalState({
                  open: true,
                  view: "for-invoicing",
                })
              }
              cardParagraph={"For invoicing"}
              cardHeading={getFilteredJobsByStatusCount(
                fetchAlldata,
                dateFrom,
                dateTo,
                "For invoicing"
              )}
            />
            <UnitsPendingCard
              onClick={() =>
                setPendingUnitsModalState({
                  open: true,
                  view: "parts-dna",
                })
              }
              cardParagraph={"Parts DNA"}
              cardHeading={getFilteredJobsByStatusCount(
                fetchAlldata,
                dateFrom,
                dateTo,
                "Parts DNA"
              )}
            />
            <UnitsPendingCard
              onClick={() =>
                setPendingUnitsModalState({
                  open: true,
                  view: "repair-complete",
                })
              }
              cardParagraph={"Repair complete"}
              cardHeading={getFilteredJobsByStatusCount(
                fetchAlldata,
                dateFrom,
                dateTo,
                "Repair complete"
              )}
            />
          </div>
        </section>
      </main>
    </>
  );
}

export default Pending;
