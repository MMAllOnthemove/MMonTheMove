import React, { useEffect, useState } from "react";

function Modal({ setShowModal }: any) {
  const [data, setData] = useState<null | any>(null);
  const [service_order, setServiceOrder] = useState("");
  const [warranty, setWarranty] = useState("");
  const [model, setModel] = useState("");
  const [fault, setFault] = useState("");
  const [imei, setImei] = useState("");
  const [serial_number, setSerialNumber] = useState("");
  const [engineer, setEngineer] = useState("");

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
      IvSvcOrderNo: "4266443508",
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
  };
  return (
    <div className="overlay w-screen z-10 h-screen absolute left-0 top-0 bg-[#000]/50 flex justify-center items-center">
      <div className="modal w-[350px] bg-white p-10 rounded-lg shadow">
        <div className="form_title_container flex justify-between items-center">
          <h3 className="font-medium text-gray-900 capitalize">
            Fields will be auto populated
          </h3>
          <button
            className="border-none bg-transparent"
            onClick={() => {
              setShowModal(false);
            }}
          >
            x
          </button>
        </div>
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
            disabled
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
            disabled
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
            disabled
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
            disabled
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
            disabled
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
      </div>
    </div>
  );
}

export default Modal;