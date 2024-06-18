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

        </div>
      </main>
    </>
  );
}


export default Dashboard;
