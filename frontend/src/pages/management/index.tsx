import Head from "next/head";
import { memo, useEffect, useState } from "react";
import Modal from "../../../components/Modals/Modal";
import Navbar from "../../../components/Navbar";
import Table from "../../../components/Table";
import useSocketSetup from "../useSocketSetup";

const Management = () => {
  const [data, setData] = useState<null | any>(null);
  const [isLoading, setLoading] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [searchServiceOrder, setSearchServiceOrder] = useState("");

  const [service_order, setServiceOrder] = useState("");
  const [warranty, setWarranty] = useState("");
  const [model, setModel] = useState("");
  const [imei, setImei] = useState("");
  const [fault, setFault] = useState("");
  const [serial_number, setSerialNumber] = useState("");
  const [engineer, setEngineer] = useState("");
  const [status, setStatus] = useState("");
  const [statusDesc, setStatusDesc] = useState("");
  const [engineerAnalysis, setEngineerAnalysis] = useState("");
  const [ascCode, setAscCode] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [createdTime, setCreatedTime] = useState("");
  const [accessory, setAccessory] = useState("");
  const [producedDate, setProducedDate] = useState("");
  const [purchasedDate, setPurchasedDate] = useState("");
  const [remark, setRemark] = useState("");
  const [warrantyTermRemark, setWarrantyTermRemark] = useState("");
  const [customerRequestDate, setCustomerRequestDate] = useState("");
  const [customerRequestTime, setCustomerRequestTime] = useState("");
  const [acknowledgeDate, setAcknowledgeDate] = useState("");
  const [acknowledgeTime, setAcknowledgeTime] = useState("");
  const [completeDate, setCompleteDate] = useState("");
  const [completeTime, setCompleteTime] = useState("");
  const [engineerAssignDate, setEngineerAssignDate] = useState("");
  const [engineerAssignTime, setEngineerAssignTime] = useState("");
  const [firstAppointmentDate, setFirstAppointmentDate] = useState("");
  const [firstAppointmentTime, setFirstAppointmentTime] = useState("");
  const [firstVisitDate, setFirstVisitDate] = useState("");
  const [firstVisitTime, setFirstVisitTime] = useState("");
  const [firstCustomerDate, setFirstCustomerDate] = useState("");
  const [firstCustomerTime, setFirstCustomerTime] = useState("");
  const [goodsDeliveryDate, setGoodsDeliveryDate] = useState("");
  const [goodsDeliveryTime, setGoodsDeliveryTime] = useState("");
  const [lastAppointmentDate, setLastAppointmentDate] = useState("");
  const [lastAppointmentTime, setLastAppointmentTime] = useState("");
  const [lastChangeDate, setLastChangeDate] = useState("");
  const [lastChangeTime, setLastChangeTime] = useState("");
  const [lastVisitDate, setLastVisitDate] = useState("");
  const [lastVisitTime, setLastVisitTime] = useState("");
  const [repairReceiveDate, setRepairReceiveDate] = useState("");
  const [repairReceiveTime, setRepairReceiveTime] = useState("");
  const [unitReceiveDate, setUnitReceiveDate] = useState("");
  const [unitReceiveTime, setUnitReceiveTime] = useState("");
  const [customerFirstName, setCustomerFirstName] = useState("");
  const [customerLastName, setCustomerLastName] = useState("");
  const [customerStreetAddress, setCustomerStreetAddress] = useState("");
  const [customerDistrict, setCustomerDistrict] = useState("");
  const [customerProvince, setCustomerProvince] = useState("");
  const [customerZipCode, setCustomerZipCode] = useState("");
  const [customerHomePhone, setCustomerHomePhone] = useState("");
  const [customerMobilePhone, setCustomerMobilePhone] = useState("");
  const [customerOfficePhone, setCustomerOfficePhone] = useState("");
  const [email, setEmail] = useState("");
  const [customerCode, setCustomerCode] = useState("");

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
          // console.info(data);
          setData(data);
          setServiceOrder(data?.Return.EsHeaderInfo.SvcOrderNo);
          setWarranty(data?.Return.EsModelInfo.WtyType);
          setModel(data?.Return.EsModelInfo.Model);
          setImei(data?.Return.EsModelInfo.IMEI);
          setFault(data?.Return.EsModelInfo.DefectDesc);
          setSerialNumber(data?.Return.EsModelInfo.SerialNo);
          setEngineer(data?.Return.EsScheInfo.EngineerName);
          setStatus(data?.Return.EsJobInfo.Status);
          setStatusDesc(data?.Return.EsJobInfo.StReasonDesc);
          setAscCode(data?.Return.EsHeaderInfo.AscCode);
          setCreatedBy(data?.Return.EsHeaderInfo.CreatedBy);
          setCreatedDate(data?.Return.EsHeaderInfo.CreateDate);
          setCreatedTime(data?.Return.EsHeaderInfo.CreateTime);
          setAccessory(data?.Return.EsModelInfo.Accessory);
          setProducedDate(data?.Return.EsModelInfo.ProductDate);
          setPurchasedDate(data?.Return.EsModelInfo.PurchaseDate);
          setRemark(data?.Return.EsModelInfo.Remark);
          setWarrantyTermRemark(data?.Return.EsModelInfo.WtyTermRemark);
          setCustomerRequestDate(data?.Return.EsScheInfo.CustRequestDate);
          setCustomerRequestTime(data?.Return.EsScheInfo.CustRequestTime);
          setAcknowledgeDate(data?.Return.EsScheInfo.ASCAckDate);
          setAcknowledgeTime(data?.Return.EsScheInfo.ASCAckTime);
          setCompleteDate(data?.Return.EsScheInfo.CompleteDate);
          setCompleteTime(data?.Return.EsScheInfo.CompleteTime);
          setEngineerAssignDate(data?.Return.EsScheInfo.EngrAssignDate);
          setEngineerAssignTime(data?.Return.EsScheInfo.EngrAssignTime);
          setFirstAppointmentDate(data?.Return.EsScheInfo.FirstAppDate);
          setFirstAppointmentTime(data?.Return.EsScheInfo.FirstAppTime);
          setFirstVisitDate(data?.Return.EsScheInfo.FirstVisitDate);
          setFirstVisitTime(data?.Return.EsScheInfo.FirstVisitTime);
          setFirstCustomerDate(data?.Return.EsScheInfo.FromCustDate);
          setFirstCustomerTime(data?.Return.EsScheInfo.FromCustTime);
          setGoodsDeliveryDate(data?.Return.EsScheInfo.GoodsDeliveryDate);
          setGoodsDeliveryTime(data?.Return.EsScheInfo.GoodsDeliveryTime);
          setLastAppointmentDate(data?.Return.EsScheInfo.LastAppDate);
          setLastAppointmentTime(data?.Return.EsScheInfo.LastAppTime);
          setLastChangeDate(data?.Return.EsScheInfo.LastChangeDate);
          setLastChangeTime(data?.Return.EsScheInfo.LastChangeTime);
          setLastVisitDate(data?.Return.EsScheInfo.LastVisitDate);
          setLastVisitTime(data?.Return.EsScheInfo.LastVisitTime);
          setRepairReceiveDate(data?.Return.EsScheInfo.RepairReceiveDate);
          setRepairReceiveTime(data?.Return.EsScheInfo.RepairReceiveTime);
          setUnitReceiveDate(data?.Return.EsScheInfo.UnitRcvDate);
          setUnitReceiveTime(data?.Return.EsScheInfo.UnitRcvTime);
          setCustomerFirstName(data?.Return.EsBpInfo.CustFirstName);
          setCustomerLastName(data?.Return.EsBpInfo.CustLastName);
          setCustomerStreetAddress(data?.Return.EsBpInfo.CustAddrStreet1);
          setCustomerDistrict(data?.Return.EsBpInfo.CustDistrict);
          setCustomerProvince(data?.Return.EsBpInfo.CustStateDesc);
          setCustomerZipCode(data?.Return.EsBpInfo.CustZipcode);
          setCustomerHomePhone(data?.Return.EsBpInfo.CustHomePhone);
          setCustomerMobilePhone(data?.Return.EsBpInfo.CustMobilePhone);
          setCustomerOfficePhone(data?.Return.EsBpInfo.CustOfficePhone);
          setEmail(data?.Return.EsBpInfo.CustEmail);
          setCustomerCode(data?.Return.EsBpInfo.CustomerCode);
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

  const postData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_MANAGEMENT_PAGE_SERVER_LINK}`,
        {
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
            engineerAnalysis,
            ascCode,
            createdBy,
            createdDate,
            createdTime,
            status,
            statusDesc,
            accessory,
            producedDate,
            remark,
            warrantyTermRemark,
            customerRequestDate,
            customerRequestTime,
            acknowledgeTime,
            acknowledgeDate,
            completeDate,
            completeTime,
            engineerAssignTime,
            engineerAssignDate,
            firstAppointmentDate,
            firstAppointmentTime,
            firstVisitTime,
            firstVisitDate,
            firstCustomerTime,
            goodsDeliveryTime,
            goodsDeliveryDate,
            lastAppointmentDate,
            lastAppointmentTime,
            lastChangeTime,
            lastChangeDate,
            lastVisitDate,
            lastVisitTime,
            repairReceiveTime,
            repairReceiveDate,
            unitReceiveDate,
            unitReceiveTime,
            customerFirstName,
            customerLastName,
            customerStreetAddress,
            customerDistrict,
            customerProvince,
            customerZipCode,
            customerHomePhone,
            customerMobilePhone,
            customerOfficePhone,
            email,
            customerCode,
            purchasedDate,
            firstCustomerDate,
          }),
        }
      );
      console.log("Response is", response);
    } catch (err) {
      console.log(err);
    }
  };

  const logData = () => {
    console.log(searchServiceOrder);
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
              Create job
            </button>
            {showModal && (
              <Modal
                setShowModal={setShowModal}
                modalTitle="Fields will auto populate"
              >
                <section className="flex flex-col overflow-auto">
                  <label htmlFor="ServiceOrder" className="sr-only">
                    Service Order No
                  </label>
                  <input
                    type="text"
                    name="ServiceOrder"
                    placeholder="Service Order"
                    id="ServiceOrder"
                    className="outline-none border-sky-600 py-2 px-2 border rounded-sm my-2"
                    size={10}
                    maxLength={10}
                    value={searchServiceOrder}
                    onChange={(e) => {
                      setSearchServiceOrder(e.target.value);
                    }}
                  />
                  <label htmlFor="engineerAnalysis" className="sr-only">
                    Engineer analysis
                  </label>
                  <textarea
                    name="engineerAnalysis"
                    placeholder="Engineer analysis"
                    id="engineerAnalysis"
                    className="outline-none border-sky-600 py-2 px-2 border rounded-sm my-2"
                    maxLength={100}
                    rows={4}
                    value={engineerAnalysis}
                    onChange={(e) => {
                      setEngineerAnalysis(e.target.value);
                    }}
                  ></textarea>
                  <button
                    onClick={postData}
                    type="button"
                    className="bg-green-900 text-white font-semibold font-sans rounded py-3 px-2 my-2"
                  >
                    Search
                  </button>
                </section>
              </Modal>
            )}
          </section>

          <section className="my-5">
            {/* <Tabs variant="enclosed" size="md">
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
            </Tabs> */}
            <Table />
          </section>
        </div>
      </main>
    </>
  );
};
export default memo(Management);
