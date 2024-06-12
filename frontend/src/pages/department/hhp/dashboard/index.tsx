// External imports
import {
  fetchCurrentUser,
} from "@/hooks/useFetch";
import axios from "axios";
import moment from "moment";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { BarChart, Card, DatePicker } from '@tremor/react'
import { service_types } from "../../../../../public/_data/service_types";
import { warranty_types } from "../../../../../public/_data/warranty_types";

// Dynamic imports
const Navbar = dynamic(() => import("@/components/Navbar"));


function Dashboard() {
  const { userData } = fetchCurrentUser();
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("");
  const [svcType, setSVCType] = useState("")
  const [engineer, setEngineer] = useState("")
  const [warranty, setWarranty] = useState("")
  const [apiData, setAPIData] = useState<string[] | any>([])
  const [department, setDepartment] = useState("")

  /* 
 filter by:
 - department -
 - date - 
 - engineer -
 - evrything
 - warranty -
 - statusdesc -
 
  */


  let dateF = moment(dateFrom).format("YYYYMMDD");
  let dateT = moment(dateTo).format("YYYYMMDD");
  // console.log(dateF, dateT)
  // useEffect(() => {
  //   const options = {
  //     "IsCommonHeader": {
  //       "Company": "C720",
  //       "AscCode": "1730640",
  //       "Lang": "EN",
  //       "Country": "ZA",
  //       "Pac": "999999920180502152340"
  //     },
  //     "IsBasicCond": {
  //       "AscCode": "1730640",
  //       "ReqDateFrom": dateF,
  //       "ReqDateTo": dateT
  //     },
  //     "IsAdvCond": {
  //       "SvcType": svcType,
  //       "WtyType": ""
  //     }
  //   };
  //   const GETSOAPI = async () => {
  //     try {
  //       const response = await axios.post("https://eu.ipaas.samsung.com/eu/gcic/GetSOList/1.0/ImportSet", options, {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_IPASS}`,
  //         },
  //       })
  //       // console.log(response.data.Return.EtSvcInfo);
  //       setAPIData(response.data)
  //     } catch (error) {
  //       // console.log(error)
  //     }
  //   }
  //   GETSOAPI()
  // }, [dateF, dateT]);

  // Filters
  // By date
  // const filteredByDate = apiData.filter((x)=> )


  // y axis
  // how many units 


  // x axis
  //  mon - sun


  // in warranty
  // out of warranty

  // HHP
  // VDE

  // const countInWarranties = apiData?.EtSvcInfo?.results.filter((x) => x.WarrantyType === "I" && x.SvcProduct === svcType)?.length;
  // const countOutOfWarranties = apiData?.EtSvcInfo?.results.filter((x) => x.WarrantyType === "O" && x.SvcProduct === svcType)?.length;




  return (
    <>
      <Head>
        <title>HHP Dashboard</title>
        <meta name="robots" content="noindex, nofollow"></meta>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="space-between-navbar-and-content">
        <div className="container mx-auto max-w-3xl p-4">
          <h1>Dashboard</h1>
          <div className="flex flex-col lg:justify-center lg:flex-row items-center gap-2">
            <div className="flex lg:justify-center justify-end items-center gap-2">
              <span>
                <label
                  htmlFor="dateFrom"
                  className=" dark:text-[#eee] text-sm"
                >
                  Date from
                </label>
                <input
                  type="date"
                  name="dateFrom"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="cursor-pointer bg-white dark:bg-[#22303C] dark:text-[#eee] outline-none border border-gray-300 outline-0 text-gray-900 font-semibold text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1"

                  id="dateFrom"
                />
              </span>
              <span>
                <label
                  htmlFor="dateTo"
                  className=" dark:text-[#eee]"
                >
                  Date to
                </label>
                <input
                  type="date"
                  name="dateTo"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="cursor-pointer bg-white dark:bg-[#22303C] dark:text-[#eee] outline-none border border-gray-300 outline-0 text-gray-900  font-semibold text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1"

                  id="dateTo"
                />
              </span>
            </div>
            <div className="flex lg:justify-center justify-end items-center gap-2">
              <span className="hidden">-</span>
              <span>
                <label
                  htmlFor="svcType"
                  className=" dark:text-[#eee] text-sm"
                >
                  Service type
                </label>
                <select
                  value={svcType}
                  onChange={(e) => setSVCType(e.target.value)}
                  // required
                  // aria-required
                  id="svcType"
                  className="cursor-pointer bg-white dark:bg-[#22303C] dark:text-[#eee] outline-none border border-gray-300 outline-0 text-gray-900  font-semibold text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                >
                  <option disabled value="">
                    Service type
                  </option>
                  {service_types.map((x) => (
                    <option key={x.id} value={x.value}>
                      {x._type}
                    </option>
                  ))}
                </select>
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 my-4">
            {/* <Card
              decoration="top"
              decorationColor="indigo"
            >
              <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">In warranty</p>
              <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">{countInWarranties}</p>
            </Card>
            <Card
              decoration="top"
              decorationColor="indigo"
            >
              <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">Out of warranty</p>
              <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">{countOutOfWarranties}</p>
            </Card>
            <Card
              decoration="top"
              decorationColor="indigo"
            >
              <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">Pending</p>
              <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">$34,743</p>
            </Card>
            <Card
              decoration="top"
              decorationColor="indigo"
            >
              <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">Goods delivered</p>
              <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">$34,743</p>
            </Card> */}
          </div>
        </div>
      </main>
    </>
  );
}


export default Dashboard;
