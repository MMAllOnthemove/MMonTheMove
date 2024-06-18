// External imports
import { fetchCurrentUser, fetchTableData } from "@/hooks/useFetch";
import dynamic from "next/dynamic";
import Head from "next/head";
import CreateSOModal from "@/components/PopupModal/so_create_modal";

// Custom imports
import Container from "@/components/Container";
import NotLoggedIn from "@/components/NotLoggedIn";
import { FormEventHandler, SyntheticEvent, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import axios from "axios";
import Button from "@/components/Buttons";
// Dynamic imports
const Navbar = dynamic(() => import("@/components/Navbar"));
const PageTitle = dynamic(() => import("@/components/PageTitle"));

function Claims() {
  const { userData } = fetchCurrentUser();
  const { hhpData } = fetchTableData();
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState<boolean | null | any>(false)
  const [claimsGSPNStatus, setClaimsGSPNStatus] = useState("");
  let dateOfClaim = new Date();
  const router = useRouter();
  let filteredSearch = hhpData.filter(
    (item) => item?.service_order_no === searchTerm
  );
  const handleUpdate = (e: React.SyntheticEvent, id: any) => {
    e.stopPropagation();
    router.push(`/department/claims/edit/${id}`);
  };

  const handleRowClick = (row: any) => {
    setOpenModal(row[0]);
  };

  const closeModal = () => {
    setOpenModal(false);
  };
  const updateData = async (e: SyntheticEvent, id: number | string) => {
    let user = userData?.email
    e.preventDefault()
    const putThisInfo = {
      claimsGSPNStatus,
      user,
      dateOfClaim,
      id,
    };

    try {
      const { data } = await axios.patch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/hhp/jobs/claims/` + id, putThisInfo);
      toast.success(`${data}`);
      setOpenModal(false);
    } catch (error) {
      toast.error("Please try again");
    }

  }

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
                  type="number"
                  id="searchServiceOrder"
                  name="searchServiceOrder"
                  placeholder="Search service order"
                  className="w-max-lg outline-none py-2 px-2 border-2  font-semibold text-sm rounded-sm my-2 mx-auto dark:bg-[#22303C] dark:text-[#eee]"
                  value={searchTerm}
                  maxLength={10}
                  onChange={(e) => setSearchTerm(e.target.value)}

                />
              </section>
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

                    {searchTerm?.length > 0 ?
                      <tr
                        onClick={() => handleRowClick(filteredSearch)}
                        className="border-b cursor-pointer dark:bg-[#22303c] hover:bg-[#eee] hover:text-gray-900 focus:bg-[#eee] focus:text-gray-900 active:bg-[#eee] active:text-gray-900  dark:hover:bg-[#eee] dark:text-[#eee] dark:hover:text-[#22303c]"
                      >
                        <td className="px-4 py-3  font-medium text-sm max-w-full">
                          {filteredSearch[0]?.service_order_no}
                        </td>
                        <td className="px-4 py-3  font-medium text-sm max-w-full">
                          {filteredSearch[0]?.gspn_status}
                        </td>
                        <td className="px-4 py-3  font-medium text-sm max-w-full">

                          <button
                            role="button"
                            id="update-button"
                            type="button"
                            onClick={() => handleRowClick(filteredSearch)}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </button>

                        </td>
                      </tr> : null}


                    <CreateSOModal title="" isVisible={openModal} onClose={closeModal} content={
                      <>

                        {openModal && (
                          <form className="my-3"
                            onSubmit={(e) => updateData(e, openModal?.id)}
                            id="updateclaimsGSPNStatusForm">
                            {/* <p>Service Order: {openModal?.id}</p>
                            <p>Service Order: {openModal?.service_order_no}</p> */}

                            <span>
                              <label
                                htmlFor="inHouseStatus"
                                className="block mb-2 text-sm font-medium  text-gray-900 dark:text-[#eee]"
                              >
                                In house status
                              </label>
                              <select
                                value={claimsGSPNStatus}
                                onChange={(e) => setClaimsGSPNStatus(e.target.value)}
                                id="inHouseStatus"
                                className="mb-2 cursor-pointer bg-white dark:bg-[#22303C] dark:text-[#eee]  border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                              >
                                <option disabled value="">
                                  Choose status
                                </option>
                                <option value="Engineer Assigned">Engineer Assigned</option>
                                <option value="Pending">Pending</option>
                                <option value="Repair Complete">Repair Complete</option>
                                <option value="Goods Delivered">Goods Delivered</option>
                              </select>
                            </span>
                            <span>
                              <Button
                                type="submit"
                                className="bg-[#082f49] w-full dark:text-[#eee] font-semibold text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-sm text-sm px-5 py-2.5 text-cente my-3"
                                text="Update"
                              />
                            </span>
                          </form>
                        )}

                      </>} />
                  </tbody>
                </table>
              </div>

            </>
          )}


        </Container>
      </main>
    </>
  );
}

export default Claims;
