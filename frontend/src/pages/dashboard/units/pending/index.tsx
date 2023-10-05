import moment from "moment";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import UnitsPendingCard from "@/components/UnitsPendingCard";
import { minDate } from "../../../../../utils/datemin";

function Pending() {
  const [dateFilter, setDateFilter] = useState("");
  const [fetchAlldata, setFetchAlldata] = useState<any[]>([]);
  const [inHouseStatusFilter, setinHouseStatusFilter] = useState("");

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
      // console.log(data);
      setFetchAlldata(data);
    } catch (error) {
      // console.log("Error", error);
    }
  };

  useEffect(() => {
    fetchDataCombinedData();
  }, []);

  // let getBookedin = fetchAlldata.filter(
  //   (item) =>
  //     item.date_modified === dateFilter && item.in_house_status === "Booked in"
  // );

  // console.log(pendingStatusFunc(
  //   fetchAlldata,
  //   dateFrom,
  //   dateTo,
  //   "Waiting for parts"
  // ))
  let getBookedin =
    dateFrom.length > 0 && dateTo.length > 0
      ? fetchAlldata.filter((item) => {
          let filterPass = true;
          let date = new Date(item.date_modified);
          if (dateFrom) {
            filterPass =
              filterPass &&
              new Date(dateFrom) < date &&
              item.in_house_status === "Booked in";
          }
          if (dateTo) {
            filterPass =
              filterPass &&
              new Date(dateTo) > date &&
              item.in_house_status === "Booked in";
          }
          return filterPass;
        })
      : [];

  let repairInProgress =
    dateFrom.length > 0 && dateTo.length > 0
      ? fetchAlldata.filter((item) => {
          let filterPass = true;
          let date = new Date(item.date_modified);
          if (dateFrom) {
            filterPass =
              filterPass &&
              new Date(dateFrom) < date &&
              item.in_house_status === "Repair in progress";
          }
          if (dateTo) {
            filterPass =
              filterPass &&
              new Date(dateTo) > date &&
              item.in_house_status === "Repair in progress";
          }
          return filterPass;
        })
      : [];

  let waitingForParts =
    dateFrom.length > 0 && dateTo.length > 0
      ? fetchAlldata.filter((item) => {
          let filterPass = true;
          let date = moment(item.date_modified).format("YYYY-MM-DD");
          if (dateFrom) {
            filterPass =
              filterPass &&
              dateFrom <= date &&
              item.in_house_status === "Waiting for parts";
          }
          if (dateTo) {
            filterPass =
              filterPass &&
              dateTo >= date &&
              item.in_house_status === "Waiting for parts";
          }
          return filterPass;
        })
      : [];
  // console.log(waitingForParts);

  let waitingForCustomer =
    dateFrom.length > 0 && dateTo.length > 0
      ? fetchAlldata.filter((item) => {
          let filterPass = true;
          let date = new Date(item.date_modified);
          if (dateFrom) {
            filterPass =
              filterPass &&
              new Date(dateFrom) < date &&
              item.in_house_status === "Waiting for customer";
          }
          if (dateTo) {
            filterPass =
              filterPass &&
              new Date(dateTo) > date &&
              item.in_house_status === "Waiting for customer";
          }
          return filterPass;
        })
      : [];

  let partsIssued =
    dateFrom.length > 0 && dateTo.length > 0
      ? fetchAlldata.filter((item) => {
          let filterPass = true;
          let date = new Date(item.date_modified);
          if (dateFrom) {
            filterPass =
              filterPass &&
              new Date(dateFrom) < date &&
              item.in_house_status === "Parts issued";
          }
          if (dateTo) {
            filterPass =
              filterPass &&
              new Date(dateTo) > date &&
              item.in_house_status === "Parts issued";
          }
          return filterPass;
        })
      : [];

  let partsToBeOrdered =
    dateFrom.length > 0 && dateTo.length > 0
      ? fetchAlldata.filter((item) => {
          let filterPass = true;
          let date = new Date(item.date_modified);
          if (dateFrom) {
            filterPass =
              filterPass &&
              new Date(dateFrom) < date &&
              item.in_house_status === "Parts to be ordered";
          }
          if (dateTo) {
            filterPass =
              filterPass &&
              new Date(dateTo) > date &&
              item.in_house_status === "Parts to be ordered";
          }
          return filterPass;
        })
      : [];

  let scheduled =
    dateFrom.length > 0 && dateTo.length > 0
      ? fetchAlldata.filter((item) => {
          let filterPass = true;
          let date = new Date(item.date_modified);
          if (dateFrom) {
            filterPass =
              filterPass &&
              new Date(dateFrom) < date &&
              item.in_house_status === "Scheduled";
          }
          if (dateTo) {
            filterPass =
              filterPass &&
              new Date(dateTo) > date &&
              item.in_house_status === "Scheduled";
          }
          return filterPass;
        })
      : [];

  let customerReply =
    dateFrom.length > 0 && dateTo.length > 0
      ? fetchAlldata.filter((item) => {
          let filterPass = true;
          let date = new Date(item.date_modified);
          if (dateFrom) {
            filterPass =
              filterPass &&
              new Date(dateFrom) < date &&
              item.in_house_status === "Customer reply";
          }
          if (dateTo) {
            filterPass =
              filterPass &&
              new Date(dateTo) > date &&
              item.in_house_status === "Customer reply";
          }
          return filterPass;
        })
      : [];

  let qualityControl =
    dateFrom.length > 0 && dateTo.length > 0
      ? fetchAlldata.filter((item) => {
          let filterPass = true;
          let date = new Date(item.date_modified);
          if (dateFrom) {
            filterPass =
              filterPass &&
              new Date(dateFrom) < date &&
              item.in_house_status === "Quality Control (QC)";
          }
          if (dateTo) {
            filterPass =
              filterPass &&
              new Date(dateTo) > date &&
              item.in_house_status === "Quality Control (QC)";
          }
          return filterPass;
        })
      : [];

  let repairComplete =
    dateFrom.length > 0 && dateTo.length > 0
      ? fetchAlldata.filter((item) => {
          let filterPass = true;
          let date = new Date(item.date_modified);
          if (dateFrom) {
            filterPass =
              filterPass &&
              new Date(dateFrom) < date &&
              item.in_house_status === "Repair complete";
          }
          if (dateTo) {
            filterPass =
              filterPass &&
              new Date(dateTo) > date &&
              item.in_house_status === "Repair complete";
          }
          return filterPass;
        })
      : [];
  // console.log("repairComplete", repairComplete);
  let assignedTotech =
    dateFrom.length > 0 && dateTo.length > 0
      ? fetchAlldata.filter((item) => {
          let filterPass = true;
          let date = new Date(item.date_modified);
          if (dateFrom) {
            filterPass =
              filterPass &&
              new Date(dateFrom) < date &&
              item.in_house_status === "Assigned to tech";
          }
          if (dateTo) {
            filterPass =
              filterPass &&
              new Date(dateTo) > date &&
              item.in_house_status === "Assigned to tech";
          }
          return filterPass;
        })
      : [];

  let firstApproval =
    dateFrom.length > 0 && dateTo.length > 0
      ? fetchAlldata.filter((item) => {
          let filterPass = true;
          let date = new Date(item.date_modified);
          if (dateFrom) {
            filterPass =
              filterPass &&
              new Date(dateFrom) < date &&
              item.in_house_status === "Parts request 1st approval";
          }
          if (dateTo) {
            filterPass =
              filterPass &&
              new Date(dateTo) > date &&
              item.in_house_status === "Parts request 1st approval";
          }
          return filterPass;
        })
      : [];

  let quotePending =
    dateFrom.length > 0 && dateTo.length > 0
      ? fetchAlldata.filter((item) => {
          let filterPass = true;
          let date = new Date(item.date_modified);
          if (dateFrom) {
            filterPass =
              filterPass &&
              new Date(dateFrom) < date &&
              item.in_house_status === "Quote pending";
          }
          if (dateTo) {
            filterPass =
              filterPass &&
              new Date(dateTo) > date &&
              item.in_house_status === "Quote pending";
          }
          return filterPass;
        })
      : [];
  // console.log("quotePending", quotePending);
  let quoteApproved =
    dateFrom.length > 0 && dateTo.length > 0
      ? fetchAlldata.filter((item) => {
          let filterPass = true;
          let date = new Date(item.date_modified);
          if (dateFrom) {
            filterPass =
              filterPass &&
              new Date(dateFrom) < date &&
              item.in_house_status === "Quote approved";
          }
          if (dateTo) {
            filterPass =
              filterPass &&
              new Date(dateTo) > date &&
              item.in_house_status === "Quote approved";
          }
          return filterPass;
        })
      : [];

  let qcFailed =
    dateFrom.length > 0 && dateTo.length > 0
      ? fetchAlldata.filter((item) => {
          let filterPass = true;
          let date = new Date(item.date_modified);
          if (dateFrom) {
            filterPass =
              filterPass &&
              new Date(dateFrom) < date &&
              item.in_house_status === "QC failed";
          }
          if (dateTo) {
            filterPass =
              filterPass &&
              new Date(dateTo) > date &&
              item.in_house_status === "QC failed";
          }
          return filterPass;
        })
      : [];

  let qcCompleted =
    dateFrom.length > 0 && dateTo.length > 0
      ? fetchAlldata.filter((item) => {
          let filterPass = true;
          let date = new Date(item.date_modified);
          if (dateFrom) {
            filterPass =
              filterPass &&
              new Date(dateFrom) < date &&
              item.in_house_status === "QC completed";
          }
          if (dateTo) {
            filterPass =
              filterPass &&
              new Date(dateTo) > date &&
              item.in_house_status === "QC completed";
          }
          return filterPass;
        })
      : [];

  let pendingQandA =
    dateFrom.length > 0 && dateTo.length > 0
      ? fetchAlldata.filter((item) => {
          let filterPass = true;
          let date = new Date(item.date_modified);
          if (dateFrom) {
            filterPass =
              filterPass &&
              new Date(dateFrom) < date &&
              item.in_house_status === "Pending Q&A";
          }
          if (dateTo) {
            filterPass =
              filterPass &&
              new Date(dateTo) > date &&
              item.in_house_status === "Pending Q&A";
          }
          return filterPass;
        })
      : [];

  let soCancel =
    dateFrom.length > 0 && dateTo.length > 0
      ? fetchAlldata.filter((item) => {
          let filterPass = true;
          let date = new Date(item.date_modified);
          if (dateFrom) {
            filterPass =
              filterPass &&
              new Date(dateFrom) < date &&
              item.in_house_status === "SO cancel";
          }
          if (dateTo) {
            filterPass =
              filterPass &&
              new Date(dateTo) > date &&
              item.in_house_status === "SO cancel";
          }
          return filterPass;
        })
      : [];

  let scrapApproved =
    dateFrom.length > 0 && dateTo.length > 0
      ? fetchAlldata.filter((item) => {
          let filterPass = true;
          let date = new Date(item.date_modified);
          if (dateFrom) {
            filterPass =
              filterPass &&
              new Date(dateFrom) < date &&
              item.in_house_status === "Scrap approved";
          }
          if (dateTo) {
            filterPass =
              filterPass &&
              new Date(dateTo) > date &&
              item.in_house_status === "Scrap approved";
          }
          return filterPass;
        })
      : [];

  let quoteRejected =
    dateFrom.length > 0 && dateTo.length > 0
      ? fetchAlldata.filter((item) => {
          let filterPass = true;
          let date = new Date(item.date_modified);
          if (dateFrom) {
            filterPass =
              filterPass &&
              new Date(dateFrom) < date &&
              item.in_house_status === "Quote rejected";
          }
          if (dateTo) {
            filterPass =
              filterPass &&
              new Date(dateTo) > date &&
              item.in_house_status === "Quote rejected";
          }
          return filterPass;
        })
      : [];

  let forInvoicing =
    dateFrom.length > 0 && dateTo.length > 0
      ? fetchAlldata.filter((item) => {
          let filterPass = true;
          let date = new Date(item.date_modified);
          if (dateFrom) {
            filterPass =
              filterPass &&
              new Date(dateFrom) < date &&
              item.in_house_status === "For invoicing";
          }
          if (dateTo) {
            filterPass =
              filterPass &&
              new Date(dateTo) > date &&
              item.in_house_status === "For invoicing";
          }
          return filterPass;
        })
      : [];

  let partsDNA =
    dateFrom.length > 0 && dateTo.length > 0
      ? fetchAlldata.filter((item) => {
          let filterPass = true;
          let date = new Date(item.date_modified);
          if (dateFrom) {
            filterPass =
              filterPass &&
              new Date(dateFrom) < date &&
              item.in_house_status === "Parts DNA";
          }
          if (dateTo) {
            filterPass =
              filterPass &&
              new Date(dateTo) > date &&
              item.in_house_status === "Parts DNA";
          }
          return filterPass;
        })
      : [];

  let waitingSAW =
    dateFrom.length > 0 && dateTo.length > 0
      ? fetchAlldata.filter((item) => {
          let filterPass = true;
          let date = new Date(item.date_modified);
          if (dateFrom) {
            filterPass =
              filterPass &&
              new Date(dateFrom) < date &&
              item.in_house_status === "Waiting SAW";
          }
          if (dateTo) {
            filterPass =
              filterPass &&
              new Date(dateTo) > date &&
              item.in_house_status === "Waiting SAW";
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
          </div>

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 my-3">
            {/* <article className="card  max-w-md  cursor-pointer p-6 bg-white border border-gray-200 rounded-lg  flex flex-col justify-center text-center">
              <p className="font-sans  text-slate-700 font-semibold text-md leading-none tracking-tight capitalize">
                Booked in
              </p>
              <h3 className="font-sans text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl ">
                {getBookedin.length}
              </h3>
            </article> */}
            <UnitsPendingCard
              onClick={() => router.push("/dashboard/units/pending/booked-in")}
              cardParagraph={"Booked in"}
              cardHeading={getBookedin.length}
            />
            <UnitsPendingCard
              onClick={() =>
                router.push("/dashboard/units/pending/repair-in-progress")
              }
              cardParagraph={"Repair in progress"}
              cardHeading={repairInProgress.length}
            />
            <UnitsPendingCard
              onClick={() =>
                router.push("/dashboard/units/pending/waiting-for-parts")
              }
              cardParagraph={"Waiting for parts"}
              cardHeading={waitingForParts.length}
            />

            <UnitsPendingCard
              onClick={() =>
                router.push("/dashboard/units/pending/parts-issued")
              }
              cardParagraph={"Parts issued"}
              cardHeading={partsIssued.length}
            />

            <UnitsPendingCard
              onClick={() =>
                router.push("/dashboard/units/pending/parts-to-be-ordered")
              }
              cardParagraph={"Parts to be ordered"}
              cardHeading={partsToBeOrdered.length}
            />

            <UnitsPendingCard
              onClick={() => router.push("/dashboard/units/pending/scheduled")}
              cardParagraph={"Scheduled"}
              cardHeading={scheduled.length}
            />

            <UnitsPendingCard
              onClick={() =>
                router.push("/dashboard/units/pending/customer-reply")
              }
              cardParagraph={"Customer reply"}
              cardHeading={customerReply.length}
            />

            <UnitsPendingCard
              onClick={() =>
                router.push("/dashboard/units/pending/quality-control")
              }
              cardParagraph={"Quality Control (QC)"}
              cardHeading={qualityControl.length}
            />

            <UnitsPendingCard
              onClick={() =>
                router.push("/dashboard/units/pending/assigned-to-tech")
              }
              cardParagraph={"Assigned to tech"}
              cardHeading={assignedTotech.length}
            />

            <UnitsPendingCard
              onClick={() =>
                router.push("/dashboard/units/pending/first-approval")
              }
              cardParagraph={"Parts request 1st approval"}
              cardHeading={firstApproval.length}
            />

            <UnitsPendingCard
              onClick={() =>
                router.push("/dashboard/units/pending/quote-pending")
              }
              cardParagraph={"Quote pending"}
              cardHeading={quotePending.length}
            />
            <UnitsPendingCard
              onClick={() =>
                router.push("/dashboard/units/pending/quote-approved")
              }
              cardParagraph={"Quote approved"}
              cardHeading={quoteApproved.length}
            />
            <UnitsPendingCard
              onClick={() =>
                router.push("/dashboard/units/pending/waiting-for-customer")
              }
              cardParagraph={"Waiting for customer"}
              cardHeading={waitingForCustomer.length}
            />
            <UnitsPendingCard
              onClick={() =>
                router.push("/dashboard/units/pending/waiting-saw")
              }
              cardParagraph={"Waiting SAW"}
              cardHeading={waitingSAW.length}
            />
            <UnitsPendingCard
              onClick={() => router.push("/dashboard/units/pending/qc-failed")}
              cardParagraph={"QC failed"}
              cardHeading={qcFailed.length}
            />
            <UnitsPendingCard
              onClick={() =>
                router.push("/dashboard/units/pending/qc-completed")
              }
              cardParagraph={"QC completed"}
              cardHeading={qcCompleted.length}
            />
            <UnitsPendingCard
              onClick={() =>
                router.push("/dashboard/units/pending/pending-q-and-a")
              }
              cardParagraph={"Pending Q&A"}
              cardHeading={pendingQandA.length}
            />
            <UnitsPendingCard
              onClick={() => router.push("/dashboard/units/pending/so-cancel")}
              cardParagraph={"SO cancel"}
              cardHeading={soCancel.length}
            />
            <UnitsPendingCard
              onClick={() =>
                router.push("/dashboard/units/pending/scrap-approved")
              }
              cardParagraph={"Scrap approved"}
              cardHeading={scrapApproved.length}
            />
            <UnitsPendingCard
              onClick={() =>
                router.push("/dashboard/units/pending/quote-rejected")
              }
              cardParagraph={"Quote rejected"}
              cardHeading={quoteRejected.length}
            />
            <UnitsPendingCard
              onClick={() =>
                router.push("/dashboard/units/pending/for-invoicing")
              }
              cardParagraph={"For invoicing"}
              cardHeading={forInvoicing.length}
            />
            <UnitsPendingCard
              onClick={() => router.push("/dashboard/units/pending/parts-dna")}
              cardParagraph={"Parts DNA"}
              cardHeading={partsDNA.length}
            />
            <UnitsPendingCard
              onClick={() =>
                router.push("/dashboard/units/pending/repair-complete")
              }
              cardParagraph={"Repair complete"}
              cardHeading={repairComplete.length}
            />
          </div>
        </section>
      </main>
    </>
  );
}

export default Pending;
