import Navbar from "@/components/Navbar";
// Next auth session hook
import { fetchDataCombinedData } from "@/functions/getCombinedFlatData";
import {
  ArrowDownTrayIcon,
  ArrowPathIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { Metric, Text } from "@tremor/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

export default function Dashboard() {
  const [tableData, setTableData] = useState<string[] | any[]>([]);
  const [engineerUnitsAdded, setEngineerUnitsAdded] = useState<
    string[] | any[]
  >([]);
  const router = useRouter();
  useEffect(() => {
    fetchDataCombinedData({ setTableData });
  }, []);

  const getEngineers = tableData
    .flat()
    .filter(
      (obj, index) =>
        tableData.flat().findIndex((item) => item.engineer === obj.engineer) ===
        index
    ).length;

  const getPendingJobs = tableData.filter(
    (item) => item.in_house_status !== "Repair complete"
  ).length;

  const getCompleteJobs = tableData.filter(
    (item) => item.in_house_status === "Repair complete"
  ).length;

  const getQCChecked = tableData.filter(
    (item) => item.isqcchecked === "TRUE" || item.isqcchecked === "true"
  ).length;

  // Get the engineers and repaired jobs from api
  const countEngineerRepairCompleteAlltimeJobs = useCallback(async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL_DASHBOARD_UNITS_COUNT}/complete/all-time`,
      {
        method: "GET",
        headers: { accept: "application/json" },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log("all-time graph", data);
        setEngineerUnitsAdded(data);
      });
  }, [engineerUnitsAdded]);

  useEffect(() => {
    countEngineerRepairCompleteAlltimeJobs();
  }, []);

  // Sort the count descending
  engineerUnitsAdded.sort((a, b) => b - a);

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="robots" content="noindex, nofollow"></meta>
      </Head>
      <Navbar />
      <main className="space-between-navbar-and-content">
        <section className="container max-w-6xl px-5 mx-auto pt-5 mb-28">
          <h1 className="mb-4 text-4xl font-semibold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
            Analytics overview
          </h1>

          <div className="bg-white p-4 flex items-center flex-wrap">
            <nav aria-label="breadcrumb">
              <ol className="flex leading-none text-blue-500 divide-x">
                <li className="pr-4">
                  <Link href="/dashboard" className="inline-flex items-center">
                    <svg
                      className="w-5 h-auto fill-current mx-2 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#000000"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z" />
                    </svg>
                  </Link>
                </li>

                <li
                  className="inline-flex items-center px-4 text-gray-700 font-sans"
                  aria-current="page"
                >
                  <Link
                    href="/dashboard/units/pending"
                    className="text-gray-600 hover:text-blue-500 "
                  >
                    Units pending
                  </Link>
                </li>

                <li
                  className="inline-flex items-center px-4 text-gray-700"
                  aria-current="page"
                >
                  <Link
                    href="/dashboard/engineers"
                    className="text-gray-600 hover:text-blue-500 font-sans"
                  >
                    Engineers
                  </Link>
                </li>
              </ol>
            </nav>
          </div>
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 my-3">
            <article
              className=" flex flex-col justify-between p-5 border border-[#eee] bg-white rounded cursor-pointer"
              onClick={() => router.push("/dashboard/units/pending")}
            >
              <div className="first_row flex justify-between items-center">
                <div>
                  <Text className="text-sm text-gray-400 font-medium font-sans">
                    Units pending
                  </Text>
                  <Metric className="text-xl lg:text-5xl font-bold text-indigo-500 ">
                    {getPendingJobs}
                  </Metric>
                </div>
                <ArrowPathIcon className="h-6 w-6 text-gray-500" />
              </div>
            </article>

            <article
              className="flex items-center justify-between p-5 border border-[#eee] bg-white rounded cursor-pointer"
              onClick={() => router.push("/dashboard/engineers")}
            >
              <div>
                <div className="text-sm text-gray-400  font-medium font-sans">
                  Engineers
                </div>
                <div className="flex items-center pt-1">
                  <div className="text-xl lg:text-5xl font-bold text-indigo-500 ">
                    {getEngineers}
                  </div>
                </div>
              </div>
              <div>
                <UserGroupIcon className="h-6 w-6 text-gray-500" />
              </div>
            </article>
            <article className=" flex flex-col justify-between p-5 border border-[#eee] bg-white rounded cursor-pointer">
              <div className="first_row flex  justify-between items-center">
                <div>
                  <Text className="text-sm text-gray-400  font-medium font-sans">
                    QC CHECKED
                  </Text>
                  <Metric className="text-xl lg:text-5xl font-bold text-indigo-500 ">
                    {getQCChecked}
                  </Metric>
                </div>
                <ArrowDownTrayIcon className="h-6 w-6 text-gray-500" />
              </div>
            </article>
          </div>
        </section>
        <section className="container mx-auto">
          <div className="max-h-[540px] overflow-y-auto">
            <table className="relative w-full max-w-full whitespace-nowrap text-sm text-left text-gray-500 table-auto">
              <thead className="sticky top-0 bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus:bg-[#075985] text-white font-sans text-sm uppercase font-semibold">
                <tr className="border-b cursor-pointer hover:bg-[#eee] hover:text-gray-900 focus:bg-[#eee] focus:text-gray-900 active:bg-[#eee] active:text-gray-900">
                  <td className="px-4 py-3 font-sans font-medium text-sm max-w-full">
                    Engineer
                  </td>
                  <td className="px-4 py-3 font-sans font-medium text-sm max-w-full">
                    Jobs complete
                  </td>
                </tr>
              </thead>
              <tbody className="z-0">
                {engineerUnitsAdded.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 font-sans font-medium text-sm max-w-full">
                      {item?.engineer}
                    </td>
                    <td className="px-4 py-3 font-sans font-medium text-sm max-w-full">
                      {item?.units_added}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
}
