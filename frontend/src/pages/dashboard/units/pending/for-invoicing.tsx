import React, { useEffect, useState } from "react";
import Container from "@/components/Container";
import Link from "next/link";
import { fetchDataCombinedData } from "@/functions/getCombinedFlatData";
import { minDate, maxDate } from "../../../../../utils/datemin";
import Head from "next/head";

function ForInvoicing() {
  const [fetchAlldata, setFetchAlldata] = useState<any[]>([]);

  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Repair and gspn combined data
  const urls = [
    `${process.env.NEXT_PUBLIC_SERVER_API_URL_MANAGEMENT}`,
    `${process.env.NEXT_PUBLIC_SERVER_API_URL_MANAGEMENT}/repair`,
  ];
  const fetchDataCombinedData = async () => {
    try {
      const response = await Promise.all(
        urls.map((url) => fetch(url).then((res) => res.json()))
      );
      // console.log(response.flat());
      let filterOutDups = response
        .flat()
        .filter(
          (obj, index) =>
            response
              .flat()
              .findIndex(
                (item) => item.service_order_no === obj.service_order_no
              ) === index
        );
      setFetchAlldata(filterOutDups);
    } catch (error) {
      // console.log("Error", error);
    }
  };

  useEffect(() => {
    fetchDataCombinedData();
  }, []);

  var today = new Date().toISOString().split("T")[0].toString();

  let forInvoicing = fetchAlldata.filter((item) => {
    let filterPass = true;
    let date = new Date(item.date_modified);
    if (dateFrom) {
      filterPass =
        filterPass &&
        new Date(dateFrom) < date &&
        item.in_house_status === "For invoicing";
    }
    if (dateTo) {
      filterPass =
        filterPass &&
        new Date(dateTo) > date &&
        item.in_house_status === "For invoicing";
    }
    return filterPass;
  });
  return (
    <>
      <Head>
        <title>For invoicing | Breakdown</title>
      </Head>

      <main className="space-between-navbar-and-content">
        <Container>
          <section className="flex justify-center pt-5">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl text-center">
              For invoicing breakdown
            </h1>
          </section>

          <div className="flex gap-3 items-center justify-between">
            <div className="bg-white p-4 flex items-center flex-wrap">
              <nav aria-label="breadcrumb">
                <ol className="flex leading-none text-blue-500 divide-x">
                  <li className="pr-4">
                    <Link
                      href="/dashboard"
                      className="inline-flex items-center"
                    >
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
            <div className="flex gap-3 items-center">
              <span>
                <label htmlFor="dateFrom" className="sr-only">
                  Date from
                </label>
                <input
                  type="date"
                  name="dateFrom"
                  min={minDate}
                  max={today}
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="mb-2 bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                  id="dateFrom"
                />
              </span>
              <span>-</span>
              <span>
                <label htmlFor="dateTo" className="sr-only">
                  Date to
                </label>
                <input
                  type="date"
                  name="dateTo"
                  min={minDate}
                  max={today}
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="mb-2 bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                  id="dateTo"
                />
              </span>
            </div>
          </div>
          <div className="max-h-[540px] overflow-y-auto">
            <table className="relative w-full max-w-full whitespace-nowrap text-sm text-left text-gray-500 table-auto">
              <thead className="sticky top-0 bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus:bg-[#075985] text-white font-sans text-sm uppercase font-semibold">
                <tr className="font-sans font-semibold">
                  <th className="px-4 py-3 cursor-pointer font-sans font-semibold">
                    Service Order
                  </th>
                  <th className="px-4 py-3 cursor-pointer font-sans font-semibold">
                    Engineer
                  </th>
                  <th className="px-4 py-3 cursor-pointer font-sans font-semibold">
                    In house status
                  </th>
                </tr>
              </thead>
              <tbody className="z-0">
                {dateFrom !== "" &&
                  dateTo !== "" &&
                  forInvoicing.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b cursor-pointer hover:bg-[#eee] hover:text-gray-900 focus:bg-[#eee] focus:text-gray-900 active:bg-[#eee] active:text-gray-900"
                    >
                      <td className="px-4 py-3 font-sans font-medium text-sm max-w-full">
                        {item?.service_order_no}
                      </td>
                      <td className="px-4 py-3 font-sans font-medium text-sm max-w-full">
                        {item?.engineer}
                      </td>
                      <td className="px-4 py-3 font-sans font-medium text-sm max-w-full">
                        {item?.in_house_status}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </Container>
      </main>
    </>
  );
}

export default ForInvoicing;
