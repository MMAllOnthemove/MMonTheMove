// External imports
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

// Custom imports
import { getSOStatusDescLatest } from "@/functions/ipass_api";
import UnitFinder from "@/pages/api/UnitFinder";
import { getProfile } from "@/functions/getLoggedInUserProfile";
import { unitStatus } from "../../../../../public/_data/statuses";
import { fetchCurrentUser, fetchTableDataHistory } from "@/hooks/useFetch";
import { getRepairTicketId } from "@/functions/repair_api";
import axios from "axios";

// Dynamic imports
const Button = dynamic(() => import("@/components/Buttons"));
const Container = dynamic(() => import("@/components/Container"));
const NotLoggedIn = dynamic(() => import("@/components/NotLoggedIn"));

function EditRow() {
  const { userData } = fetchCurrentUser();
  let user = userData?.email;
  const router = useRouter();
  const { id } = router.query;
  const [showServiceOrderNumber, setShowServiceOrderNumber] = useState("");
  const [ticketId, setTicketId] = useState("");

  // These are the ones use has to update
  const [inHouseStatus, setInHouseStatus] = useState("");
  const [engineerAnalysis, setEngineerAnalysis] = useState("");
  const [engineer, setEngineer] = useState("");
  const [reassignEngineer, setReassignEngineer] = useState("");
  const [service_order, setServiceOrder] = useState("");
  const [GSPNStatus, setGSPNStatus] = useState<string | number | any>("");
  const [serial_number, setSerialNumber] = useState("");
  // We want to get the Status Desc from the last object element of this array
  let GSPNStatusGetLastElement = JSON.stringify(GSPNStatus?.slice(-1));
  const [ticket, setTicket] = useState("");
  // QC CHECKED RADIO
  const [isQCchecked, setIsQCchecked] = useState(false);
  const [QCcomments, setQCcomments] = useState("");
  const [model, setModel] = useState("");
  const [warranty, setWarranty] = useState("");
  const [fault, setFault] = useState("");
  const [imei, setImei] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [createdTime, setCreatedTime] = useState("");
  const [engineerAssignDate, setEngineerAssignDate] = useState("");
  const [engineerAssignTime, setEngineerAssignTime] = useState("");
  const [department, setDepartment] = useState("");
  const [dateAdded, setDateAdded] = useState("");
  const [partsList, setPartsList] = useState<string[] | any[]>([
    { partNumber: "" },
  ]);
  useEffect(() => {
    getRepairTicketId({ ticket, setTicketId });
  }, [ticket]);

  // This is the parts list arr mapped from the partslist
  let partsArr = [...partsList].map((x) => x.partNumber.toUpperCase());

  const getThis = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_API}/api/v1/hhp/jobs/` + id)
      setShowServiceOrderNumber(data[0]?.service_order_no);
      setServiceOrder(data[0]?.service_order_no);
      setCreatedDate(data[0]?.created_date);
      setCreatedTime(data[0]?.created_time);
      setModel(data[0]?.model);
      setWarranty(data[0]?.warranty);
      setInHouseStatus(data[0]?.in_house_status);
      setImei(data[0]?.imei);
      setSerialNumber(data[0]?.serial_number);
      setEngineerAnalysis(data[0]?.engineer_analysis);
      setFault(data[0]?.fault);
      setEngineer(data[0]?.engineer);
      setEngineerAssignDate(data[0]?.engineer_assign_date);
      setEngineerAssignTime(data[0]?.engineer_assign_time);
      setTicket(data[0]?.ticket);
      setQCcomments(data[0]?.qc_comment);
      setDepartment(data[0]?.department);
      setDateAdded(data[0]?.date_added);
    } catch (error) {
      // 
    }

  }

  useEffect(() => {
    getThis();
    getSOStatusDescLatest({
      showServiceOrderNumber,
      setGSPNStatus,
    });
  }, [showServiceOrderNumber]);

  const handleQCisCheckedChange = () => {
    // Test this
    setIsQCchecked(true);
  };

  let dateModified = new Date();

  const updateData = async (e: any) => {
    e.preventDefault();
    router.push("/");
    toast.success("Successfully edited!");
    dateAdded;
    const putThisInfo = {
      engineerAnalysis,
      inHouseStatus,
      ticket,
      reassignEngineer,
      isQCchecked,
      QCcomments,
      partsArr,
      id,
      user,
      GSPNStatusGetLastElement,
      dateModified,
      warranty,
    };

    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_API}/api/v1/hhp/jobs/` + id, putThisInfo);

    } catch (error) {
      console.log("update hhp job error", error)
    }

    sendRepairShoprComment();
    const postThisInfo = {
      service_order,
      createdDate,
      createdTime,
      model,
      warranty,
      engineer,
      fault,
      imei,
      serial_number,
      inHouseStatus,
      ticket,
      engineerAnalysis,
      department,
      dateModified,
      user,
      QCcomments,
      isQCchecked,
      partsArr,
      GSPNStatusGetLastElement,
      dateAdded,
    };
    try {
      const response2 = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_API}/api/v1/hhp/jobs/history`, postThisInfo);

    } catch (error) {
      // 
    }

  };

  const sendRepairShoprComment = async () => {
    const postThisInfo = {
      subject: "This is a subject",
      tech: userData?.full_name,
      body: engineerAnalysis,
      hidden: false,
      do_not_email: true,
    };
    try {
      const response = await axios.post(`https://allelectronics.repairshopr.com/api/v1/tickets/${ticket}/comment`, postThisInfo, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN,
        }
      });

    } catch (error) {
      // 
    }

  };

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

 
  return (
    <>
      <Head>
        <title>Edit HHP {showServiceOrderNumber}</title>
        <meta name="robots" content="noindex, nofollow"></meta>
      </Head>
      <main>
        <Container>
          {!userData ? (
            <NotLoggedIn />
          ) : (
            <section className="section">
              <span className="flex items-center justify-between">
                <Button
                  type="button"
                  onClick={() => history.back()}
                  className="bg-[#082f49]   font-semibold text-white dark:text-[#eee] hover:bg-blue-800 rounded-sm text-sm p-2.5 text-center"
                  text="Back"
                />

                <div>
                  <h1 className="text-center py-2 text-gray-900 dark:text-[#eee] font-semibold lg:text-2xl">
                    Editing service order:{" "}
                    {showServiceOrderNumber === "" ||
                      showServiceOrderNumber === null ? (
                      <span className="text-slate-700  font-bold">
                        Not available
                      </span>
                    ) : (
                      <span className="text-sky-700  font-bold">
                        {showServiceOrderNumber}
                      </span>
                    )}
                  </h1>
                  <h3 className="text-center dark:text-[#eee] font-semibold">
                    You are editing as:{" "}
                    <span className="text-sky-700  font-bold">{userData?.email}</span>
                  </h3>
                </div>
                <div />
              </span>
              <hr />

              <form className="my-3" onSubmit={updateData} id="updateJobForm">
                {showServiceOrderNumber === "" ||
                  showServiceOrderNumber === null ? (
                  <span>
                    <label
                      htmlFor="showServiceOrderNumber"
                      className="block mb-2 text-sm font-medium  text-gray-900 dark:text-[#eee]"
                    >
                      Set Service Order No
                    </label>
                    <input
                      type="text"
                      name="showServiceOrderNumber"
                      id="showServiceOrderNumber"
                      className="mb-2 bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      value={showServiceOrderNumber}
                      onChange={(e) =>
                        setShowServiceOrderNumber(e.target.value)
                      }
                    />
                  </span>
                ) : (
                  <span>
                    <label
                      htmlFor="showServiceOrderNumber"
                      className="block mb-2 text-sm font-medium  text-gray-900 dark:text-[#eee]"
                    >
                      Service Order No
                    </label>
                    <input
                      type="text"
                      name="showServiceOrderNumber"
                      id="showServiceOrderNumber"
                      className="mb-2 bg-gray-50 dark:bg-[#22303C] dark:text-[#eee]  border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      value={showServiceOrderNumber}
                      disabled
                    />
                  </span>
                )}
                <span>
                  <label
                    htmlFor="ticket"
                    className="block mb-2 text-sm font-medium  text-gray-900 dark:text-[#eee]"
                  >
                    Ticket number
                  </label>
                  <input
                    type="text"
                    name="ticket"
                    id="ticket"
                    value={ticket}
                    onChange={(e) => setTicket(e.target.value)}
                    className="mb-2 bg-white dark:bg-[#22303C] dark:text-[#eee]  border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                </span>
                <span>
                  <label
                    htmlFor="warranty"
                    className="block mb-2 text-sm font-medium  text-gray-900 dark:text-[#eee]"
                  >
                    Void warranty{" "}
                    <small className=" font-semibold text-red-600 dark:text-red-400">
                      Please do not select this unless authorized!
                    </small>
                  </label>
                  <select
                    name="warranty"
                    id="warranty"
                    className="my-2 cursor-pointer bg-white dark:bg-[#22303C] dark:text-[#eee]  outline-none border border-gray-300 outline-0 text-gray-900  font-semibold text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={warranty}
                    onChange={(e) => setWarranty(e.target.value)}
                  >
                    <option value="" disabled>
                      Warranty void
                    </option>
                    <option value="LP">LP</option>
                    <option value="OW">OW</option>
                  </select>
                </span>
                <span>
                  <label
                    htmlFor="engineer"
                    className="block mb-2 text-sm font-medium  text-gray-900 dark:text-[#eee]"
                  >
                    Engineer
                  </label>
                  <input
                    type="text"
                    name="engineer"
                    id="engineer"
                    className="mb-2 bg-gray-50 dark:bg-[#22303C] dark:text-[#eee]  border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    defaultValue={engineer}
                    disabled
                  />
                </span>

                <span>
                  <label
                    htmlFor="engineerAnalysis"
                    className="block mb-2 text-sm font-medium  text-gray-900 dark:text-[#eee]"
                  >
                    Engineer Analysis
                  </label>
                  <textarea
                    name="engineerAnalysis"
                    id="engineerAnalysis"
                    className="mb-2 bg-white dark:bg-[#22303C] dark:text-[#eee]  border resize-none border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full outline-0 p-2.5 "
                    value={engineerAnalysis || ""}
                    onChange={(event) =>
                      setEngineerAnalysis(event.target.value)
                    }
                  ></textarea>
                </span>
                <span>
                  <label
                    htmlFor="partNumber"
                    className="block mb-2 text-sm font-medium  text-gray-900 dark:text-[#eee]"
                  >
                    Parts you are ordering. <small>Max = 10</small>
                    <br />
                    <small>e.g. LED - GHS7-0000..</small>
                  </label>
                  {partsList.map((singleService, index) => (
                    <div key={index} className="services">
                      <div className="first-division flex justify-space-between items-center gap-2">
                        <input
                          className="my-2 border w-auto border-gray-300 outline-0 text-gray-900 dark:bg-[#22303C] dark:text-[#eee] text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                          name="partNumber"
                          type="text"
                          id="partNumber"
                          placeholder="Part number"
                          defaultValue={singleService?.partNumber.toUpperCase()}
                          onChange={(e) => handleServiceChange(e, index)}
                          maxLength={10}
                          minLength={7}
                        />
                        {partsList.length - 1 === index &&
                          partsList.length < 10 && (
                            <Button
                              className="my-2 bg-[#082f49]   font-semibold text-white dark:text-[#eee] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-sm text-sm p-2.5 text-center"
                              type="button"
                              onClick={handleServiceAdd}
                              text="Add a part"
                            />
                          )}
                      </div>
                      <div className="second-division">
                        {partsList.length !== 1 && (
                          <Button
                            type="button"
                            onClick={() => handleServiceRemove(index)}
                            className="bg-red-500  font-semibold text-white hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-sm text-sm px-5 py-2.5 text-center remove-btn"
                            text="Remove"
                          />
                          // <button
                          //   type="button"
                          //   onClick={() => handleServiceRemove(index)}
                          //   className="bg-red-500  font-semibold text-white hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-sm text-sm px-5 py-2.5 text-center remove-btn"
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
                    className="block mb-2 text-sm font-medium  text-gray-900 dark:text-[#eee]"
                  >
                    In house status
                  </label>
                  <select
                    value={inHouseStatus}
                    onChange={(e) => setInHouseStatus(e.target.value)}
                    id="inHouseStatus"
                    className="mb-2 bg-white dark:bg-[#22303C] dark:text-[#eee] cursor-pointer border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  >
                    <option disabled value="">
                      Choose status
                    </option>
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
                      className="cursor-pointer mb-2 text-sm font-medium  text-gray-900 dark:text-[#eee]"
                    >
                      QC checked? (Only QC engineer can select this)
                    </label>
                  </span>
                  <span>
                    <label
                      htmlFor="QCcomments"
                      className="block mb-2 text-sm font-medium  text-gray-900 dark:text-[#eee]"
                    >
                      QC comments (Only QC engineer can input here)
                    </label>
                    <textarea
                      name="QCcomments"
                      id="QCcomments"
                      value={QCcomments || ""}
                      onChange={(e) => setQCcomments(e.target.value)}
                      className="mb-2 bg-white dark:bg-[#22303C] dark:text-[#030303] border resize-none border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full outline-0 p-2.5"
                    ></textarea>
                  </span>
                </>

                <span>
                  <Button
                    type="submit"
                    className="bg-[#082f49] w-full  font-semibold text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-sm text-sm px-5 py-2.5 text-cente my-3"
                    text="Update"
                  />
                </span>
              </form>
              <hr />
     
            </section>
          )}
        </Container>
      </main>
    </>
  );
}

export default EditRow;
