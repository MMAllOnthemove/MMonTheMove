import Head from "next/head";
import { useEffect, useState } from "react";
import Navbar from "../../../../../components/Navbar";
import Link from "next/link";
import UnitsPendingCard from "../../../../../components/UnitsPendingCard";

function Pending() {
  const [dateFilter, setDateFilter] = useState("");
  const [fetchAlldata, setFetchAlldata] = useState<any[]>([]);
  const [inHouseStatusFilter, setinHouseStatusFilter] = useState("");

  // Repair and gspn combined data
  const urls = [
    `${process.env.NEXT_PUBLIC_SERVER_API_URL_MANAGEMENT}`,
    `${process.env.NEXT_PUBLIC_SERVER_API_URL_MANAGEMENT}/repair`,
  ];
  const fetchDataCombinedData = async () => {
    try {
      const response = await Promise.all(
        urls.map((url) => fetch(url).then((res) => res.json()))
      );
      // console.log(response.flat());
      let filterOutDups = response
        .flat()
        .filter(
          (obj, index) =>
            response
              .flat()
              .findIndex(
                (item) => item.service_order_no === obj.service_order_no
              ) === index
        );
      setFetchAlldata(filterOutDups);
    } catch (error) {
      // console.log("Error", error);
    }
  };

  useEffect(() => {
    fetchDataCombinedData();
  }, []);

  let getBookedin = fetchAlldata.filter(
    (item) =>
      item.date_modified === dateFilter && item.in_house_status === "Booked in"
  );

  let repairInProgress = fetchAlldata.filter(
    (item) =>
      item.date_modified === dateFilter &&
      item.in_house_status === "Repair in progress"
  );

  let waitingForParts = fetchAlldata.filter(
    (item) =>
      item.date_modified === dateFilter &&
      item.in_house_status === "Waiting for parts"
  );
  // console.log(waitingForParts);

  let waitingForCustomer = fetchAlldata.filter(
    (item) =>
      item.date_modified === dateFilter &&
      item.in_house_status === "Waiting for customer"
  );

  let partsIssued = fetchAlldata.filter(
    (item) =>
      item.date_modified === dateFilter &&
      item.in_house_status === "Parts issued"
  );

  let partsToBeOrdered = fetchAlldata.filter(
    (item) =>
      item.date_modified === dateFilter &&
      item.in_house_status === "Parts to be ordered"
  );

  let scheduled = fetchAlldata.filter(
    (item) =>
      item.date_modified === dateFilter && item.in_house_status === "Scheduled"
  );

  let customerReply = fetchAlldata.filter(
    (item) =>
      item.date_modified === dateFilter &&
      item.in_house_status === "Customer reply"
  );

  let qualityControl = fetchAlldata.filter(
    (item) =>
      item.date_modified === dateFilter &&
      item.in_house_status === "Quality Control (QC)"
  );

  let repairComplete = fetchAlldata.filter(
    (item) =>
      item.date_modified.toString() === dateFilter &&
      item.in_house_status === "Repair complete"
  );
  // console.log(repairComplete);
  let assignedTotech = fetchAlldata.filter(
    (item) =>
      item.date_modified === dateFilter &&
      item.in_house_status === "Assigned to tech"
  );

  let firstApproval = fetchAlldata.filter(
    (item) =>
      item.date_modified === dateFilter &&
      item.in_house_status === "Parts request 1st approval"
  );

  let quotePending = fetchAlldata.filter(
    (item) =>
      item.date_modified === dateFilter && // offset by 24 hours
      item.in_house_status === "Quote pending"
  );
  // console.log(quotePending);
  let quoteApproved = fetchAlldata.filter(
    (item) =>
      item.date_modified === dateFilter &&
      item.in_house_status === "Quote approved"
  );

  let qcFailed = fetchAlldata.filter(
    (item) =>
      item.date_modified === dateFilter && item.in_house_status === "QC failed"
  );

  let qcCompleted = fetchAlldata.filter(
    (item) =>
      item.date_modified === dateFilter &&
      item.in_house_status === "QC completed"
  );

  let pendingQandA = fetchAlldata.filter(
    (item) =>
      item.date_modified === dateFilter &&
      item.in_house_status === "Pending Q&A"
  );

  let soCancel = fetchAlldata.filter(
    (item) =>
      item.date_modified === dateFilter && item.in_house_status === "SO cancel"
  );

  let scrapApproved = fetchAlldata.filter(
    (item) =>
      item.date_modified === dateFilter &&
      item.in_house_status === "Scrap approved"
  );

  let quoteRejected = fetchAlldata.filter(
    (item) =>
      item.date_modified === dateFilter &&
      item.in_house_status === "Quote rejected"
  );

  let forInvoicing = fetchAlldata.filter(
    (item) =>
      item.date_modified === dateFilter &&
      item.in_house_status === "For invoicing"
  );

  let partsDNA = fetchAlldata.filter(
    (item) =>
      item.date_modified === dateFilter && item.in_house_status === "Parts DNA"
  );

  let waitingSAW = fetchAlldata.filter(
    (item) =>
      item.date_modified === dateFilter &&
      item.in_house_status === "Waiting SAW"
  );

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
            <div className="date_input flex gap-3 items-center">
              <label htmlFor="date" className="sr-only">
                Filter by date
              </label>
              <input
                type="date"
                name="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="mb-2 bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                id="date"
              />
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
    </>
  );
}

export default Pending;
