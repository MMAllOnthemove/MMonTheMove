import { fetchDataCombinedData } from "@/functions/getCombinedFlatData";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../../../../components/Navbar";
import { engineers } from "../../../../public/_data/engineers";
import UnitsPendingCard from "../../../../components/UnitsPendingCard";

function Engineers() {
  const [engineerFilter, setEngineerFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [tableData, setTableData] = useState<any[]>([]);

  useEffect(() => {
    fetchDataCombinedData({ setTableData });
  }, []);

  let getBookedin = tableData.filter(
    (item) =>
      item.date_modified === dateFilter &&
      item.in_house_status === "Booked in" &&
      item.engineer === engineerFilter
  ).length;

  let repairInProgress = tableData.filter(
    (item) =>
      item.date_modified === dateFilter &&
      item.in_house_status === "Repair in progress" &&
      item.engineer === engineerFilter
  ).length;

  let waitingForParts = tableData.filter(
    (item) =>
      item.date_modified === dateFilter &&
      item.in_house_status === "Waiting for parts" &&
      item.engineer === engineerFilter
  ).length;
  // console.log(waitingForParts);

  let waitingForCustomer = tableData.filter(
    (item) =>
      item.date_modified === dateFilter &&
      item.in_house_status === "Waiting for customer" &&
      item.engineer === engineerFilter
  ).length;
  let partsIssued = tableData.filter(
    (item) =>
      item.date_modified === dateFilter &&
      item.in_house_status === "Parts issued" &&
      item.engineer === engineerFilter
  ).length;

  let partsToBeOrdered = tableData.filter(
    (item) =>
      item.date_modified === dateFilter &&
      item.in_house_status === "Parts to be ordered" &&
      item.engineer === engineerFilter
  ).length;

  let scheduled = tableData.filter(
    (item) =>
      item.date_modified === dateFilter &&
      item.in_house_status === "Scheduled" &&
      item.engineer === engineerFilter
  ).length;
  let customerReply = tableData.filter(
    (item) =>
      item.date_modified === dateFilter &&
      item.in_house_status === "Customer reply" &&
      item.engineer === engineerFilter
  ).length;
  let qualityControl = tableData.filter(
    (item) =>
      item.date_modified === dateFilter &&
      item.in_house_status === "Quality Control (QC)" &&
      item.engineer === engineerFilter
  ).length;
  let repairComplete = tableData.filter(
    (item) =>
      item.date_modified.toString() === dateFilter &&
      item.in_house_status === "Repair complete" &&
      item.engineer === engineerFilter
  ).length;
  // console.log(repairComplete);
  let assignedTotech = tableData.filter(
    (item) =>
      item.date_modified === dateFilter &&
      item.in_house_status === "Assigned to tech" &&
      item.engineer === engineerFilter
  ).length;
  let firstApproval = tableData.filter(
    (item) =>
      item.date_modified === dateFilter &&
      item.in_house_status === "Parts request 1st approval" &&
      item.engineer === engineerFilter
  ).length;
  let quotePending = tableData.filter(
    (item) =>
      item.date_modified === dateFilter && // offset by 24 hours
      item.in_house_status === "Quote pending" &&
      item.engineer === engineerFilter
  ).length;
  // console.log(quotePending);
  let quoteApproved = tableData.filter(
    (item) =>
      item.date_modified === dateFilter &&
      item.in_house_status === "Quote approved" &&
      item.engineer === engineerFilter
  ).length;
  let qcFailed = tableData.filter(
    (item) =>
      item.date_modified === dateFilter &&
      item.in_house_status === "QC failed" &&
      item.engineer === engineerFilter
  ).length;
  let qcCompleted = tableData.filter(
    (item) =>
      item.date_modified === dateFilter &&
      item.in_house_status === "QC completed" &&
      item.engineer === engineerFilter
  ).length;
  let pendingQandA = tableData.filter(
    (item) =>
      item.date_modified === dateFilter &&
      item.in_house_status === "Pending Q&A" &&
      item.engineer === engineerFilter
  ).length;
  let soCancel = tableData.filter(
    (item) =>
      item.date_modified === dateFilter &&
      item.in_house_status === "SO cancel" &&
      item.engineer === engineerFilter
  ).length;
  let scrapApproved = tableData.filter(
    (item) =>
      item.date_modified === dateFilter &&
      item.in_house_status === "Scrap approved" &&
      item.engineer === engineerFilter
  ).length;
  let quoteRejected = tableData.filter(
    (item) =>
      item.date_modified === dateFilter &&
      item.in_house_status === "Quote rejected" &&
      item.engineer === engineerFilter
  ).length;
  let forInvoicing = tableData.filter(
    (item) =>
      item.date_modified === dateFilter &&
      item.in_house_status === "For invoicing" &&
      item.engineer === engineerFilter
  ).length;
  let partsDNA = tableData.filter(
    (item) =>
      item.date_modified === dateFilter &&
      item.in_house_status === "Parts DNA" &&
      item.engineer === engineerFilter
  ).length;
  let waitingSAW = tableData.filter(
    (item) =>
      item.date_modified === dateFilter &&
      item.in_house_status === "Waiting SAW" &&
      item.engineer === engineerFilter
  ).length;

  return (
    <>
      <Head>
        <title>Dashboard | Pending</title>
      </Head>
      <Navbar />
      <main className="space-between-navbar-and-content">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl text-center fonts-sans">
          Engineers breakdown
        </h1>

        <section className="container mx-auto stat_cards max-w-6xl py-4">
          <div className="bg-white p-4 flex items-center flex-wrap my-3">
            <nav aria-label="breadcrumb">
              <ol className="flex leading-none text-blue-500 divide-x">
                <li className="pr-4">
                  <Link href="/dashboard" className="inline-flex items-center">
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
            <span>
              <label htmlFor="date" className="sr-only">
                Filter by date
              </label>
              <input
                type="date"
                name="date"
                value={dateFilter}
                placeholder="Hello"
                onChange={(e) => setDateFilter(e.target.value)}
                className="mb-2 bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                id="date"
              />
            </span>
            <span>
              <label
                htmlFor="statusFilter"
                className="block mb-2 text-sm font-medium font-sans text-gray-900 sr-only"
              >
                Status filter
              </label>
              <select
                value={engineerFilter}
                onChange={(e) => setEngineerFilter(e.target.value)}
                id="statusFilter"
                className="mb-2 bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option disabled value="">
                  Filter by status
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
              cardHeading={getBookedin}
            />
            <UnitsPendingCard
              cardParagraph={"Repair in progress"}
              cardHeading={repairInProgress}
            />
            <UnitsPendingCard
              cardParagraph={"Waiting for parts"}
              cardHeading={waitingForParts}
            />
            <UnitsPendingCard
              cardParagraph={"Waiting for customer"}
              cardHeading={waitingForCustomer}
            />

            <UnitsPendingCard
              cardParagraph={"Parts issued"}
              cardHeading={partsIssued}
            />

            <UnitsPendingCard
              cardParagraph={"Parts to be ordered"}
              cardHeading={partsToBeOrdered}
            />

            <UnitsPendingCard
              cardParagraph={"Scheduled"}
              cardHeading={scheduled}
            />

            <UnitsPendingCard
              cardParagraph={"Customer reply"}
              cardHeading={customerReply}
            />

            <UnitsPendingCard
              cardParagraph={"Quality Control (QC)"}
              cardHeading={qualityControl}
            />

            <UnitsPendingCard
              cardParagraph={"Assigned to tech"}
              cardHeading={assignedTotech}
            />

            <UnitsPendingCard
              cardParagraph={"Parts request 1st approval"}
              cardHeading={firstApproval}
            />

            <UnitsPendingCard
              cardParagraph={"Quote pending"}
              cardHeading={quotePending}
            />
            <UnitsPendingCard
              cardParagraph={"Quote approved"}
              cardHeading={quoteApproved}
            />
            <UnitsPendingCard
              cardParagraph={"Waiting for customer"}
              cardHeading={waitingForCustomer}
            />
            <UnitsPendingCard
              cardParagraph={"Waiting SAW"}
              cardHeading={waitingSAW}
            />
            <UnitsPendingCard
              cardParagraph={"QC failed"}
              cardHeading={qcFailed}
            />
            <UnitsPendingCard
              cardParagraph={"QC completed"}
              cardHeading={qcCompleted}
            />
            <UnitsPendingCard
              cardParagraph={"Pending Q&A"}
              cardHeading={pendingQandA}
            />
            <UnitsPendingCard
              cardParagraph={"SO cancel"}
              cardHeading={soCancel}
            />
            <UnitsPendingCard
              cardParagraph={"Scrap approved"}
              cardHeading={scrapApproved}
            />
            <UnitsPendingCard
              cardParagraph={"Quote rejected"}
              cardHeading={quoteRejected}
            />
            <UnitsPendingCard
              cardParagraph={"For invoicing"}
              cardHeading={forInvoicing}
            />
            <UnitsPendingCard
              cardParagraph={"Parts DNA"}
              cardHeading={partsDNA}
            />
            <UnitsPendingCard
              cardParagraph={"Repair Complete"}
              cardHeading={repairComplete}
            />
          </div>
        </section>
      </main>
    </>
  );
}

export default Engineers;
