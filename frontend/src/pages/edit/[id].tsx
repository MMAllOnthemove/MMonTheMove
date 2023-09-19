import UnitFinder from "@/pages/api/UnitFinder";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import { unitStatus } from "../../../public/_data/statuses";
import Button from "../../../components/Buttons";
import { getSOStatusDescLatest } from "@/functions/ipass_api";

import Head from "next/head";

function EditRow() {
  // These are already handled in the table but for user experience
  // We just show them and make their inputs disabled
  const [showServiceOrderNumber, setShowServiceOrderNumber] = useState("");

  // Allow user to select only today's date
  var today = new Date().toISOString().split("T")[0];
  // These are the ones use has to update
  const [inHouseStatus, setInHouseStatus] = useState("");
  const [engineerAnalysis, setEngineerAnalysis] = useState("");
  const [engineer, setEngineer] = useState("");
  const [reassignEngineer, setReassignEngineer] = useState("");

  // Not to be confused with 'setServiceOrder'
  const [searchServiceOrder, setSearchServiceOrder] = useState("");
  const [GSPNStatus, setGSPNStatus] = useState<string | number | any>("");
  // We want to get the Status Desc from the last object element of this array
  let GSPNStatusGetLastElement = JSON.stringify(GSPNStatus?.slice(-1));

  const [ticket, setTicket] = useState("");
  const [hasValue, setHasValue] = useState(false);

  const [partsPendingDate, setPartsPendingDate] = useState("");
  const [partsOrderedDate, setPartsOrderedDate] = useState("");
  const [partsIssuedDate, setPartsIssuedDate] = useState("");
  const [qcCompletedDate, setQCCompletedDate] = useState("");
  const [repairCompletedDate, setRepairCompletedDate] = useState("");

  // QC CHECKED RADIO
  const [isQCchecked, setIsQCchecked] = useState(false);

  const handleQCisCheckedChange = () => {
    setIsQCchecked(!isQCchecked);
  };
  const [QCcomments, setQCcomments] = useState("");
  const [user, setUser] = useState("");
  // Add and remove fields via button
  const [partsList, setPartsList] = useState<string[] | any[]>([
    { partNumber: "" },
  ]);

  // This is the parts list arr mapped from the partslist
  let partsArr = [...partsList].map((x) => x.partNumber);

  const router = useRouter();
  const { id } = router.query;
  const toast = useToast();

  useEffect(() => {
    getThis();
  }, []);

  const getThis = useCallback(async () => {
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL_MANAGEMENT}/` + id)
      .then((res) => res.json())
      .then((data) => {
        setShowServiceOrderNumber(data[0]?.service_order_no);
        setInHouseStatus(data[0]?.in_house_status);
        setEngineerAnalysis(data[0]?.engineer_analysis);
        setEngineer(data[0]?.engineer);
        setTicket(data[0]?.ticket);
        setUser(data[0]?.job_added_by);
        setQCcomments(data[0]?.qc_comment);
        setPartsPendingDate(data[0]?.parts_pending_date);
        setPartsOrderedDate(data[0]?.parts_ordered_date);
        setPartsIssuedDate(data[0]?.parts_issued_date);
        setQCCompletedDate(data[0]?.qc_completed_date);
        setRepairCompletedDate(data[0]?.repair_completed_date);
      });
  }, []);

  useEffect(() => {
    getSOStatusDescLatest({
      showServiceOrderNumber,
      setGSPNStatus,
    });
  }, [showServiceOrderNumber]);
  // console.log(status);

  async function updateData(e: any) {
    e.preventDefault();

    router.push("/");
    toast({
      title: "Job edited.",
      description: "You've successfully edited the job.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });

    const putThisInfo = {
      engineerAnalysis,
      inHouseStatus,
      partsPendingDate,
      partsOrderedDate,
      partsIssuedDate,
      qcCompletedDate,
      repairCompletedDate,
      ticket,
      reassignEngineer,
      isQCchecked,
      QCcomments,
      partsArr,
      id,
      user,
      GSPNStatusGetLastElement,
    };
    // console.log(putThisInfo);
    const putMethod = {
      method: "PUT", // Method itself
      headers: {
        "Content-type": "application/json; charset=UTF-8", // Indicates the content
      },
      body: JSON.stringify(putThisInfo), // We send data in JSON format
    };
    await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL_MANAGEMENT}/` + id,
      putMethod
    )
      .then((res) => res.json())
      .then((data) => {
        //
      })
      .catch((e) => {
        //
      });
  }

  async function deleteData() {
    router.push("/");
    toast({
      title: "Job deleted.",
      description: "You've successfully deleted the job.",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
    const response = await UnitFinder.delete(`/${id}`);
  }

  const handleServiceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: string | number | any
  ) => {
    const { name, value } = e.target;
    const list = [...partsList];
    list[index][name] = value;
    setPartsList(list);
  };

  const handleServiceRemove = (index: string | number | any) => {
    const list = [...partsList];
    list.splice(index, 1);
    setPartsList(list);
  };

  const handleServiceAdd = () => {
    setPartsList([...partsList, { partNumber: "" }]);
  };

  // console.log(partsList);

  return (
    <>
      <Head>
        <title>Edit {showServiceOrderNumber}</title>
        <meta name="robots" content="noindex, nofollow"></meta>
      </Head>
      <main>
        <section className="section container mx-auto">
          <h1 className="text-center py-2 text-gray-900 font-sans font-semibold lg:text-2xl">
            Editing service order:{" "}
            {showServiceOrderNumber === "" ||
            showServiceOrderNumber === null ? (
              <span className="text-slate-700 font-sans font-bold">
                Not available
              </span>
            ) : (
              <span className="text-sky-700 font-sans font-bold">
                {showServiceOrderNumber}
              </span>
            )}
          </h1>
          <h3 className="text-center font-sans font-semibold">
            You are editing as:{" "}
            <span className="text-sky-700 font-sans font-bold">{user}</span>
          </h3>
          <hr />

          {/* {user === "katleho_m@allelectronics.co.za" ? <p>Admin</p> : ""} */}
          <form className="my-3" onSubmit={updateData} id="updateJobForm">
            {showServiceOrderNumber === "" ||
            showServiceOrderNumber === null ? (
              <span>
                <label
                  htmlFor="showServiceOrderNumber"
                  className="block mb-2 text-sm font-medium font-sans text-gray-900 "
                >
                  Set Service Order No
                </label>
                <input
                  type="text"
                  name="showServiceOrderNumber"
                  id="showServiceOrderNumber"
                  className="mb-2 bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  value={showServiceOrderNumber}
                  onChange={(e) => setShowServiceOrderNumber(e.target.value)}
                />
              </span>
            ) : (
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
                  value={showServiceOrderNumber}
                  disabled
                />
              </span>
            )}
            <span>
              <label
                htmlFor="ticket"
                className="block mb-2 text-sm font-medium font-sans text-gray-900"
              >
                Ticket number
              </label>
              <input
                type="text"
                name="ticket"
                id="ticket"
                value={ticket}
                onChange={(e) => setTicket(e.target.value)}
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
            {/* {user === process.env.NEXT_PUBLIC_ADMIN_EMAIL ? (
                <span>
                  <label htmlFor="reassignEngineer" className="sr-only">
                    Ressign to another engineer
                  </label>
                  <select
                    name="reassignEngineer"
                    id="reassignEngineer"
                    className="mb-2 bg-white outline-none border border-gray-300 outline-0 text-gray-900 font-sans font-semibold text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={reassignEngineer}
                    onChange={(e) => setReassignEngineer(e.target.value)}
                  >
                    <option value="" disabled>
                      Ressign to another engineer
                    </option>
                    <option value="Acklas Sakala">Acklas Sakala</option>
                    <option value="Manuel Kaba">Manuel Kaba</option>
                    <option value="Olivier Munguakolwa">
                      Olivier Munguakolwa
                    </option>
                    <option value="Paulas Gambu">Paulas Gambu</option>
                    <option value="Pule Mokoena">Pule Mokoena</option>
                    <option value="Sizwe Phungwayo">Sizwe Phungwayo</option>
                  </select>
                </span>
              ) : (
                ""
              )} */}
            <span>
              <label
                htmlFor="engineerAnalysis"
                className="block mb-2 text-sm font-medium font-sans text-gray-900 "
              >
                Engineer Analysis
              </label>
              <textarea
                name="engineerAnalysis"
                id="engineerAnalysis"
                className="mb-2 bg-white border resize-none border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full outline-0 p-2.5 "
                value={engineerAnalysis}
                onChange={(event) => setEngineerAnalysis(event.target.value)}
              ></textarea>
            </span>
            <span>
              <label
                htmlFor="partNumber"
                className="block mb-2 text-sm font-medium font-sans text-gray-900 "
              >
                Parts you are ordering. <small>Max = 10</small>
                <br />
                <small>e.g. LED - GHS7-0000..</small>
              </label>
              {partsList.map((singleService, index) => (
                <div key={index} className="services">
                  <div className="first-division flex justify-space-between items-center gap-2">
                    <input
                      className="my-2 border w-auto border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                      name="partNumber"
                      type="text"
                      id="partNumber"
                      defaultValue={singleService?.partNumber.toUpperCase()}
                      onChange={(e) => handleServiceChange(e, index)}
                      maxLength={10}
                      minLength={7}
                    />
                    {partsList.length - 1 === index &&
                      partsList.length < 10 && (
                        <Button
                          className="my-2 bg-[#082f49]  font-sans font-semibold text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-sm text-sm p-2.5 text-center"
                          type="button"
                          onClick={handleServiceAdd}
                          text="Add a part"
                        />
                        // <button
                        //   className="my-2 bg-[#082f49]  font-sans font-semibold text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-sm text-sm p-2.5 text-center"
                        //   type="button"
                        //   onClick={handleServiceAdd}
                        // >
                        //   Add a part
                        // </button>
                      )}
                  </div>
                  <div className="second-division">
                    {partsList.length !== 1 && (
                      <Button
                        type="button"
                        onClick={() => handleServiceRemove(index)}
                        className="bg-red-500 font-sans font-semibold text-white hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-sm text-sm px-5 py-2.5 text-center remove-btn"
                        text="Remove"
                      />
                      // <button
                      //   type="button"
                      //   onClick={() => handleServiceRemove(index)}
                      //   className="bg-red-500 font-sans font-semibold text-white hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-sm text-sm px-5 py-2.5 text-center remove-btn"
                      // >
                      //   <span>Remove</span>
                      // </button>
                    )}
                  </div>
                </div>
              ))}
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
                <option value="Booked in">Booked in</option>
                {unitStatus.map((stat) => (
                  <option key={stat.id} value={`${stat._status}`}>
                    {stat?._status}
                  </option>
                ))}
              </select>
            </span>

            <>
              <span>
                <input
                  type="checkbox"
                  id="QcChecked"
                  name="QcChecked"
                  className="mr-2 cursor-pointer accent-sky-700"
                  checked={isQCchecked}
                  onChange={handleQCisCheckedChange}
                />
                <label
                  htmlFor="QcChecked"
                  className="cursor-pointer mb-2 text-sm font-medium font-sans text-gray-900"
                >
                  QC checked? (Only QC engineer can select this)
                </label>
              </span>
              <span>
                <label
                  htmlFor="QCcomments"
                  className="block mb-2 text-sm font-medium font-sans text-gray-900"
                >
                  QC comments (Only QC engineer can input here)
                </label>
                <textarea
                  name="QCcomments"
                  id="QCcomments"
                  value={QCcomments}
                  onChange={(e) => setQCcomments(e.target.value)}
                  className="mb-2 bg-white border resize-none border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full outline-0 p-2.5"
                ></textarea>
              </span>
            </>

            <span>
              <label
                htmlFor="partsPendingDate"
                className="block mb-2 text-sm font-medium font-sans text-gray-900"
              >
                Waiting for parts date
              </label>
              <input
                type="date"
                name="partsPendingDate"
                min={today}
                max={today}
                id="partsPendingDate"
                value={partsPendingDate}
                onChange={(e) => setPartsPendingDate(e.target.value)}
                className="mb-2 bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </span>
            <span>
              <label
                htmlFor="partsOrderedDate"
                className="block mb-2 text-sm font-medium font-sans text-gray-900"
              >
                Parts ordered date
              </label>
              <input
                type="date"
                name="partsOrderedDate"
                min={today}
                max={today}
                value={partsOrderedDate}
                onChange={(e) => setPartsOrderedDate(e.target.value)}
                id="partsOrderedDate"
                className="mb-2 bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </span>
            <span>
              <label
                htmlFor="partsIssuedDate"
                className="block mb-2 text-sm font-medium font-sans text-gray-900"
              >
                Parts issued date
              </label>
              <input
                type="date"
                name="partsIssuedDate"
                min={today}
                max={today}
                value={partsIssuedDate}
                onChange={(e) => setPartsIssuedDate(e.target.value)}
                id="partsIssuedDate"
                className="mb-2 bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </span>
            <span>
              <label
                htmlFor="qcCompletedDate"
                className="block mb-2 text-sm font-medium font-sans text-gray-900"
              >
                QC completed date
              </label>
              <input
                type="date"
                name="qcCompletedDate"
                min={today}
                max={today}
                value={qcCompletedDate}
                onChange={(e) => setQCCompletedDate(e.target.value)}
                id="qcCompletedDate"
                className="mb-2 bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </span>
            <span>
              <label
                htmlFor="repairCompletedDate"
                className="block mb-2 text-sm font-medium font-sans text-gray-900"
              >
                Repair completed date
              </label>
              <input
                type="date"
                name="repairCompletedDate"
                min={today}
                max={today}
                value={repairCompletedDate}
                onChange={(e) => setRepairCompletedDate(e.target.value)}
                id="repairCompletedDate"
                className="mb-2 bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </span>

            <span>
              {/* <button
                type="submit"
                className="bg-[#082f49] w-full font-sans font-semibold text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-sm text-sm px-5 py-2.5 text-cente my-3"
              >
                Update
              </button> */}
              <Button
                type="submit"
                className="bg-[#082f49] w-full font-sans font-semibold text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-sm text-sm px-5 py-2.5 text-cente my-3"
                text="Update"
              />
            </span>
          </form>
          <span>
            {/* <button
              onClick={deleteData}
              type="button"
              className="bg-red-500 w-full font-sans font-semibold text-white hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-sm text-sm px-5 py-2.5 text-center my-3"
            >
              Delete
            </button> */}
            <Button
              type="button"
              className="bg-red-500 w-full font-sans font-semibold text-white hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-sm text-sm px-5 py-2.5 text-center my-3"
              text="Delete"
              onClick={deleteData}
            />
          </span>
        </section>
      </main>
    </>
  );
}

export default EditRow;
