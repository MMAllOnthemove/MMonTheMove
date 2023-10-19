import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
// import Button from "../../../../components/Buttons";
import dynamic from "next/dynamic";

const Button = dynamic(() => import("@/components/Buttons"));

function EditClaim() {
  // These are already handled in the table but for user experience
  // We just show them and make their inputs disabled
  const [showServiceOrderNumber, setShowServiceOrderNumber] = useState("");
  const [claimsGSPNStatus, setClaimsGSPNStatus] = useState("");

  const router = useRouter();
  const { id } = router.query;
  const toast = useToast();

  useEffect(() => {
    getThis();
  }, []);

  const getThis = useCallback(async () => {
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL_MANAGEMENT}/` + id)
      .then((res) => res.json())
      .then((data) => {
        setShowServiceOrderNumber(data[0]?.service_order_no);
        setClaimsGSPNStatus(data[0]?.gspn_status);
      });
  }, []);

  async function updateData(e: any) {
    e.preventDefault();

    const putThisInfo = {
      claimsGSPNStatus,
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
    if (!response.ok) {
      toast({
        title: "Failed to edit the job.",
        description: "Please try again",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else if (response.ok) {
      router.push("/claims");
      toast({
        title: "Job edited.",
        description: "You've successfully edited the job.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  return (
    <>
      <main>
        <section className="section container mx-auto">
          <h1 className="text-center py-2 text-gray-900  font-semibold lg:text-2xl">
            Editing service order:{" "}
            <span className="text-sky-700  font-bold">
              {showServiceOrderNumber}
            </span>
          </h1>

          <form
            className="my-3"
            onSubmit={updateData}
            id="updateclaimsGSPNStatusForm"
          >
            <span>
              <label
                htmlFor="inHouseStatus"
                className="block mb-2 text-sm font-medium  text-gray-900"
              >
                In house status
              </label>
              <select
                value={claimsGSPNStatus}
                onChange={(e) => setClaimsGSPNStatus(e.target.value)}
                id="inHouseStatus"
                className="mb-2 bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                className="bg-[#082f49] w-full  font-semibold text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-sm text-sm px-5 py-2.5 text-cente my-3"
                text="Update"
              />
            </span>
          </form>
        </section>
      </main>
    </>
  );
}

export default EditClaim;
