import React, { useState, useEffect } from "react";
// Next auth session hook
import { useSession } from "next-auth/react";
function Tests() {
  // Google auth session
  const { data: session } = useSession();
  let day;
  switch (new Date().getDay()) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
  }

  const [getData, setGetData] = useState("");
  const [searchTicket, setSearchTicket] = useState("");

  const [service_order, setServiceOrder] = useState("");
  const [warranty, setWarranty] = useState("");
  const [model, setModel] = useState("");
  const [imei, setImei] = useState("");
  const [fault, setFault] = useState("");
  const [serial_number, setSerialNumber] = useState("");
  const [engineer, setEngineer] = useState("");
  const [engineerAnalysis, setEngineerAnalysis] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [createdTime, setCreatedTime] = useState("");
  const [engineerAssignDate, setEngineerAssignDate] = useState("");
  const [engineerAssignTime, setEngineerAssignTime] = useState("");
  const [inHouseStatus, setInHouseStatus] = useState("");
  const [ticket, setTicket] = useState("");
  const [department, setDepartment] = useState("");

  async function getRepairShoprData() {
    const response = await fetch(
      `https://allelectronics.repairshopr.com/api/v1/tickets?number=${searchTicket}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
        },
      }
    );
    const data = await response.json();
    setGetData(data);
    // console.log(data.tickets[0].created_at);
    setCreatedDate(data.tickets[0].created_at);
    // setServiceOrder();
    // setWarranty();
  }

  useEffect(() => {
    getRepairShoprData();
  }, []);
  useEffect(() => {
    postTicketData();
  }, [searchTicket]);

  const user = session?.user?.email;

  async function postTicketData() {
    const response = await fetch("", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
        engineerAssignDate,
        engineerAssignTime,
        engineerAnalysis,
        ticket,
        department,
        user,
      }),
    });
  }
  return (
    <div className="container mx-auto">
      <h1>Tests</h1>
      <input
        type="text"
        name="searchTicket"
        id="searchTicket"
        className="border py-2 px-1 rounded-sm"
        value={searchTicket}
        onChange={(e) => setSearchTicket(e.target.value)}
      />
      {/* {day !== "Friday" || "Saturday" || "Sunday" ? (
        <section className="relative overflow-x shadow-md rounded-lg my-5">
          <table className="w-full text-sm text-left text-gray-500 font-medium dark:text-gray-400 table-auto">
            <thead className="text-xs text-white uppercase bg-[#075985] dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Service Order
                </th>
                <th scope="col" className="px-6 py-3">
                  Booking
                </th>
                <th scope="col" className="px-6 py-3">
                  Model
                </th>
                <th scope="col" className="px-6 py-3">
                  Warranty
                </th>

                <th scope="col" className="px-6 py-3">
                  Technician
                </th>
                <th scope="col" className="px-6 py-3">
                  Fault
                </th>
                <th scope="col" className="px-6 py-3">
                  IMEI
                </th>
                <th scope="col" className="px-6 py-3">
                  Serial Number
                </th>
                <th scope="col" className="px-6 py-3">
                  In house status
                </th>
                <th scope="col" className="px-6 py-3">
                  Quality Control
                </th>
                <th scope="col" className="px-6 py-3">
                  Assessment Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Engineer Analysis
                </th>
                <th scope="col" className="px-6 py-3">
                  Ticket number
                </th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </section>
      ) : (
        ""
      )} */}
      <button type="button" className="border" onClick={postTicketData}>
        Add
      </button>
    </div>
  );
}

export default Tests;
