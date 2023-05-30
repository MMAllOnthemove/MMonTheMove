import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { memo, useEffect, useState } from "react";
import Kanban from "../../../components/Kanban";
import Navbar from "../../../components/Navbar";
import Table from "../../../components/Table";
import Modal from "../../../components/Modal";
import Head from "next/head";
import useSocketSetup from "../useSocketSetup";

const Management = () => {
  const [data, setData] = useState<null | any>(null);
  const [isLoading, setLoading] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [showModal, setShowModal] = useState(false);

  const [service_order, setServiceOrder] = useState("");
  const [warranty, setWarranty] = useState("");
  const [model, setModel] = useState("");
  const [fault, setFault] = useState("");
  const [imei, setImei] = useState("");
  const [serial_number, setSerialNumber] = useState("");
  const [engineer, setEngineer] = useState("");

  // Connects to socket io and logs user out if there is an error on our backend
  useSocketSetup();

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
          setData(data);
          setWarranty(data?.Return.EsModelInfo.WtyType);
          setModel(data?.Return.EsModelInfo.Model);
          setFault(data?.Return.EsModelInfo.DefectDesc);
          setImei(data?.Return.EsModelInfo.IMEI);
          setSerialNumber(data?.Return.EsModelInfo.SerialNo);
          setEngineer(data?.Return.EsScheInfo.Engineer);
          // setLoading(false);
        });
    }

    getData("https://eu.ipaas.samsung.com/eu/gcic/GetSOInfoAll/1.0/ImportSet", {
      IvSvcOrderNo: service_order,
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
  }, [service_order]);

  const postData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/management", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_order,
          warranty,
          model,
          fault,
          imei,
          serial_number,
          engineer,
        }),
      });
      console.log("Response is", response);
    } catch (err) {
      console.log(err);
    }
    setEngineer("");
    setFault("");
    setModel("");
    setFault("");
    setImei("");
    setSerialNumber("");
    setEngineer("");
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
              className="bg-green-900 text-white font-semibold font-sans rounded-md p-3 my-2"
              type="button"
              onClick={() => {
                setShowModal(true);
              }}
            >
              Open Modal
            </button>
            {showModal && (
              <Modal
                setShowModal={setShowModal}
                modalTitle="Fields will be auto populated"
              >
                <form className="flex flex-col">
                  <label htmlFor="ServiceOrder" className="sr-only">
                    Service Order No
                  </label>
                  <input
                    type="text"
                    name="ServiceOrder"
                    placeholder="Service Order"
                    id="ServiceOrder"
                    className="outline-none border-sky-600 py-2 px-2 border rounded-sm my-2"
                    value={service_order}
                    onChange={(e) => {
                      setServiceOrder(e.target.value);
                    }}
                  />
                  <label htmlFor="warranty" className="sr-only">
                    Warranty
                  </label>
                  <input
                    hidden
                    type="text"
                    name="model"
                    placeholder="Warranty"
                    id="warranty"
                    className="outline-none border-sky-600 py-2 px-2 border rounded-sm my-2"
                    value={warranty}
                  />
                  <label htmlFor="model" className="sr-only">
                    Model
                  </label>
                  <input
                    hidden
                    type="text"
                    name="model"
                    placeholder="Model"
                    id="model"
                    className="outline-none border-sky-600 py-2 px-2 border rounded-sm my-2"
                    value={model}
                  />
                  <label htmlFor="fault" className="sr-only">
                    Fault
                  </label>
                  <input
                    hidden
                    type="text"
                    name="fault"
                    placeholder="Fault"
                    id="fault"
                    className="outline-none border-sky-600 py-2 px-2 border rounded-sm my-2"
                    value={fault}
                  />
                  <label htmlFor="imei" className="sr-only">
                    IMEI
                  </label>
                  <input
                    hidden
                    type="text"
                    name="imei"
                    placeholder="IMEI"
                    id="imei"
                    className="outline-none border-sky-600 py-2 px-2 border rounded-sm my-2"
                    value={fault}
                  />
                  <label htmlFor="serial_number" className="sr-only">
                    Serial Number
                  </label>
                  <input
                    hidden
                    type="text"
                    name="serial_number"
                    placeholder="Serial Number"
                    id="serial_number"
                    className="outline-none border-sky-600 py-2 px-2 border rounded-sm my-2"
                    value={serial_number}
                  />
                  <label htmlFor="engineer" className="sr-only">
                    Engineer
                  </label>
                  <input
                    disabled
                    type="text"
                    name="engineer"
                    placeholder="Engineer"
                    id="engineer"
                    className="outline-none border-sky-600 py-2 px-2 border rounded-sm my-2"
                    value={engineer}
                  />

                  <input
                    onClick={postData}
                    type="submit"
                    value="Submit"
                    className="bg-green-900 text-white font-semibold font-sans rounded py-3 px-2 my-2"
                  />
                </form>
              </Modal>
            )}
          </section>

          <section className="my-5">
            <Tabs variant="enclosed" size="md">
              <TabList>
                <Tab>Board View</Tab>
                <Tab>Table View</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Kanban />
                </TabPanel>
                <TabPanel>
                  <section>
                    <Table />
                  </section>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </section>
        </div>
      </main>
    </>
  );
};
export default memo(Management);
