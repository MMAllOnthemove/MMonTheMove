// External imports
import { fetchCurrentUser, fetchTableData } from "@/hooks/useFetch";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";

// Custom imports
import Container from "@/components/Container";
import NotLoggedIn from "@/components/NotLoggedIn";
// Dynamic imports
const Navbar = dynamic(() => import("@/components/Navbar"));
const PageTitle = dynamic(() => import("@/components/PageTitle"));

function Claims() {
  const { hhpData } = fetchTableData();
  const { userData } = fetchCurrentUser();
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  let filteredSearch = hhpData.filter(
    (item) => item.service_order_no === searchTerm
  );

  const handleUpdate = (e: React.SyntheticEvent, id: any) => {
    e.stopPropagation();
    router.push(`/department/claims/edit/${id}`);
  };
  return (
    <>
      <Head>
        <title>Claims</title>
      </Head>
      <Navbar />
      <main className="space-between-navbar-and-content">
        <Container>
          <PageTitle title="Claims" hasSpan={false} />
          {!userData ? (
            <NotLoggedIn />
          ) : (
            <>
              <section className="flex flex-col justify-center gap-3 py-4">
                <label
                  htmlFor="searchServiceOrder"
                  className="text-center sr-only"
                >
                  Search Service Order
                </label>
                <input
                  type="text"
                  id="searchServiceOrder"
                  name="searchServiceOrder"
                  placeholder="Search service order"
                  className="w-max-lg outline-none py-2 px-2 border-2  font-semibold text-sm rounded-sm my-2 mx-auto dark:bg-[#22303C] dark:text-[#eee]"
                  value={searchTerm}
                  maxLength={10}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </section>
              {hhpData ? (
                  <div className="max-h-[540px] overflow-y-auto">
                    <table className="relative w-full max-w-full whitespace-nowrap text-sm text-left text-gray-500 dark:text-[#eee] table-auto">
                      <thead className="sticky top-0 bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus:bg-[#075985] text-white dark:text-[#eee] text-sm uppercase font-semibold">
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
                            className="border-b cursor-pointer dark:bg-[#22303c] hover:bg-[#eee] hover:text-gray-900 focus:bg-[#eee] focus:text-gray-900 active:bg-[#eee] active:text-gray-900  dark:hover:bg-[#eee] dark:text-[#eee] dark:hover:text-[#22303c]"
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
              ):null}
            </>
          )}
        </Container>
      </main>
    </>
  );
}

export default Claims;
