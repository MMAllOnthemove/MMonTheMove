// External imports
import {
  fetchCurrentUser,
  fetchIPAASSoInfolIST,
} from "@/hooks/useFetch";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import { datetimestamp } from "../../../utils/datemin";
import moment from "moment";
// Dynamic imports
const Navbar = dynamic(() => import("@/components/Navbar"));
import { AreaChart, Card, List, ListItem } from '@tremor/react';


function Dashboard() {
  const { userData } = fetchCurrentUser();
  const [dateFrom, setDateFrom] = useState('')
  const [department, setDepartment] = useState("")
  // const [filteredData, setFilteredData] = useState<string | any>([]);
  const [OverallInWarrantyData, setOverallInWarrantyData] = useState<string | any>([]);

  let momentFormattedDate = moment(dateFrom).format("YYYYMMDD")

  const { findAllJobsGSPN } = fetchIPAASSoInfolIST(momentFormattedDate);

  // Get today's date
  const today = new Date();

  // Calculate the minimum date (3 months back)
  const minDate = new Date(today);
  minDate.setMonth(today.getMonth() - 3);

  // Format the dates to 'YYYY-MM-DD'
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };



  const filteredData = useMemo(() => {
    return findAllJobsGSPN?.filter(item => {
      const matchesDepartment = department?.length > 0 && department === item.SvcProduct;
      const matchesDate = momentFormattedDate && item.ReqDate === momentFormattedDate;
      if (department) return matchesDepartment;
      if (matchesDate) return matchesDate;
      if (department.length > 0 && momentFormattedDate) return matchesDepartment && matchesDate;
    });
  }, [department, momentFormattedDate, findAllJobsGSPN]);
  return (
    <>
      <Head>
        <title>HHP Dashboard</title>
        <meta name="robots" content="noindex, nofollow"></meta>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="space-between-navbar-and-content">
        <div className="container mx-auto ">
          <h1>Coming soon</h1>
          <span>
            <label htmlFor="dateFrom" className="sr-only">
              Date from
            </label>
            <input
              type="date"
              name="dateFrom"
              min={formatDate(minDate)}
              max={formatDate(today)}
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="mb-2 cursor-pointer bg-white dark:bg-[#22303C] dark:text-[#eee] dark:accent-[#eee] border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              id="dateFrom"
            />
          </span>
          <span>
            <label
              htmlFor="engineerFilter"
              className="block mb-2 text-sm font-medium  text-gray-900 dark:text-[#eee] sr-only"
            >
              department filter
            </label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              id="department"
              className="mb-2 bg-white border cursor-pointer border-gray-300 outline-0 dark:bg-[#22303C] dark:text-[#eee] text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option disabled value="">
                Filter by department
              </option>

              <option value={`HHP`}>
                HHP
              </option>
            </select>
          </span>
          {/* {filteredData?.map((x) => (
            <p key={x?.SvcOrderNo}>{x?.SvcOrderNo} - {x?.SvcProduct} -  {x?.EngineerName}</p>
          ))} */}

        </div>
      </main>
    </>
  );
}


export default Dashboard;
