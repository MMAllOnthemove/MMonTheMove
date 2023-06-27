import Head from "next/head";
import { memo, useContext, useEffect, useState } from "react";
// import Modal from "../../../components/Modals/Modal";
import { managementModalState } from "@/atoms/managementModalAtom";
import { useSetRecoilState } from "recoil";
import ModalManagement from "../../../components/Modals/modal.management";
import Navbar from "../../../components/Navbar";
// This is the axios instance
import UnitFinder from "../api/UnitFinder";

// Table
import { TableInfoContext } from "@/context/TableInfoContext";
import { useRouter } from "next/router";

const Management = () => {
  const [data, setData] = useState<null | any>(null);
  const [isLoading, setLoading] = useState(false);
  // Not to be confused with 'setServiceOrder'
  const [searchServiceOrder, setSearchServiceOrder] = useState("");

  // Global state for the modal
  const setManagementModalState = useSetRecoilState(managementModalState);

  const [service_order, setServiceOrder] = useState("");
  const [warranty, setWarranty] = useState("");
  const [model, setModel] = useState("");
  const [imei, setImei] = useState("");
  const [fault, setFault] = useState("");
  const [serial_number, setSerialNumber] = useState("");
  const [engineer, setEngineer] = useState("");
  const [engineerAnalysis, setEngineerAnalysis] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [createdTime, setCreatedTime] = useState("");
  const [engineerAssignDate, setEngineerAssignDate] = useState("");
  const [engineerAssignTime, setEngineerAssignTime] = useState("");
  const [inHouseStatus, setInHouseStatus] = useState("");
  const [qualityControl, setQualityControl] = useState("");
  const [ticketNumber, setTicketNumber] = useState("");

  useEffect(() => {
    async function getData(url = "", data = {}) {
      // setLoading(true);
      await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_IPASS}`,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
        .then((res) => res.json())
        .then((data: string | any) => {
          // console.info(data);
          setData(data);
          setServiceOrder(data?.Return.EsHeaderInfo.SvcOrderNo);
          setCreatedDate(data?.Return.EsHeaderInfo.CreateDate);
          setCreatedTime(data?.Return.EsHeaderInfo.CreateTime);
          setModel(data?.Return.EsModelInfo.Model);
          setWarranty(data?.Return.EsModelInfo.WtyType);
          setEngineer(data?.Return.EsScheInfo.EngineerName);
          setFault(data?.Return.EsModelInfo.DefectDesc);
          setImei(data?.Return.EsModelInfo.IMEI);
          setSerialNumber(data?.Return.EsModelInfo.SerialNo);
          setEngineerAssignDate(data?.Return.EsScheInfo.EngrAssignDate);
          setEngineerAssignTime(data?.Return.EsScheInfo.EngrAssignTime);

          // setLoading(false);
        });
    }

    getData("https://eu.ipaas.samsung.com/eu/gcic/GetSOInfoAll/1.0/ImportSet", {
      IvSvcOrderNo: searchServiceOrder,
      // IvSvcOrderNo: "4266810380",
      // IvAscJobNo: "4266443508",
      IsCommonHeader: {
        Company: `${process.env.NEXT_PUBLIC_COMPANY}`,
        AscCode: `${process.env.NEXT_PUBLIC_ASC_CODE}`,
        Lang: `${process.env.NEXT_PUBLIC_LANG}`,
        Country: `${process.env.NEXT_PUBLIC_COUNTRY}`,
        Pac: `${process.env.NEXT_PUBLIC_PAC}`,
      },
    });
  }, [searchServiceOrder]);

  const postData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_URL_MANAGEMENT}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service_order,
            createdDate,
            createdTime,
            model,
            warranty,
            engineer,
            fault,
            imei,
            serial_number,
            inHouseStatus,
            qualityControl,
            engineerAssignDate,
            engineerAssignTime,
            engineerAnalysis,
            ticketNumber,
          }),
        }
      );

      console.log("Response is", response);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  // For the table
  const router = useRouter();

  const { id } = router.query;

  // Use context from the context we created
  // destructure the context
  const { tableInfo, setTableInfo } = useContext(TableInfoContext);

  // Fetching info from our database
  const fetchDataFromDatabase = async () => {
    try {
      //  '/' not to be confused with home
      // the / is putting it at the end of our axios instance url defined in api folder
      const response = await UnitFinder.get("/");
      // console.log("Response is", response);
      // Accesing the response like this because we logged it to see how it was structured
      setTableInfo(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchDataFromDatabase();
  }, []);
  // Redirects user to the edit table page
  const handleUpdate = (e: React.SyntheticEvent, id: string | number) => {
    e.stopPropagation();
    router.push(`/management/edit/${id}`);
  };
  return (
    <>
      <Head>
        <title>Management</title>
      </Head>
      <Navbar />

      <main>
        <div className="container flex justify-center flex-col mx-auto p-2">
          <section className="flex justify-between items-center py-5">
            <h1 className="text-3xl font-semibold leading-3 text-gray-800">
              HHP Management
            </h1>
            <button
              className="bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus:bg-[#075985] text-white font-semibold cursor-pointer font-sans rounded-md p-3 my-2"
              type="button"
              onClick={() =>
                setManagementModalState({
                  open: true,
                  view: "management",
                })
              }
            >
              Add job
            </button>

            {/* Called the modal here and added a post data prop that posts data on click */}
            <ModalManagement>
              <section className="flex flex-col overflow-auto">
                <label htmlFor="ServiceOrder" className="sr-only">
                  Service Order No
                </label>
                <input
                  aria-labelledby="ServiceOrder"
                  type="text"
                  name="ServiceOrder"
                  placeholder="Service Order"
                  id="ServiceOrder"
                  className="w-full outline-none py-2 px-2 border-2 rounded-md my-2"
                  size={10}
                  maxLength={10}
                  value={searchServiceOrder}
                  onChange={(e) => {
                    setSearchServiceOrder(e.target.value);
                  }}
                />
                <label htmlFor="Warranty" className="sr-only">
                  Warranty
                </label>
                <input
                  aria-labelledby="warranty"
                  type="text"
                  name="warranty"
                  placeholder="Warranty"
                  id="warranty"
                  className="w-full disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-noneoutline-none bg-white py-2 px-2 border-2 border-slate-400 rounded-md my-2"
                  value={warranty}
                  disabled
                />
                <label htmlFor="inHouseStatus" className="sr-only">
                  In house status
                </label>
                <input
                  aria-labelledby="inHouseStatus"
                  type="text"
                  name="inHouseStatus"
                  placeholder="In house status"
                  id="inHouseStatus"
                  className="outline-none bg-white py-2 px-2 border-2 border-slate-400 rounded-md my-2"
                  value={inHouseStatus}
                  onChange={(e) => setInHouseStatus(e.target.value)}
                  hidden
                />
                <label htmlFor="qualityControl" className="sr-only">
                  Quality Control
                </label>
                <input
                  aria-labelledby="qualityControl"
                  type="text"
                  name="qualityControl"
                  placeholder="Quality Control"
                  id="qualityControl"
                  className="outline-none bg-white py-2 px-2 border-2 border-slate-400 rounded-md my-2"
                  value={qualityControl}
                  onChange={(e) => setQualityControl(e.target.value)}
                  hidden
                />
                <label htmlFor="ticketNumber" className="sr-only">
                  Ticket Number
                </label>
                <input
                  aria-labelledby="ticketNumber"
                  type="text"
                  name="ticketNumber"
                  placeholder="Ticket Number"
                  id="ticketNumber"
                  className="outline-none bg-white py-2 px-2 border-2 border-slate-400 rounded-md my-2"
                  value={ticketNumber}
                  onChange={(e) => setTicketNumber(e.target.value)}
                  hidden
                />
                <label htmlFor="engineerAnalysis" className="sr-only">
                  Engineer Analysis
                </label>
                <input
                  aria-labelledby="engineerAnalysis"
                  type="text"
                  name="engineerAnalysis"
                  placeholder="Engineer Analysis"
                  id="engineerAnalysis"
                  className="outline-none bg-white py-2 px-2 border-2 border-slate-400 rounded-md my-2"
                  value={engineerAnalysis}
                  onChange={(e) => setEngineerAnalysis(e.target.value)}
                  hidden
                />

                <div className="flex g-3 justify-between items-center">
                  <button
                    onClick={() =>
                      setManagementModalState({
                        open: false,
                        view: "management",
                      })
                    }
                    type="button"
                    className="bg-red-600 text-white font-semibold font-sans rounded py-3 px-2 my-2 w-full mr-3"
                  >
                    Close
                  </button>

                  <button
                    onClick={postData}
                    type="button"
                    className="bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus: text-white font-semibold font-sans rounded py-3 px-2 my-2 w-full ml-3"
                  >
                    Add
                  </button>
                </div>
              </section>
            </ModalManagement>
          </section>

          <section className="relative overflow-x shadow-md rounded-lg my-5">
            <table className="w-full text-sm text-left text-gray-500 font-medium dark:text-gray-400 table-auto">
              <thead className="text-xs text-white uppercase bg-[#075985] dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Service Order
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Booking
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Model
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Warranty
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Technician
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Fault
                  </th>
                  <th scope="col" className="px-6 py-3">
                    IMEI
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Serial Number
                  </th>
                  <th scope="col" className="px-6 py-3">
                    In house status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quality Control
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Assessment Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Engineer Analysis
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Ticket number
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableInfo &&
                  tableInfo.map((item: string | number | any) => {
                    return (
                      <tr
                        key={item.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <td className="px-6 py-4">
                          <button
                            onClick={(e) => handleUpdate(e, item.id)}
                            type="button"
                            className="font-medium font-sans text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </button>
                        </td>
                        <td
                          scope="row"
                          className="px-6 py-4 font- whitespace-nowrap dark:text-white"
                        >
                          {item.service_order_no}
                        </td>
                        <td className="px-6 py-4">{item.created_date}</td>
                        <td className="px-6 py-4">{item.model}</td>
                        <td className="px-6 py-4">{item.warranty}</td>
                        <td className="px-6 py-4">{item.engineer}</td>
                        <td className="px-6 py-4">{item.fault}</td>
                        <td className="px-6 py-4">{item.imei}</td>
                        <td className="px-6 py-4">{item.serial_number}</td>
                        <td className="px-6 py-4">{item.in_house_status}</td>
                        <td className="px-6 py-4">{item.quality_control}</td>
                        <td className="px-6 py-4">
                          {item.engineer_assign_date}
                        </td>
                        <td className="px-6 py-4">{item.engineer_analysis}</td>
                        <td className="px-6 py-4">{item.ticket_number}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </section>
        </div>
      </main>
    </>
  );
};
export default memo(Management);
