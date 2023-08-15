import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
// Next auth session hook using google auth
import { useSession } from "next-auth/react";
import moment from "moment";
import { Spinner } from "@chakra-ui/react";
import Login from "../auth/login";

function Tests() {
  const [searchTicket, setSearchTicket] = useState("");
  // Google auth session
  const { data: session, status } = useSession();
  const user = session?.user?.email;
  // console.log("user", user);
  // console.log("session", session);
  // Form starts here
  const [repairServiceOrder, setRepairServiceOrder] = useState<
    string | number | undefined
  >("");
  const [repairCreatedDate, setRepairCreatedDate] = useState<
    string | number | undefined
  >("");
  const [repairCreatedTime, setRepairCreatedTime] = useState<
    string | number | undefined
  >("");
  const [repairModel, setRepairModel] = useState<string | number | undefined>(
    ""
  );
  const [repairWarranty, setRepairWarranty] = useState<
    string | number | undefined
  >("");
  const [repairEngineer, setRepairEngineer] = useState<
    string | number | undefined
  >("");
  const [repairFault, setRepairFault] = useState<string | number | undefined>(
    ""
  );
  const [repairImei, setRepairImei] = useState<string | number | undefined>("");
  const [repairSerialNumber, setRepairSerialNumber] = useState<
    string | number | undefined
  >("");
  const [repairInHouseStatus, setRepairInHouseStatus] = useState<
    string | number | undefined
  >("");
  const [repairEngineerAssignDate, setRepairEngineerAssignDate] = useState<
    string | number | undefined
  >("");
  const [repairEngineerAssignTime, setRepairEngineerAssignTime] = useState<
    string | number | undefined
  >("");
  const [repairTicket, setRepairTicket] = useState<string | number | undefined>(
    ""
  );
  const [repairEngineerAnalysis, setRepairEngineerAnalysis] = useState<
    string | number | undefined
  >("");
  // const [repairPartsOrderedDate, setRepairPartsOrderedDate] = useState<
  //   string | number | undefined
  // >("");
  // const [repairPartsPendingDate, setRepairPartsPendingDate] = useState<
  //   string | number | undefined
  // >("");
  // const [repairPartsIssuedDate, setRepairPartsIssuedDate] = useState<
  //   string | number | undefined
  // >("");
  // const [repairQcCompletedDate, setRepairQcCompletedDate] = useState<
  //   string | number | undefined
  // >("");
  // const [repairUnitCompletedDate, setRepairUnitCompletedDate] = useState<
  //   string | number | undefined
  // >("");
  const [repairDepartment, setRepairDepartment] = useState<
    string | number | undefined
  >("");

  const urls = [
    `${process.env.NEXT_PUBLIC_SERVER_API_URL_MANAGEMENT}`,
    `${process.env.NEXT_PUBLIC_SERVER_API_URL_MANAGEMENT}/repair`,
  ];
  const fetchDataCombinedData = async () => {
    try {
      const response = await Promise.all(
        urls.map((url) => fetch(url).then((res) => res.json()))
      );
      console.log(response.flat());
    } catch (error) {
      console.log("Error", error);
    }
  };
  useEffect(() => {
    fetchDataCombinedData();
  }, []);

  useEffect(() => {
    getRepair();
  }, [searchTicket]);

  // useEffect(() => {
  //   fetchData()
  // }, []);

  async function getRepair() {
    await fetch(
      `https://allelectronics.repairshopr.com/api/v1/tickets?number=${searchTicket}`,

      {
        method: "GET",
        mode: "cors",
        cache: "default",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setRepairFault(data?.tickets[0]?.subject);
        setRepairCreatedDate(
          moment(new Date(`${data?.tickets[0]?.created_at}`)).format(
            "YYYY-MM-DD"
          )
        );
        setRepairCreatedTime(
          moment(`${data?.tickets[0]?.created_at}`).format("HH:MM:SS")
        );
        setRepairEngineerAssignDate(
          moment(new Date(`${data?.tickets[0]?.created_at}`)).format(
            "YYYY-MM-DD"
          )
        );
        setRepairEngineerAssignTime(
          moment(`${data?.tickets[0]?.created_at}`).format("HH:MM:SS")
        );
        setRepairImei(data?.tickets[0]?.properties["IMEI"]);
        setRepairServiceOrder(
          data?.tickets[0]?.properties["Service Order No. "]
        );
        setRepairTicket(data?.tickets[0]?.number);
        setRepairEngineerAnalysis("");
        // setRepairPartsOrderedDate("");
        // setRepairPartsPendingDate("");
        // setRepairPartsIssuedDate("");
        // setRepairQcCompletedDate("");
        // setRepairUnitCompletedDate("");
        setRepairDepartment("HHP");
      });
  }

  function postRepairData(e: React.SyntheticEvent) {
    e.preventDefault();
    const postThisInfo = {
      repairServiceOrder,
      repairCreatedDate,
      repairCreatedTime,
      repairModel,
      repairWarranty,
      repairEngineer,
      repairFault,
      repairImei,
      repairSerialNumber,
      repairInHouseStatus,
      repairEngineerAssignDate,
      repairEngineerAssignTime,
      repairEngineerAnalysis,
      repairTicket,
      repairDepartment,
      user,
    };
    // console.log("all", postThisInfo);
    const response = fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL_MANAGEMENT}/repair`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postThisInfo),
      }
    )
      .then((data: any) => {
        if (!data.ok) {
          // console.log(data.status);
        }
        return data.json();
      })
      .then((update) => {
        // console.log(update);
      })
      .catch((e) => console.log("repair post error", e));
    // window.location.reload();
  }

  if (status === "loading") {
    return <Spinner />;
  }
  if (status === "unauthenticated" || !session) {
    return <Login />;
  }
  if (status === "authenticated") {
    return (
      <>
        <Head>
          <title>Tests</title>
          <meta name="robots" content="noindex, nofollow"></meta>
        </Head>
        <main>
          <h3> Repairshpr tests</h3>

          <input
            type="text"
            name="searchTicket"
            id="searchTicket"
            className="border p-2 rounded-sm"
            placeholder="searchTicket"
            value={searchTicket}
            onChange={(e) => setSearchTicket(e.target.value)}
          />
          <p>{searchTicket}</p>
          <form onSubmit={postRepairData}>
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              name="subject"
              id="subject"
              className="border p-2 rounded-sm"
              defaultValue={repairFault}
            />
            <label htmlFor="repairWarranty" className="sr-only">
              Warranty
            </label>
            <select
              name="repairWarranty"
              id="repairWarranty"
              className="cursor-pointer mb-2 bg-white outline-none border border-gray-300 outline-0 text-gray-900 font-sans font-semibold text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              value={repairWarranty || ""}
              onChange={(e) => setRepairWarranty(e.target.value)}
            >
              <option value="" disabled>
                Select warranty
              </option>
              <option value="LP">LP</option>
              <option value="OW">OOW</option>
            </select>
            <label htmlFor="repairImei">IMEI</label>
            <input
              type="text"
              name="repairImei"
              id="repairImei"
              className="border p-2 rounded-sm"
              value={repairImei || ""}
              onChange={(e) => setRepairImei(e.target.value)}
            />
            <label htmlFor="repairSerialNumber">repairSerialNumber</label>
            <input
              type="text"
              name="repairSerialNumber"
              id="repairSerialNumber"
              className="border p-2 rounded-sm"
              value={repairSerialNumber || ""}
              onChange={(e) => setRepairSerialNumber(e.target.value)}
            />
            <label htmlFor="repairModel">repairModel</label>
            <input
              type="text"
              name="repairModel"
              id="repairModel"
              className="border p-2 rounded-sm"
              value={repairModel}
              onChange={(e) => setRepairModel(e.target.value)}
            />
            <select
              value={repairInHouseStatus || ""}
              onChange={(e) => setRepairInHouseStatus(e.target.value)}
              className="cursor-pointer mb-2 bg-white outline-none border border-gray-300 outline-0 text-gray-900 font-sans font-semibold text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option disabled value="">
                Choose status
              </option>
              <option value="Booked in">Booked in</option>
              <option value="Repair in progress">Repair in progress</option>
              <option value="Waiting for parts">Waiting for parts</option>
              <option value="Waiting for customer">Waiting for customer</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Customer reply">Customer reply</option>
              <option value="Assigned to tech">Assigned to tech</option>
              <option value="Parts request 1st approval">
                Parts request 1st approval
              </option>
              <option value="Quote pending">Quote pending</option>
              <option value="Quote approved">Quote approved</option>
              <option value="Quality Control (QC)">Quality Control</option>
              <option value="Parts issued">Parts issued</option>
              <option value="Parts to be ordered">Parts to be ordered</option>
              <option value="Quote pending">Quote pending</option>
              <option value="Waiting for customer">Waiting for customer</option>
              <option value="Waiting SAW">Waiting SAW</option>
              <option value="Repair complete">Repair completed</option>
              <option value="QC failed">QC failed</option>
              <option value="QC completed">QC completed</option>
              <option value="Pending Q&A">Pending Q&A</option>
              <option value="SO cancel">SO cancel</option>
              <option value="Scrap approved">Scrap approved</option>
              <option value="Quote rejected">Quote rejected</option>
              <option value="For invoicing">For invoicing</option>
              <option value="Parts DNA">Parts DNA</option>
            </select>
            <label htmlFor="repairEngineer" className="sr-only">
              Engineer
            </label>
            <select
              name="repairEngineer"
              id="repairEngineer"
              className="cursor-pointer mb-2 bg-white outline-none border border-gray-300 outline-0 text-gray-900 font-sans font-semibold text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              value={repairEngineer || ""}
              onChange={(e) => setRepairEngineer(e.target.value)}
            >
              <option value="" disabled>
                Select engineer
              </option>
              <option value="Acklas Sakala">Acklas Sakala</option>
              <option value="Manuel Kaba">Manuel Kaba</option>
              <option value="Olivier Munguakolwa">Olivier Munguakolwa</option>
              <option value="Paulas Gambu">Paulas Gambu</option>
              <option value="Pule Mokoena">Pule Mokoena</option>
              <option value="Sizwe Phungwayo">Sizwe Phungwayo</option>
            </select>
            <button type="submit">Send Repair</button>
          </form>
        </main>
      </>
    );
  }
}

export default Tests;
