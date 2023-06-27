import { useRouter } from "next/router";
import React, { useEffect, useState, useContext } from "react";
import UnitFinder from "@/pages/api/UnitFinder";
import { TableInfoContext } from "@/context/TableInfoContext";
import Head from "next/head";

function EditRow() {
  const { tableInfo, setTableInfo } = useContext(TableInfoContext);
  // These are already handled in the table but for user experience
  // We just show them and make their inputs disabled
  const [showServiceOrderNumber, setShowServiceOrderNumber] = useState("");
  const [loading, setLoading] = useState(false);

  // These one are the ones use has to update
  const [inHouseStatus, setInHouseStatus] = useState("");
  const [engineerAnalysis, setEngineerAnalysis] = useState("");
  const [qualityControl, setQualityControl] = useState("");
  const [ticket, setTicket] = useState("");
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      const response = await UnitFinder.get(`/${id}`);
      setShowServiceOrderNumber(response.data[0].service_order_no);
      // console.log(response.data[0].created_date);
      setInHouseStatus(response.data[0].in_house_status);
      fetchData();

      // setEngineerAnalysis(response.data.data.restaurant.engineer_analysis);
      // setTicket(response.data.data.restaurant.ticket_number);
    };
  }, []);

  const updateData = async () => {
    setLoading(true);
    const response = await UnitFinder.put(`/${id}`, {
      inHouseStatus,
      qualityControl,
      engineerAnalysis,
      ticket,
      id,
    });

    if (response) {
      setLoading(false);
      router.push("/management");
    }

    // console.log(response);
  };
  useEffect(() => {
    updateData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!loading) return <></>;
  return (
    <>
      <Head>
        <title>Edit row</title>
      </Head>
      <main className="edit_page_main">
        <h4 className="edit_page_title font-bold tracking-tight text-gray-900 dark:text-white">
          Edit Row
        </h4>
        <div className="container mx-auto p-1">
          <article className="w-full mx-auto max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col my-2">
              <label
                htmlFor="showServiceOrderNumber"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Service Order No
              </label>
              <input
                type="text"
                name="showServiceOrderNumber"
                id="showServiceOrderNumber"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-whitew-full"
                value={showServiceOrderNumber}
                disabled
              />
            </div>
            <div className="flex flex-col my-2">
              <label
                htmlFor="engineerAnalysis"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Engineer Analysis
              </label>
              <textarea
                name="engineerAnalysis"
                id="engineerAnalysis"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full outline-0 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                value={engineerAnalysis}
                onChange={(event) => setEngineerAnalysis(event.target.value)}
              ></textarea>
            </div>
            <div className="flex flex-col my-2">
              <label
                htmlFor="qualityControl"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Quality Control
              </label>
              <input
                type="text"
                name="qualityControl"
                id="qualityControl"
                value={qualityControl}
                placeholder="Type in this format, YYMMDD"
                className="bg-gray-50 border border-gray-300 outline-0 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                max={6}
                onChange={(e) => {
                  setQualityControl(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col my-2">
              <label
                htmlFor="qualityControl"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                In house status
              </label>
              <select
                value={inHouseStatus}
                className="bg-gray-50 border border-gray-300 outline-0 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                onChange={(e) => {
                  setInHouseStatus(e.target.value);
                }}
              >
                <option disabled>Choose status</option>
                <option value="Booked in">Booked in</option>
                <option value="Repair in progress">Repair in progress</option>
                <option value="Parts pending">Parts pending</option>
                <option value="Parts issued">Parts issued</option>
                <option value="Quote pending">Quote pending</option>
                <option value="Waiting for customer">
                  Waiting for customer
                </option>
                <option value="Waiting SAW">Waiting SAW</option>
                <option value="Quality Control (QC)">Quality Control</option>
                <option value="Repair completed">Repair completed</option>
                <option value="QR completed">QR completed</option>
                <option value="Pending Q&A">Pending Q&A</option>
                <option value="SO cancel">SO cancel</option>
                <option value="Scrap approved">Scrap approved</option>
                <option value="Quote rejected">Quote rejected</option>
                <option value="Waiting for parts">Waiting for parts</option>
                <option value="For invoicing">For invoicing</option>
              </select>
            </div>
            <div className="flex flex-col my-2">
              <label
                htmlFor="ticket"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Set ticket number
              </label>
              <input
                type="text"
                name="ticket"
                id="ticket"
                value={ticket}
                className="bg-gray-50 border border-gray-300 outline-0 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                onChange={(e) => {
                  setTicket(e.target.value);
                }}
              />
            </div>
            <button
              type="button"
              className="bg-[#082f49] w-full font-semibold text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={updateData}
            >
              {loading ? "Loading" : "Update"}
            </button>
          </article>
        </div>
      </main>
    </>
  );
}

export default EditRow;
