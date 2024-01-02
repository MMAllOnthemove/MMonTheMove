// External imports
import { useToast } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

// Custom imports
import { getProfile } from "@/functions/getLoggedInUserProfile";
import { Alert } from "@/components/Alert";
import { fetchCurrentUser } from "@/hooks/useFetch";
import Head from "next/head";
// Dynamic imports
const Button = dynamic(() => import("@/components/Buttons"));
const NotLoggedIn = dynamic(() => import("@/components/NotLoggedIn"));

function EditClaim() {
  // These are already handled in the table but for user experience
  // We just show them and make their inputs disabled
  const [showServiceOrderNumber, setShowServiceOrderNumber] = useState("");
  const [claimsGSPNStatus, setClaimsGSPNStatus] = useState("");
  let dateOfClaim = new Date();
  // const [userData, setUserData] = useState("");

  const { userData } = fetchCurrentUser();
  // console.log("userData", userData);
  const router = useRouter();

  const { id } = router.query;
  // Fetches logged in user's data
  // useEffect(() => {
  //   // getProfile({ setUserData });
  //   if (!userData) router.push("/auth");
  // }, [userData]);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL_MANAGEMENT}/` + id)
        .then((res) => res.json())
        .then((data) => {
          // console.log("data", data);
          setShowServiceOrderNumber(data[0]?.service_order_no);
          setClaimsGSPNStatus(data[0]?.gspn_status);
        });
    };
    fetchData();
  }, []);
  const updateData = async (e: any) => {
    e.preventDefault();
    // router.push("/");
    const putThisInfo = {
      claimsGSPNStatus,
      userData,
      dateOfClaim,
      id,
    };
    // console.log(putThisInfo);
    const putMethod = {
      method: "PUT", // Method itself
      headers: {
        "Content-type": "application/json; charset=UTF-8", // Indicates the content
      },
      body: JSON.stringify(putThisInfo), // We send data in JSON format
    };
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL_MANAGEMENT}/claims/` + id,
      putMethod
    );
    let json = await response.json();
    console.log("response", response);
    if (!response.ok) {
      // <Alert type="info" message="Please try again" />;
      window.alert("Please try again");
    } else if (response.ok) {
      router.push("/department/claims");
      window.alert("Job edited");
      // toast({
      //   title: "Job edited.",
      //   description: "You've successfully edited the job.",
      //   status: "success",
      //   duration: 9000,
      //   isClosable: true,
      // });
    }
  };

  return (
    <>
      <Head>
        <title>Edit Claim</title>
      </Head>
      <main>
        <section className="section container mx-auto p-2 lg:p-1">
          <>
            <span className="flex items-center justify-between my-2">
              <Button
                type="button"
                onClick={() => history.back()}
                className="bg-[#082f49]   font-semibold text-white dark:text-[#eee] hover:bg-blue-800 rounded-sm text-sm p-2.5 text-center"
                text="Back"
              />

              <h1 className="text-center text-gray-900 dark:text-[#eee] font-semibold lg:text-2xl">
                Editing service order:{" "}
                <span className="text-sky-700 font-bold">
                  {showServiceOrderNumber}
                </span>
              </h1>

              <div />
            </span>
            <h3 className="text-center dark:text-[#eee] font-semibold my-2">
              Editing as:{" "}
              <span className="text-sky-700  font-bold">{userData}</span>
            </h3>
            <hr />

            <form
              className="my-3"
              onSubmit={updateData}
              id="updateclaimsGSPNStatusForm"
            >
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
          </>
        </section>
      </main>
    </>
  );
}

export default EditClaim;
