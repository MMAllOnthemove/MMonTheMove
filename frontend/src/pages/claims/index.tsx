import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { fetchDataCombinedData } from "@/functions/getCombinedFlatData";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Claims() {
  const [searchTerm, setSearchTerm] = useState("");
  const [tableData, setTableData] = useState<string[] | any[]>([]);

  const router = useRouter();
  useEffect(() => {
    fetchDataCombinedData({ setTableData });
  }, []);

  let filteredSearch = tableData.filter(
    (item) => item.service_order_no === searchTerm
  );

  const handleUpdate = (e: React.SyntheticEvent, id: any) => {
    e.stopPropagation();
    router.push(`/claims/edit/${id}`);
  };

  return (
    <>
      <Head>
        <title>Claims</title>
      </Head>
      <Navbar />
      <main className="space-between-navbar-and-content">
        <section className="container mx-auto p-3">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl text-center">
            Claims
          </h1>
          <form
            className="flex flex-col justify-center gap-3 py-4"
            id="searchServiceOrderForm"
            name="searchServiceOrderForm"
          >
            <label htmlFor="searchServiceOrder" className="text-center sr-only">
              Search Service Order
            </label>
            <input
              type="text"
              id="searchServiceOrder"
              name="searchServiceOrder"
              placeholder="Search service order"
              className="w-max-lg outline-none py-2 px-2 border-2 font-sans font-semibold text-sm rounded-sm my-2 mx-auto"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
          <div className="max-h-[540px] overflow-y-auto">
            <table className="relative w-full max-w-full whitespace-nowrap text-sm text-left text-gray-500 table-auto">
              <thead className="sticky top-0 bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus:bg-[#075985] text-white font-sans text-sm uppercase font-semibold">
                <tr className="border-b cursor-pointer hover:bg-[#eee] hover:text-gray-900 focus:bg-[#eee] focus:text-gray-900 active:bg-[#eee] active:text-gray-900">
                  <td className="px-4 py-3 font-sans font-medium text-sm max-w-full">
                    Service Order
                  </td>
                  <td className="px-4 py-3 font-sans font-medium text-sm max-w-full">
                    GSPN Status
                  </td>
                  <td className="px-4 py-3 font-sans font-medium text-sm max-w-full">
                    Edit
                  </td>
                </tr>
              </thead>
              <tbody className="z-0">
                {filteredSearch.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 font-sans font-medium text-sm max-w-full">
                      {item?.service_order_no}
                    </td>
                    <td className="px-4 py-3 font-sans font-medium text-sm max-w-full">
                      {item?.gspn_status}
                    </td>
                    <td className="px-4 py-3 font-sans font-medium text-sm max-w-full">
                      {searchTerm.length > 0 && (
                        <button
                          type="button"
                          onClick={(e) => handleUpdate(e, item.id)}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </button>
                      )}
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
