import React from "react";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import { partsStatus } from "../../../../public/_data/statuses";
import Head from "next/head";
import Button from "@/components/Buttons";
import UnitFinder from "@/pages/api/UnitFinder";
import Container from "@/components/Container";

function PartsEdit() {
  const [getPartsJobHistory, setGetPartsJobHistory] = useState<
    string[] | any[]
  >([]);
  const [showServiceOrderNumber, setShowServiceOrderNumber] = useState("");
  // Allow user to select only today's date
  var today = new Date().toISOString().split("T")[0];

  const [service_order, setServiceOrder] = useState("");
  const [warranty, setWarranty] = useState("");
  const [serial_number, setSerialNumber] = useState("");

  const [model, setModel] = useState("");
  const [imei, setImei] = useState("");

  const [inHouseStatus, setInHouseStatus] = useState(""); //  value being modified
  const [dispatchAnalysis, setDispatchAnalysis] = useState(""); //  value being modified
  const [engineer, setEngineer] = useState("");
  const [ticket, setTicket] = useState("");
  const [fault, setFault] = useState("");
  const [department, setDepartment] = useState("");
  const [partsAlreadyGiven, setPartsAlreadyGiven] = useState<string[] | any[]>(
    []
  );
  const [partsChecked, setPartsChecked] = useState("");
  const [reasonForIncompleteParts, setReasonForIncompleteParts] = useState("");
  const [dispatchBy, setDispatch] = useState("");

  const router = useRouter();
  const { id } = router.query;
  const toast = useToast();

  useEffect(() => {
    getThisJobsData();
  }, [id]);

  const getThisJobsData = useCallback(async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL_MANAGEMENT}/parts/get/` + id
    )
      .then((res) => res.json())
      .then((data) => {
        setShowServiceOrderNumber(data[0]?.service_order);
        setServiceOrder(data[0]?.service_order);
        setWarranty(data[0]?.warranty);
        setInHouseStatus(data[0]?.in_house_status);
        setEngineer(data[0]?.engineer);
        setTicket(data[0]?.ticket);
        setDepartment(data[0]?.department);
        setFault(data[0]?.fault);
        setPartsAlreadyGiven(data[0]?.all_parts);
        setSerialNumber(data[0]?.serial_number);
        setPartsChecked(data[0]?.parts_checked);
        setReasonForIncompleteParts(data[0]?.reason_for_incomplete_parts);
        setModel(data[0]?.model);
        setImei(data[0]?.imei);
        setDispatch(data[0]?.dispatch_by);
      });
  }, []);

  useEffect(() => {
    getThisJobsDataHistory();
  }, [getPartsJobHistory]);

  const getThisJobsDataHistory = useCallback(async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL_MANAGEMENT}/parts/history/get`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setGetPartsJobHistory(data);
      });
  }, []);

  let dateModified = new Date();
  const updateData = async (e: any) => {
    e.preventDefault();
    router.push("/parts");
    toast({
      title: "Job edited.",
      description: "You've successfully edited the job.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });

    const putThisInfo = {
      dispatchAnalysis,
      inHouseStatus,
      dateModified,
      id,
    };
    // console.log(putThisInfo);
    const putMethod = {
      method: "PUT", // Method itself
      headers: {
        "Content-type": "application/json; charset=UTF-8", // Indicates the content
      },
      body: JSON.stringify(putThisInfo), // We send data in JSON format
    };
    const response1 = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL_MANAGEMENT}/parts/put/` + id,
      putMethod
    )
      .then((res) => res.json())
      .then((data) => {
        //
      })
      .catch((e) => {
        //
      });
    let dateAdded = "";
    let partsArr = partsAlreadyGiven;

    // To create the history table, we need to fetch al the data and post it with the one that's being updated
    // Hence we are updating and posting under the same function

    const postThisInfo = {
      service_order,
      warranty,
      model,
      imei,
      fault,
      serial_number,
      engineer,
      dispatchAnalysis,
      inHouseStatus,
      ticket,
      department,
      dispatchBy,
      partsArr,
      dateAdded,
      dateModified,
      partsChecked,
      reasonForIncompleteParts,
    };
    const response2 = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL_MANAGEMENT}/parts/history/post`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postThisInfo),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        //
      });
  };

  async function deleteData() {
    router.push("/parts");
    toast({
      title: "Job deleted.",
      description: "You've successfully deleted the job.",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
    const response = await UnitFinder.delete(`/parts/delete/${id}`);
  }

  return (
    <>
      <Head>
        <title>Edit Parts {showServiceOrderNumber}</title>
        <meta name="robots" content="noindex, nofollow"></meta>
      </Head>
      <main>
        <Container>
          <section className="section">
            <span className="flex items-center justify-between">
              <Button
                type="button"
                onClick={() => history.back()}
                className="bg-[#082f49]  font-sans font-semibold text-white hover:bg-blue-800 rounded-sm text-sm p-2.5 text-center"
                text="Back"
              />
              <div>
                <h1 className="text-center py-2 text-gray-900 font-sans font-semibold lg:text-2xl">
                  {" "}
                  Editing service order: {showServiceOrderNumber}
                </h1>
                <hr />
              </div>
              <div />
            </span>

            <form className="my-3" onSubmit={updateData} id="updateJobForm">
              <span>
                <label
                  htmlFor="showServiceOrderNumber"
                  className="block mb-2 text-sm font-medium font-sans text-gray-900 "
                >
                  Service Order No
                </label>
                <input
                  type="text"
                  name="showServiceOrderNumber"
                  id="showServiceOrderNumber"
                  className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  defaultValue={showServiceOrderNumber}
                  disabled
                />
              </span>
              <span>
                <label
                  htmlFor="ticket"
                  className="block mb-2 text-sm font-medium font-sans text-gray-900 "
                >
                  Ticket number
                </label>
                <input
                  type="text"
                  name="ticket"
                  id="ticket"
                  defaultValue={ticket}
                  disabled
                  className="mb-2 bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </span>
              <span>
                <label
                  htmlFor="fault"
                  className="block mb-2 text-sm font-medium font-sans text-gray-900 "
                >
                  Fault
                </label>
                <input
                  type="text"
                  name="fault"
                  id="fault"
                  defaultValue={fault.toUpperCase()}
                  disabled
                  className="mb-2 bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </span>
              <span>
                <label
                  htmlFor="engineer"
                  className="block mb-2 text-sm font-medium font-sans text-gray-900 "
                >
                  Engineer
                </label>
                <input
                  type="text"
                  name="engineer"
                  id="engineer"
                  className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  defaultValue={engineer}
                  disabled
                />
              </span>
              <span>
                <label
                  htmlFor="department"
                  className="block mb-2 text-sm font-medium font-sans text-gray-900 "
                >
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  id="department"
                  className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  defaultValue={department}
                  disabled
                />
              </span>
              <span>
                <label
                  htmlFor="inHouseStatus"
                  className="block mb-2 text-sm font-medium font-sans text-gray-900"
                >
                  In house status
                </label>
                <select
                  value={inHouseStatus}
                  onChange={(e) => setInHouseStatus(e.target.value)}
                  id="inHouseStatus"
                  className="mb-2 bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option disabled value="">
                    Choose status
                  </option>
                  {partsStatus.map((stat) => (
                    <option key={stat.id} value={`${stat._status}`}>
                      {stat?._status}
                    </option>
                  ))}
                </select>
                <span>
                  <h4 className="block mb-2 text-sm font-medium font-sans text-gray-900">
                    Parts already given:
                  </h4>
                  {partsAlreadyGiven?.map((part: string, index: number) => (
                    <p className="block mb-2 text-sm font-normal font-sans text-gray-900">
                      <span
                        className="text-sm font-bold font-sans text-gray-900"
                        key={index}
                      >
                        {index + 1}
                      </span>{" "}
                      - {part}
                    </p>
                  ))}
                </span>
                <span>
                  <label
                    htmlFor="dispatchAnalysis"
                    className="block mb-2 text-sm font-medium font-sans text-gray-900"
                  >
                    Dispatch comment
                  </label>
                  <textarea
                    name="dispatchAnalysis"
                    id="dispatchAnalysis"
                    value={dispatchAnalysis}
                    onChange={(e) => setDispatchAnalysis(e.target.value)}
                    className="mb-2 bg-white border resize-none border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full outline-0 p-2.5"
                  ></textarea>
                </span>
              </span>

              <span>
                <Button
                  type="submit"
                  className="bg-[#082f49] w-full font-sans font-semibold text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-sm text-sm px-5 py-2.5 text-cente my-3"
                  text="Update"
                />
              </span>
            </form>
            {/* <span>
              <Button
                type="button"
                className="bg-red-500 w-full font-sans font-semibold text-white hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-sm text-sm px-5 py-2.5 text-center my-3"
                text="Delete"
                onClick={deleteData}
              />
            </span> */}
            <section className="my-4 flex flex-col gap-5 py-4">
              <p className="font-sans font-semibold text-slate-700">History</p>
              {getPartsJobHistory.length > 0
                ? getPartsJobHistory
                    .filter(
                      (onlyThisJob) =>
                        onlyThisJob.service_order === service_order
                    )
                    .map((jobHistory: string | any) => (
                      <article
                        className="job_history_card border rounded-sm padding border-[#eee] p-2 flex flex-col gap-4"
                        key={jobHistory?.id}
                      >
                        <div className="top_row flex items-center justify-between">
                          <h3 className=" text-slate-800 font-semibold">
                            {jobHistory?.dispatch_by}
                          </h3>
                          <p className="font-sans text-slate-800  font-semibold">
                            {jobHistory?.service_order}
                          </p>
                          <p className="font-sans text-slate-800  font-semibold">
                            {jobHistory?.job_modified_date === null || ""
                              ? ""
                              : new Date(
                                  jobHistory?.job_modified_date
                                ).toDateString()}
                          </p>
                        </div>
                        <hr />
                        <div className="rounded-sm flex justify-between items-center">
                          <h5 className="font-sans text-slate-800 font-medium">
                            Assigned to:{" "}
                          </h5>
                          <h5 className="font-sans text-slate-800 font-medium">
                            {jobHistory?.engineer}
                          </h5>
                        </div>
                        <div className="rounded-sm flex justify-between items-center">
                          <h5 className="font-sans text-slate-800 font-medium">
                            In house status:{" "}
                          </h5>
                          <h5 className="font-sans text-slate-800 font-medium">
                            {jobHistory?.in_house_status}
                          </h5>
                        </div>

                        <div className="bg-[#f8f9fa]">
                          <p className="font-sans text-slate-800">
                            {jobHistory?.dispatch_analysis.toUpperCase()}
                          </p>
                        </div>
                      </article>
                    ))
                : "History not available"}
            </section>
          </section>
        </Container>
      </main>
    </>
  );
}

export default PartsEdit;
