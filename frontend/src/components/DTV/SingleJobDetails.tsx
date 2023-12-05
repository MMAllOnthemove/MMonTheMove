import React, { useContext, useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { CurrentUserContext } from "../../../context/user";
import Button from "../Buttons";
import Link from "next/link";

interface Props {
  pageId: string | string[] | undefined;
}
function SingleJobDetails({ pageId }: Props) {
  const [getData, setGetData] = useState<string[] | any>([]);
  const [isJobComplete, setIsJobsComplete] = useState(false);
  const [jobComment, setJobComment] = useState("");
  const [updatedByWho, setUpdatedByWho] = useState("");

  //   console.log("getData", getData);
  // Fetches logged in user's data
  const userData = useContext(CurrentUserContext);

  const router = useRouter();

  // Chakra ui toast
  const toast = useToast();
  const dateUpdated = new Date();
  useEffect(() => {
    setUpdatedByWho(userData);
    getThisJobsData();
  });
  async function getThisJobsData() {
    // Reminder to always check:
    // The computer's IP changes based on whether it's connected via LAN or WAN
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DTV}task/get/` + pageId, {
        method: "GET",
        cache: "default",
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          setGetData(data);
          return data;
        });
    } catch (error) {
      //   console.log(error);
    }
  }
  const getTicketIdForThisJob = getData[0]?.ticket_number_id;
  let displayMappedParts = getData[0]?.parts_list?.map((x: any) => x);
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
        `${process.env.NEXT_PUBLIC_BACKEND_DTV}task/delete/` + pageId,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        toast({
          title: "Job failed.",
          description: "Job already exists.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Job added.",
          description: "You've added a job to the table.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
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
        `${process.env.NEXT_PUBLIC_BACKEND_DTV}task/update/` + pageId,
        putMethod
      );
      if (!response.ok) {
        toast({
          title: "Job failed.",
          description: "Job already exists.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } else {
        postRepairShprComment();
        await response.json();
        toast({
          title: "Job added.",
          description: "You've added a job to the table.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        router.push("/department/dtv/");
      }
    } catch (e) {}
  };
  return (
    <>
      <section>
        <span className="flex items-center justify-between">
          <span />
          <Button
            type="button"
            onClick={deleteTask}
            className="bg-red-500  font-semibold text-white hover:bg-red-600 focus:ring-1 focus:outline-none focus:ring-red-300 rounded-sm text-sm px-5 py-2.5 text-center remove-btn"
            text="Delete task"
          />
        </span>
        {getData.map((item: any) => (
          <div key={item.job_id}>
            <div>
              <div className="flex flex-row justify-between borderb border-b-slate-200 p-2">
                <div>
                  <h2>Engineer</h2>
                  <p>{item.engineer}</p>
                  <p>{item.engineer_phone_number}</p>
                </div>
                <div>
                  <button>Call</button>
                </div>
              </div>
              <div className="border-b border-b-slate-300 p-2">
                <h2>Job info</h2>
                <p>Service order: {item.service_order_no}</p>
                <p>Ticket: {item.ticket}</p>
                <p>Serial number: {item.serial_number}</p>
                <p>Model: {item.model}</p>
                <p>IMEI: {item.imei}</p>
                <p>Warranty: {item.warranty}</p>
                <p>Warranty type: {item.warranty_repair_type}</p>
                <p>Remark: {item.remark}</p>
                <p>Fault: {item.fault}</p>
                <p>Parts taken:</p>
                {displayMappedParts &&
                  displayMappedParts.map((i: any, index: number) => (
                    <p key={index}>
                      {index + 1 + "). "}
                      {i}
                    </p>
                  ))}
              </div>
              <div className="border-b border-b-slate-300 p-2">
                <h2>Customer details</h2>
                <p>
                  {item.customer_first_name} {item.customer_last_name}
                </p>

                <button>Call customer</button>
                <p>-</p>
                <Link href={`${item.customer_homephone}`}>
                  <p>{item.customer_homephone}</p>
                </Link>
                <p>
                  {item.customer_street_address}{" "}
                  {item.customer_street_address_two}
                </p>
                <p>
                  {item.customer_city} {item.customer_province}
                </p>
              </div>
            </div>
          </div>
        ))}
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
      </section>
    </>
  );
}

export default SingleJobDetails;
