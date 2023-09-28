import { fetchDataCombinedData } from "@/functions/getCombinedFlatData";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../../../../components/Navbar";
import { engineers } from "../../../../public/_data/engineers";
import UnitsPendingCard from "../../../../components/UnitsPendingCard";
import { minDate } from "../../../../utils/datemin";

function Engineers() {
  const [engineerFilter, setEngineerFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [tableData, setTableData] = useState<any[]>([]);

  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  var today = new Date().toISOString().split("T")[0].toString();

  useEffect(() => {
    fetchDataCombinedData({ setTableData });
  }, []);

  let getBookedin =
    dateFrom.length > 0 && dateTo.length > 0
      ? tableData.filter((item) => {
          let filterPass = true;
          let date = new Date(item.date_modified);
          if (dateFrom) {
            filterPass =
              filterPass &&
              new Date(dateFrom) < date &&
              item.in_house_status === "Booked in" &&
              item.engineer === engineerFilter;
          }
          if (dateTo) {
            filterPass =
              filterPass &&
              new Date(dateTo) > date &&
              item.in_house_status === "Booked in" &&
              item.engineer === engineerFilter;
          }
          return filterPass;
        })
      : [];

  let repairInProgress =
    dateFrom.length > 0 && dateTo.length > 0
      ? tableData.filter((item) => {
          let filterPass = true;
          let date = new Date(item.date_modified);
          if (dateFrom) {
            filterPass =
              filterPass &&
              new Date(dateFrom) < date &&
              item.in_house_status === "Repair in progress" &&
              item.engineer === engineerFilter;
          }
          if (dateTo) {
            filterPass =
              filterPass &&
              new Date(dateTo) > date &&
              item.in_house_status === "Repair in progress" &&
              item.engineer === engineerFilter;
          }
          return filterPass;
        })
      : [];

  let waitingForParts =
    dateFrom.length > 0 && dateTo.length > 0
      ? tableData.filter((item) => {
          let filterPass = true;
          let date = new Date(item.date_modified);
          if (dateFrom) {
            filterPass =
              filterPass &&
              new Date(dateFrom) < date &&
              item.in_house_status === "Waiting for parts" &&
              item.engineer === engineerFilter;
          }
          if (dateTo) {
            filterPass =
              filterPass &&
              new Date(dateTo) > date &&
              item.in_house_status === "Waiting for parts" &&
              item.engineer === engineerFilter;
          }
          return filterPass;
        })
      : [];
  // console.log(waitingForParts);

  let waitingForCustomer =
    dateFrom.length > 0 && dateTo.length > 0
      ? tableData.filter((item) => {
          let filterPass = true;
          let date = new Date(item.date_modified);
          if (dateFrom) {
            filterPass =
              filterPass &&
              new Date(dateFrom) < date &&
              item.in_house_status === "Waiting for customer" &&
              item.engineer === engineerFilter;
          }
          if (dateTo) {
            filterPass =
              filterPass &&
              new Date(dateTo) > date &&
              item.in_house_status === "Waiting for customer" &&
              item.engineer === engineerFilter;
          }
          return filterPass;
        })
      : [];

  let partsIssued =
    dateFrom.length > 0 && dateTo.length > 0
      ? tableData.filter((item) => {
          let filterPass = true;
          let date = new Date(item.date_modified);
          if (dateFrom) {
            filterPass =
              filterPass &&
              new Date(dateFrom) < date &&
              item.in_house_status === "Parts issued" &&
              item.engineer === engineerFilter;
          }
          if (dateTo) {
            filterPass =
              filterPass &&
              new Date(dateTo) > date &&
              item.in_house_status === "Parts issued" &&
              item.engineer === engineerFilter;
          }
          return filterPass;
        })
      : [];

  let partsToBeOrdered =
    dateFrom.length > 0 && dateTo.length > 0
      ? tableData.filter((item) => {
          let filterPass = true;
          let date = new Date(item.date_modified);
          if (dateFrom) {
            filterPass =
              filterPass &&
              new Date(dateFrom) < date &&
              item.in_house_status === "Parts to be ordered" &&
              item.engineer === engineerFilter;
          }
          if (dateTo) {
            filterPass =
              filterPass &&
              new Date(dateTo) > date &&
              item.in_house_status === "Parts to be ordered" &&
              item.engineer === engineerFilter;
          }
          return filterPass;
        })
      : [];

  let scheduled =
    dateFrom.length > 0 && dateTo.length > 0
      ? tableData.filter((item) => {
          let filterPass = true;
          let date = new Date(item.date_modified);
          if (dateFrom) {
            filterPass =
              filterPass &&
              new Date(dateFrom) < date &&
              item.in_house_status === "Scheduled" &&
              item.engineer === engineerFilter;
          }
          if (dateTo) {
            filterPass =
              filterPass &&
              new Date(dateTo) > date &&
              item.in_house_status === "Scheduled" &&
              item.engineer === engineerFilter;
          }
          return filterPass;
        })
      : [];

  let customerReply =
    dateFrom.length > 0 && dateTo.length > 0
      ? tableData.filter((item) => {
          let filterPass = true;
          let date = new Date(item.date_modified);
          if (dateFrom) {
            filterPass =
              filterPass &&
              new Date(dateFrom) < date &&
              item.in_house_status === "Customer reply" &&
              item.engineer === engineerFilter;
          }
          if (dateTo) {
            filterPass =
              filterPass &&
              new Date(dateTo) > date &&
              item.in_house_status === "Customer reply" &&
              item.engineer === engineerFilter;
          }
          return filterPass;
        })
      : [];

  let qualityControl =
    dateFrom.length > 0 && dateTo.length > 0
      ? tableData.filter((item) => {
          let filterPass = true;
          let date = new Date(item.date_modified);
          if (dateFrom) {
            filterPass =
              filterPass &&
              new Date(dateFrom) < date &&
              item.in_house_status === "Quality Control (QC)" &&
              item.engineer === engineerFilter;
          }
          if (dateTo) {
            filterPass =
              filterPass &&
              new Date(dateTo) > date &&
              item.in_house_status === "Quality Control (QC)" &&
              item.engineer === engineerFilter;
          }
          return filterPass;
        })
      : [];

  let repairComplete =
    dateFrom.length > 0 && dateTo.length > 0
      ? tableData.filter((item) => {
          let filterPass = true;
          let date = new Date(item.date_modified);
          if (dateFrom) {
            filterPass =
              filterPass &&
              new Date(dateFrom) < date &&
              item.in_house_status === "Repair complete" &&
              item.engineer === engineerFilter;
          }
          if (dateTo) {
            filterPass =
              filterPass &&
              new Date(dateTo) > date &&
              item.in_house_status === "Repair complete" &&
              item.engineer === engineerFilter;
          }
          return filterPass;
        })
      : [];
  // console.log("repairComplete", repairComplete);
  let assignedTotech =
    dateFrom.length > 0 && dateTo.length > 0
      ? tableData.filter((item) => {
          let filterPass = true;
          let date = new Date(item.date_modified);
          if (dateFrom) {
            filterPass =
              filterPass &&
              new Date(dateFrom) < date &&
              item.in_house_status === "Assigned to tech" &&
              item.engineer === engineerFilter;
          }
          if (dateTo) {
            filterPass =
              filterPass &&
              new Date(dateTo) > date &&
              item.in_house_status === "Assigned to tech" &&
              item.engineer === engineerFilter;
          }
          return filterPass;
        })
      : [];

  let firstApproval =
    dateFrom.length > 0 && dateTo.length > 0
      ? tableData.filter((item) => {
          let filterPass = true;
          let date = new Date(item.date_modified);
          if (dateFrom) {
            filterPass =
              filterPass &&
              new Date(dateFrom) < date &&
              item.in_house_status === "Parts request 1st approval" &&
              item.engineer === engineerFilter;
          }
          if (dateTo) {
            filterPass =
              filterPass &&
              new Date(dateTo) > date &&
              item.in_house_status === "Parts request 1st approval" &&
              item.engineer === engineerFilter;
          }
          return filterPass;
        })
      : [];

  let quotePending =
    dateFrom.length > 0 && dateTo.length > 0
      ? tableData.filter((item) => {
          let filterPass = true;
          let date = new Date(item.date_modified);
          if (dateFrom) {
            filterPass =
              filterPass &&
              new Date(dateFrom) < date &&
              item.in_house_status === "Quote pending" &&
              item.engineer === engineerFilter;
          }
          if (dateTo) {
            filterPass =
              filterPass &&
              new Date(dateTo) > date &&
              item.in_house_status === "Quote pending" &&
              item.engineer === engineerFilter;
          }
          return filterPass;
        })
      : [];
  // console.log("quotePending", quotePending);
  let quoteApproved =
    dateFrom.length > 0 && dateTo.length > 0
      ? tableData.filter((item) => {
          let filterPass = true;
          let date = new Date(item.date_modified);
          if (dateFrom) {
            filterPass =
              filterPass &&
              new Date(dateFrom) < date &&
              item.in_house_status === "Quote approved" &&
              item.engineer === engineerFilter;
          }
          if (dateTo) {
            filterPass =
              filterPass &&
              new Date(dateTo) > date &&
              item.in_house_status === "Quote approved" &&
              item.engineer === engineerFilter;
          }
          return filterPass;
        })
      : [];

  let qcFailed =
    dateFrom.length > 0 && dateTo.length > 0
      ? tableData.filter((item) => {
          let filterPass = true;
          let date = new Date(item.date_modified);
          if (dateFrom) {
            filterPass =
              filterPass &&
              new Date(dateFrom) < date &&
              item.in_house_status === "QC failed" &&
              item.engineer === engineerFilter;
          }
          if (dateTo) {
            filterPass =
              filterPass &&
              new Date(dateTo) > date &&
              item.in_house_status === "QC failed" &&
              item.engineer === engineerFilter;
          }
          return filterPass;
        })
      : [];

  let qcCompleted =
    dateFrom.length > 0 && dateTo.length > 0
      ? tableData.filter((item) => {
          let filterPass = true;
          let date = new Date(item.date_modified);
          if (dateFrom) {
            filterPass =
              filterPass &&
              new Date(dateFrom) < date &&
              item.in_house_status === "QC completed" &&
              item.engineer === engineerFilter;
          }
          if (dateTo) {
            filterPass =
              filterPass &&
              new Date(dateTo) > date &&
              item.in_house_status === "QC completed" &&
              item.engineer === engineerFilter;
          }
          return filterPass;
        })
      : [];

  let pendingQandA =
    dateFrom.length > 0 && dateTo.length > 0
      ? tableData.filter((item) => {
          let filterPass = true;
          let date = new Date(item.date_modified);
          if (dateFrom) {
            filterPass =
              filterPass &&
              new Date(dateFrom) < date &&
              item.in_house_status === "Pending Q&A" &&
              item.engineer === engineerFilter;
          }
          if (dateTo) {
            filterPass =
              filterPass &&
              new Date(dateTo) > date &&
              item.in_house_status === "Pending Q&A" &&
              item.engineer === engineerFilter;
          }
          return filterPass;
        })
      : [];

  let soCancel =
    dateFrom.length > 0 && dateTo.length > 0
      ? tableData.filter((item) => {
          let filterPass = true;
          let date = new Date(item.date_modified);
          if (dateFrom) {
            filterPass =
              filterPass &&
              new Date(dateFrom) < date &&
              item.in_house_status === "SO cancel" &&
              item.engineer === engineerFilter;
          }
          if (dateTo) {
            filterPass =
              filterPass &&
              new Date(dateTo) > date &&
              item.in_house_status === "SO cancel" &&
              item.engineer === engineerFilter;
          }
          return filterPass;
        })
      : [];

  let scrapApproved =
    dateFrom.length > 0 && dateTo.length > 0
      ? tableData.filter((item) => {
          let filterPass = true;
          let date = new Date(item.date_modified);
          if (dateFrom) {
            filterPass =
              filterPass &&
              new Date(dateFrom) < date &&
              item.in_house_status === "Scrap approved" &&
              item.engineer === engineerFilter;
          }
          if (dateTo) {
            filterPass =
              filterPass &&
              new Date(dateTo) > date &&
              item.in_house_status === "Scrap approved" &&
              item.engineer === engineerFilter;
          }
          return filterPass;
        })
      : [];

  let quoteRejected =
    dateFrom.length > 0 && dateTo.length > 0
      ? tableData.filter((item) => {
          let filterPass = true;
          let date = new Date(item.date_modified);
          if (dateFrom) {
            filterPass =
              filterPass &&
              new Date(dateFrom) < date &&
              item.in_house_status === "Quote rejected" &&
              item.engineer === engineerFilter;
          }
          if (dateTo) {
            filterPass =
              filterPass &&
              new Date(dateTo) > date &&
              item.in_house_status === "Quote rejected" &&
              item.engineer === engineerFilter;
          }
          return filterPass;
        })
      : [];

  let forInvoicing =
    dateFrom.length > 0 && dateTo.length > 0
      ? tableData.filter((item) => {
          let filterPass = true;
          let date = new Date(item.date_modified);
          if (dateFrom) {
            filterPass =
              filterPass &&
              new Date(dateFrom) < date &&
              item.in_house_status === "For invoicing" &&
              item.engineer === engineerFilter;
          }
          if (dateTo) {
            filterPass =
              filterPass &&
              new Date(dateTo) > date &&
              item.in_house_status === "For invoicing" &&
              item.engineer === engineerFilter;
          }
          return filterPass;
        })
      : [];

  let partsDNA =
    dateFrom.length > 0 && dateTo.length > 0
      ? tableData.filter((item) => {
          let filterPass = true;
          let date = new Date(item.date_modified);
          if (dateFrom) {
            filterPass =
              filterPass &&
              new Date(dateFrom) < date &&
              item.in_house_status === "Parts DNA" &&
              item.engineer === engineerFilter;
          }
          if (dateTo) {
            filterPass =
              filterPass &&
              new Date(dateTo) > date &&
              item.in_house_status === "Parts DNA" &&
              item.engineer === engineerFilter;
          }
          return filterPass;
        })
      : [];

  let waitingSAW =
    dateFrom.length > 0 && dateTo.length > 0
      ? tableData.filter((item) => {
          let filterPass = true;
          let date = new Date(item.date_modified);
          if (dateFrom) {
            filterPass =
              filterPass &&
              new Date(dateFrom) < date &&
              item.in_house_status === "Waiting SAW" &&
              item.engineer === engineerFilter;
          }
          if (dateTo) {
            filterPass =
              filterPass &&
              new Date(dateTo) > date &&
              item.in_house_status === "Waiting SAW" &&
              item.engineer === engineerFilter;
          }
          return filterPass;
        })
      : [];
  return (
    <>
      <Head>
        <title>Dashboard | Pending</title>
      </Head>
      <Navbar />
      <body>
        <main className="space-between-navbar-and-content">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl text-center fonts-sans">
            Engineers breakdown
          </h1>

          <section className="container mx-auto stat_cards max-w-6xl py-4">
            <div className="bg-white p-4 flex items-center flex-wrap my-3">
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
                      className="text-gray-600 hover:text-blue-500 "
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
            <div className="date_input flex gap-3 items-center justify-between">
              <div>
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
              </div>
              <span>
                <label
                  htmlFor="engineerFilter"
                  className="block mb-2 text-sm font-medium font-sans text-gray-900 sr-only"
                >
                  Engineer filter
                </label>
                <select
                  value={engineerFilter}
                  onChange={(e) => setEngineerFilter(e.target.value)}
                  id="engineerFilter"
                  className="mb-2 bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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

            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 my-3">
              <UnitsPendingCard
                cardParagraph={"Booked in"}
                cardHeading={getBookedin.length}
              />
              <UnitsPendingCard
                cardParagraph={"Repair in progress"}
                cardHeading={repairInProgress.length}
              />
              <UnitsPendingCard
                cardParagraph={"Waiting for parts"}
                cardHeading={waitingForParts.length}
              />
              <UnitsPendingCard
                cardParagraph={"Waiting for customer"}
                cardHeading={waitingForCustomer.length}
              />

              <UnitsPendingCard
                cardParagraph={"Parts issued"}
                cardHeading={partsIssued.length}
              />

              <UnitsPendingCard
                cardParagraph={"Parts to be ordered"}
                cardHeading={partsToBeOrdered.length}
              />

              <UnitsPendingCard
                cardParagraph={"Scheduled"}
                cardHeading={scheduled.length}
              />

              <UnitsPendingCard
                cardParagraph={"Customer reply"}
                cardHeading={customerReply.length}
              />

              <UnitsPendingCard
                cardParagraph={"Quality Control (QC)"}
                cardHeading={qualityControl.length}
              />

              <UnitsPendingCard
                cardParagraph={"Assigned to tech"}
                cardHeading={assignedTotech.length}
              />

              <UnitsPendingCard
                cardParagraph={"Parts request 1st approval"}
                cardHeading={firstApproval.length}
              />

              <UnitsPendingCard
                cardParagraph={"Quote pending"}
                cardHeading={quotePending.length}
              />
              <UnitsPendingCard
                cardParagraph={"Quote approved"}
                cardHeading={quoteApproved.length}
              />
              <UnitsPendingCard
                cardParagraph={"Waiting for customer"}
                cardHeading={waitingForCustomer.length}
              />
              <UnitsPendingCard
                cardParagraph={"Waiting SAW"}
                cardHeading={waitingSAW.length}
              />
              <UnitsPendingCard
                cardParagraph={"QC failed"}
                cardHeading={qcFailed.length}
              />
              <UnitsPendingCard
                cardParagraph={"QC completed"}
                cardHeading={qcCompleted.length}
              />
              <UnitsPendingCard
                cardParagraph={"Pending Q&A"}
                cardHeading={pendingQandA.length}
              />
              <UnitsPendingCard
                cardParagraph={"SO cancel"}
                cardHeading={soCancel.length}
              />
              <UnitsPendingCard
                cardParagraph={"Scrap approved"}
                cardHeading={scrapApproved.length}
              />
              <UnitsPendingCard
                cardParagraph={"Quote rejected"}
                cardHeading={quoteRejected.length}
              />
              <UnitsPendingCard
                cardParagraph={"For invoicing"}
                cardHeading={forInvoicing.length}
              />
              <UnitsPendingCard
                cardParagraph={"Parts DNA"}
                cardHeading={partsDNA.length}
              />
              <UnitsPendingCard
                cardParagraph={"Repair Complete"}
                cardHeading={repairComplete.length}
              />
            </div>
          </section>
        </main>
      </body>
    </>
  );
}

export default Engineers;
