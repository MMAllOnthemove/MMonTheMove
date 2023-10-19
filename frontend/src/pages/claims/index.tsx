import { fetchDataCombinedData } from "@/functions/getCombinedFlatData";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const Navbar = dynamic(() => import("@/components/Navbar"));
// import Navbar from "../../../components/Navbar";

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
          <section className="flex flex-col justify-center gap-3 py-4">
            <label htmlFor="searchServiceOrder" className="text-center sr-only">
              Search Service Order
            </label>
            <input
              type="text"
              id="searchServiceOrder"
              name="searchServiceOrder"
              placeholder="Search service order"
              className="w-max-lg outline-none py-2 px-2 border-2  font-semibold text-sm rounded-sm my-2 mx-auto"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </section>
          <div className="max-h-[540px] overflow-y-auto">
            <table className="relative w-full max-w-full whitespace-nowrap text-sm text-left text-gray-500 table-auto">
              <thead className="sticky top-0 bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus:bg-[#075985] text-white  text-sm uppercase font-semibold">
                <tr className=" font-semibold">
                  <th className="px-4 py-3 cursor-pointer  font-semibold">
                    Service Order
                  </th>
                  <th className="px-4 py-3 cursor-pointer  font-semibold">
                    GSPN Status
                  </th>
                  <th className="px-4 py-3 cursor-pointer  font-semibold">
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody className="z-0">
                {filteredSearch.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b cursor-pointer hover:bg-[#eee] hover:text-gray-900 focus:bg-[#eee] focus:text-gray-900 active:bg-[#eee] active:text-gray-900"
                  >
                    <td className="px-4 py-3  font-medium text-sm max-w-full">
                      {item?.service_order_no}
                    </td>
                    <td className="px-4 py-3  font-medium text-sm max-w-full">
                      {item?.gspn_status}
                    </td>
                    <td className="px-4 py-3  font-medium text-sm max-w-full">
                      {searchTerm.length > 0 && (
                        <button
                          role="button"
                          id="update-button"
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
