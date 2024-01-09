import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Button from "../Buttons";
import Link from "next/link";
import { fetchCurrentUser, fetchSingleDTVJob } from "@/hooks/useFetch";

interface ISingleJobDetails {
  id: string | string[] | undefined;
}
function SingleJobDetails({ id }: ISingleJobDetails) {
  // const [dtvSingleJobData, setGetData] = useState<string[] | any>([]);
  const [isJobComplete, setIsJobsComplete] = useState(false);
  const [jobComment, setJobComment] = useState("");
  const [updatedByWho, setUpdatedByWho] = useState("");

  const router = useRouter();
  const { userData } = fetchCurrentUser();
  const dateUpdated = new Date();
  const { dtvSingleJobData } = fetchSingleDTVJob(id);
  // console.log("dtvSingleJobData", dtvSingleJobData);
  useEffect(() => {
    setUpdatedByWho(userData);
  }, [userData]);

  const getTicketIdForThisJob = dtvSingleJobData[0]?.ticket_number_id;
  let displayMappedParts = dtvSingleJobData[0]?.parts_list?.map((x: any) => x);

  async function postRepairShprComment(
    url = `https://allelectronics.repairshopr.com/api/v1/tickets/${getTicketIdForThisJob}/comment`
  ) {
    const options = {
      subject: "This is a subject",
      tech: updatedByWho,
      body: jobComment,
      hidden: false,
      do_not_email: true,
    };

    await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "default",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
      },
      body: JSON.stringify(options),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("data", data);
      })
      .catch((e) => console.log("repair comment error", e));
  }

  const deleteTask = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_DTV}task/delete/` + id,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        window.alert("Job failed, try again");
      } else {
        window.alert("You've added a job to the table.");

        router.push("/department/dtv/");
      }
    } catch (error) {}
  };
  const updateTask = async () => {
    const putThisInfo = {
      isJobComplete,
      jobComment,
      updatedByWho,
      dateUpdated,
    };

    const putMethod = {
      method: "PUT", // Method itself
      headers: {
        "Content-type": "application/json; charset=UTF-8", // Indicates the content
      },
      body: JSON.stringify(putThisInfo), // We send data in JSON format
    };
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_DTV}task/update/` + id,
        putMethod
      );
      if (!response.ok) {
        window.alert("Please try again");
      } else {
        postRepairShprComment();
        await response.json();
        window.alert("Job updated");
        router.push("/department/dtv/");
      }
    } catch (e) {}
  };
  return (
    <>
      <section>
        {/* <span className="flex items-center justify-between">
          <span />
          <Button
            type="button"
            onClick={deleteTask}
            className="bg-red-500  font-semibold text-white hover:bg-red-600 focus:ring-1 focus:outline-none focus:ring-red-300 rounded-sm text-sm px-5 py-2.5 text-center remove-btn"
            text="Delete task"
          />
        </span> */}
        {dtvSingleJobData.map((item: any) => (
          <div key={item.id}>
            <div>
              <div className="flex flex-row justify-between border-b border-b-slate-200 p-2">
                <div>
                  <h2 className="font-semibold text-slate-800">Engineer</h2>
                  <p>{item.engineer}</p>
                  <p>{item.engineer_phone_number}</p>
                </div>
                <div>
                  <button>Call</button>
                </div>
              </div>
              <div className="border-b border-b-slate-300 p-2">
                <h2 className="font-semibold text-slate-800">Job info</h2>
                <p>
                  Service order: <span>{item.service_order_no}</span>
                </p>
                <p>
                  Ticket: <span>{item.ticket}</span>
                </p>
                <p>
                  Serial number: <span>{item.serial_number}</span>
                </p>
                <p>
                  Model: <span>{item.model}</span>
                </p>
                <p>
                  IMEI: <span>{item.imei}</span>
                </p>
                <p>
                  Warranty: <span>{item.warranty}</span>
                </p>
                <p>
                  Warranty type: <span>{item.warranty_repair_type}</span>
                </p>
                <p>
                  Remark: <span>{item.remark}</span>
                </p>
                <p>
                  Fault: <span>{item.fault}</span>
                </p>
                <p className="text-slate-800 font-semibold">Parts taken:</p>
                {displayMappedParts &&
                  displayMappedParts.map((i: any, index: number) => (
                    <p key={index} className="text-slate-700 font-medium">
                      {index + 1 + "). "}
                      {i}
                    </p>
                  ))}
              </div>
              <div className="border-b border-b-slate-300 p-2">
                <h2 className="text-slate-800 font-semibold">
                  Customer details
                </h2>
                <p>
                  {item.customer_first_name} {item.customer_last_name}
                </p>
                <span className="flex items-center gap-3">
                  {" "}
                  <Link
                    className="font-semibold text-sky-500"
                    href={`tel:+${item.customer_mobilephone}`}
                  >
                    {item.customer_mobilephone}
                  </Link>
                  <p className="font-normal text-slate-800">-</p>
                  <Link
                    className="font-semibold text-sky-500"
                    href={`tel:+${item.customer_homephone}`}
                  >
                    {item.customer_homephone}
                  </Link>
                </span>
                <p>
                  Address:
                  <span>
                    {" "}
                    {item.customer_street_address}{" "}
                    {item.customer_street_address_two}
                  </span>
                </p>
                <p>
                  {item.customer_city} {item.customer_province}
                </p>
              </div>
            </div>
          </div>
        ))}
        {dtvSingleJobData.length > 0 ? (
          <>
            <span className="flex flex-row-reverse items-center justify-between py-3 mb-3">
              <input
                type="checkbox"
                id="isJobComplete"
                name="isJobComplete"
                className="cursor-pointer accent-sky-700"
                checked={isJobComplete}
                onChange={() => setIsJobsComplete((state) => !state)}
                aria-required
                required
              />
              <label
                htmlFor="isJobComplete"
                className="cursor-pointer text-sm font-medium text-gray-900"
              >
                Is job complete?
              </label>
            </span>
            <span>
              <label
                htmlFor="jobComment"
                className="block mb-2 text-sm font-medium  text-gray-900"
              >
                Private note
              </label>
              <textarea
                name="jobComment"
                id="jobComment"
                className="mb-2 bg-white border resize-none border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full outline-0 p-2.5 "
                value={jobComment}
                onChange={(event) => setJobComment(event.target.value)}
              ></textarea>
            </span>
            <div className="flex g-3 justify-between items-center">
              <Button
                onClick={updateTask}
                type="submit"
                text="Update data"
                className="bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus: text-white font-semibold  rounded py-3 px-2 my-2 w-full"
              />
              {/* <button
            type="submit"
            className="bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus: text-white font-semibold  rounded py-3 px-2 my-2 w-full"
          >
            Add
          </button> */}
            </div>
          </>
        ) : (
          ""
        )}
      </section>
    </>
  );
}

export default SingleJobDetails;
