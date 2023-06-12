import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import useDebounce from "../../components/useDebounce";
import Modal from "../../components/Modals/modal.home";

function Home() {
  const [data, setData] = useState<null | any>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  // const [service_order, setServiceOrder] = useState("");

  const debouncedSearch = useDebounce(searchValue, 500);

  useEffect(() => {
    const getData = async (url = "", data = {}) => {
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
          // console.log(data);

          // setLoading(false);
        });
    };

    if (debouncedSearch)
      getData(
        "https://eu.ipaas.samsung.com/eu/gcic/GetSOInfoAll/1.0/ImportSet",
        {
          IvSvcOrderNo: debouncedSearch,
          // IvSvcOrderNo: "4266810380",
          // IvAscJobNo: "4266443508",
          IsCommonHeader: {
            Company: `${process.env.NEXT_PUBLIC_COMPANY}`,
            AscCode: `${process.env.NEXT_PUBLIC_ASC_CODE}`,
            Lang: `${process.env.NEXT_PUBLIC_LANG}`,
            Country: `${process.env.NEXT_PUBLIC_COUNTRY}`,
            Pac: `${process.env.NEXT_PUBLIC_PAC}`,
          },
        }
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };
  return (
    <>
      <header className="bg-white absolute inset-x-0 top-0 z-50">
        <Navbar />
      </header>

      <main className="home_main flex flex-col justify-center">
        {/* <div className="container mx-auto p-1">
          <h1 className=" text-gray-900 text-center sm: md:text-xl lg:text-2xl py-2 capitalize">
            Get info for a specific service order
          </h1>
          <section>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center mx-auto py-3"
            >
              <label
                htmlFor="serviceOrder"
                className="text-center text-gray-950 font-medium mb-1 sr-only"
              >
                Service order
              </label>
              <input
                type="text"
                name="serviceOrder"
                id="serviceOrder"
                className="search border border-[#eee] rounded focus:border-sky-500 focus:outline-none font-medium"
                placeholder="Type service order"
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </form>
          </section>
          {data && (
            <section className="my-2 border border-[#eee] rounded px-2 py-3 font-sans">
              <p className="text-gray-800  flex items-center justify-between font-medium  border-b border-[#eee} py-2">
                Accessory:{" "}
                <span className="text-slate-700  capitalize font-semibold">
                  {data?.Return?.EsModelInfo.Accessory}
                </span>{" "}
              </p>
              <p className="text-gray-800  flex items-center justify-between font-medium  border-b border-[#eee} py-2">
                IMEI:{" "}
                <span className="text-slate-700  capitalize font-semibold">
                  {data?.Return?.EsModelInfo.IMEI}
                </span>
              </p>
              <p className="text-gray-800  flex items-center justify-between font-medium  border-b border-[#eee} py-2">
                Model:{" "}
                <span className="text-slate-700  capitalize font-semibold">
                  {data?.Return?.EsModelInfo.Model}
                </span>
              </p>
              <p className="text-gray-800  flex items-center justify-between font-medium  border-b border-[#eee} py-2">
                Serial Number:{" "}
                <span className="text-slate-700  capitalize font-semibold">
                  {data?.Return?.EsModelInfo.SerialNo}
                </span>
              </p>
              <p className="text-gray-800  flex items-center justify-between font-medium  border-b border-[#eee} py-2">
                Defect Desc:{" "}
                <span className="text-slate-700  capitalize font-semibold">
                  {data?.Return?.EsModelInfo.DefectDesc}
                </span>
              </p>
              <p className="text-gray-800  flex items-center justify-between font-medium  border-b border-[#eee} py-2">
                Warranty:{" "}
                <span className="text-slate-700  capitalize font-semibold">
                  {data?.Return?.EsModelInfo.WtyType}
                </span>
              </p>
            </section>
          )}
        </div> */}

        <div className="mx-auto p-1 sm:p-0.5 container">
          <div className="content-wrapper">
            <h1>
              HHP <span>Management</span>{" "}
            </h1>
            <button
              type="button"
              onClick={() => {
                setShowModal(true);
              }}
            >
              Get service order
            </button>
          </div>
          {showModal && (
            <Modal
              setShowModal={setShowModal}
              modalTitle="Fields will be auto populated"
            >
              <label htmlFor="ServiceOrder" className="sr-only">
                Service Order No
              </label>
              <input
                type="text"
                name="ServiceOrder"
                placeholder="Service Order"
                id="ServiceOrder"
                className="outline-none border-sky-600 py-2 px-2 border rounded-sm my-2 modalSearch"
                value={debouncedSearch}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
              />

              <section>
                <p>
                  Accessory:{" "}
                  <span>
                    {data?.Return?.EsModelInfo.Accessory === ""
                      ? "Not available"
                      : data?.Return?.EsModel}
                  </span>{" "}
                </p>
                <p>
                  IMEI:{" "}
                  <span>
                    {data?.Return?.EsModelInfo.IMEI === ""
                      ? "Not available"
                      : data?.Return?.EsModelInfo.IMEI}
                  </span>
                </p>
                <p>
                  Model:{" "}
                  <span>
                    {data?.Return?.EsModelInfo.Model === ""
                      ? "Not available"
                      : data?.Return?.EsModelInfo.Model}
                  </span>
                </p>
                <p>
                  Serial Number:{" "}
                  <span>
                    {data?.Return?.EsModelInfo.SerialNo === ""
                      ? "Not available"
                      : data?.Return?.EsModelInfo.SerialNo}
                  </span>
                </p>
                <p>
                  Issue:{" "}
                  <span>
                    {data?.Return?.EsModelInfo.DefectDesc === ""
                      ? "Not available"
                      : data?.Return?.EsModelInfo.DefectDesc}
                  </span>
                </p>
                <p>
                  Warranty: <span>{data?.Return?.EsModelInfo.WtyType}</span>
                </p>
              </section>
            </Modal>
          )}
        </div>
      </main>
    </>
  );
}

export default Home;
