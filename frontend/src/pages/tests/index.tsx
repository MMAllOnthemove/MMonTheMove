import React, { useState, useEffect } from "react";

function Tests() {
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
  async function getRepairShoprData() {
    const response = await fetch(
      `https://allelectronics.repairshopr.com/api/v1/tickets?number=101030`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
        },
      }
    );
    const data = await response.json();
    setGetData(data);
    // console.log(data);
  }

  useEffect(() => {
    getRepairShoprData();
  }, []);
  return (
    <div className="container mx-auto">
      <h1>Tests</h1>

      {day !== "Friday" || "Saturday" || "Sunday" ? (
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
      )}
    </div>
  );
}

export default Tests;
