import { TableInfoContext } from "@/context/TableInfoContext";
import UnitFinder from "@/pages/api/UnitFinder";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
// Next auth session hook
import { useSession } from "next-auth/react";
import Login from "../auth/login";

function EditRow() {
  const { tableInfo, setTableInfo } = useContext(TableInfoContext);
  // These are already handled in the table but for user experience
  // We just show them and make their inputs disabled
  const [showServiceOrderNumber, setShowServiceOrderNumber] = useState("");

  // Allow user to select only today's date
  var today = new Date().toISOString().split("T")[0];
  // These are the ones use has to update
  const [inHouseStatus, setInHouseStatus] = useState("");
  const [engineerAnalysis, setEngineerAnalysis] = useState("");

  const [ticket, setTicket] = useState("");
  const [hasValue, setHasValue] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const toast = useToast();

  // console.log(memo(inHouseStatus).type);

  const fetchData = async () => {
    const response = await UnitFinder.get(`/${id}`);
    setShowServiceOrderNumber(response.data[0].service_order_no);
    setInHouseStatus(response.data[0].in_house_status);
    setEngineerAnalysis(response.data[0].engineer_analysis);
  };
  useEffect(() => {
    fetchData();
  }, []);
  // Google auth session
  const { data: session } = useSession();

  // Get user who modifies
  const user = session?.user?.email;

  async function updateData(e: any) {
    e.preventDefault();
    // Get the date input values when selected
    const formData = new FormData(e.target);
    // These are all out status dates
    const partsPendingDate = formData.get("partsPendingDate");
    const partsOrderedDate = formData.get("partsOrderedDate");
    const partsIssuedDate = formData.get("partsIssuedDate");
    const qcCompletedDate = formData.get("qcCompletedDate");
    const repairCompletedDate = formData.get("repairCompletedDate");

    router.push("/");
    toast({
      title: "Job edited.",
      description: "You've successfully edited the job.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    const response = await UnitFinder.put(`/${id}`, {
      engineerAnalysis,
      inHouseStatus,
      partsPendingDate,
      partsOrderedDate,
      partsIssuedDate,
      qcCompletedDate,
      repairCompletedDate,
      ticket,
      id,
      user,
    });
  }

  async function deleteData() {
    router.push("/");
    toast({
      title: "Job deleted.",
      description: "You've successfully deleted the job.",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
    const response = await UnitFinder.delete(`/${id}`);
  }
  
  if (session) {
    return (
      <>
        <section className="section container mx-auto">
          <h1 className="text-center py-2 text-gray-900 font-sans font-semibold lg:text-2xl">
            Editing service order:{" "}
            <span className="text-sky-700 font-sans font-bold">
              {showServiceOrderNumber}
            </span>
          </h1>
          <hr />
          <form className="my-3" onSubmit={updateData}>
            <span>
              <label
                htmlFor="showServiceOrderNumber"
                className="block mb-2 text-sm font-medium font-sans text-gray-900 dark:text-white"
              >
                Service Order No
              </label>
              <input
                type="text"
                name="showServiceOrderNumber"
                id="showServiceOrderNumber"
                className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-whitew-full"
                value={showServiceOrderNumber}
                disabled
              />
            </span>

            <span>
              <label
                htmlFor="engineerAnalysis"
                className="block mb-2 text-sm font-medium font-sans text-gray-900 dark:text-white"
              >
                Engineer Analysis
              </label>
              <textarea
                name="engineerAnalysis"
                id="engineerAnalysis"
                className="mb-2 bg-white border resize-none border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full outline-0 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                value={engineerAnalysis}
                onChange={(event) => setEngineerAnalysis(event.target.value)}
              ></textarea>
            </span>
            <span>
              <label
                htmlFor="qualityControl"
                className="block mb-2 text-sm font-medium font-sans text-gray-900 dark:text-white"
              >
                In house status
              </label>
              <select
                value={inHouseStatus}
                onChange={(e) => setInHouseStatus(e.target.value)}
                className="mb-2 bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              >
                <option disabled value="">
                  Choose status
                </option>
                <option value="Booked in">Booked in</option>
                <option value="Repair in progress">Repair in progress</option>
                <option value="Waiting for parts">Waiting for parts</option>
                <option value="Waiting for customer">
                  Waiting for customer
                </option>
                <option value="Scheduled">Scheduled</option>
                <option value="Customer reply">Customer reply</option>
                <option value="Assigned to tech">Assigned to tech</option>
                <option value="Parts request 1st approval">
                  Parts request 1st approval
                </option>
                <option value="Quote pending">Quote pending</option>
                <option value="Quote approved">Quote approved</option>
                <option value="Quality Control (QC)">Quality Control</option>
                <option value="Parts issued">Parts issued</option>
                <option value="Parts to be ordered">Parts to be ordered</option>
                <option value="Quote pending">Quote pending</option>
                <option value="Waiting for customer">
                  Waiting for customer
                </option>
                <option value="Waiting SAW">Waiting SAW</option>
                <option value="Repair complete">Repair completed</option>
                <option value="QC failed">QC failed</option>
                <option value="QC completed">QC completed</option>
                <option value="Pending Q&A">Pending Q&A</option>
                <option value="SO cancel">SO cancel</option>
                <option value="Scrap approved">Scrap approved</option>
                <option value="Quote rejected">Quote rejected</option>
                <option value="For invoicing">For invoicing</option>
              </select>
            </span>
            <span>
              <label
                htmlFor="partsPendingDate"
                className="block mb-2 text-sm font-medium font-sans text-gray-900 dark:text-white"
              >
                Waiting for parts date
              </label>
              <input
                type="date"
                name="partsPendingDate"
                min={today}
                max={today}
                id="partsPendingDate"
                className="mb-2 bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
            </span>
            <span>
              <label
                htmlFor="partsOrderedDate"
                className="block mb-2 text-sm font-medium font-sans text-gray-900 dark:text-white"
              >
                Parts ordered date
              </label>
              <input
                type="date"
                name="partsOrderedDate"
                min={today}
                max={today}
                id="partsOrderedDate"
                className="mb-2 bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
            </span>
            <span>
              <label
                htmlFor="partsIssuedDate"
                className="block mb-2 text-sm font-medium font-sans text-gray-900 dark:text-white"
              >
                Parts issued date
              </label>
              <input
                type="date"
                name="partsIssuedDate"
                min={today}
                max={today}
                id="partsIssuedDate"
                className="mb-2 bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
            </span>
            <span>
              <label
                htmlFor="qcCompletedDate"
                className="block mb-2 text-sm font-medium font-sans text-gray-900 dark:text-white"
              >
                QC completed date
              </label>
              <input
                type="date"
                name="qcCompletedDate"
                min={today}
                max={today}
                id="qcCompletedDate"
                className="mb-2 bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
            </span>
            <span>
              <label
                htmlFor="repairCompletedDate"
                className="block mb-2 text-sm font-medium font-sans text-gray-900 dark:text-white"
              >
                Repair completed date
              </label>
              <input
                type="date"
                name="repairCompletedDate"
                min={today}
                max={today}
                id="repairCompletedDate"
                className="mb-2 bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
            </span>
            <span>
              <label
                htmlFor="ticket"
                className="block mb-2 text-sm font-medium font-sans text-gray-900 dark:text-white"
              >
                Set ticket number
              </label>
              <input
                type="text"
                name="ticket"
                id="ticket"
                value={ticket}
                onChange={(e) => setTicket(e.target.value)}
                className="mb-2 bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
            </span>
            <span>
              <button
                type="submit"
                className="bg-[#082f49] w-full font-sans font-semibold text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-sm text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-3"
              >
                Update
              </button>
            </span>
          </form>
          <span>
            <button
              onClick={deleteData}
              type="button"
              className="bg-red-500 w-full font-sans font-semibold text-white hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-sm text-sm px-5 py-2.5 text-center my-3"
            >
              Delete
            </button>
          </span>
        </section>
      </>
    );
  } else {
    <Login />;
  }
}

export default EditRow;
