import Head from "next/head";
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import useDebounce from "../../../components/useDebounce";

function Parts() {
  const [data, setData] = useState<null | any>(null);
  const [isLoading, setLoading] = useState(false);
  const [search, setSearch] = useState<string>("");

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    async function getData(url = "", data = {}) {
      setLoading(true);
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
          setLoading(false);
        });
    }

    if (debouncedSearch)
      getData(
        "https://eu.ipaas.samsung.com/eu/gcic/GetPartsInfo/1.0/ImportSet",
        {
          IsCommonHeader: {
            Company: `${process.env.NEXT_PUBLIC_COMPANY}`,
            AscCode: `${process.env.NEXT_PUBLIC_ASC_CODE}`,
            Lang: `${process.env.NEXT_PUBLIC_LANG}`,
            Country: `${process.env.NEXT_PUBLIC_COUNTRY}`,
            Pac: `${process.env.NEXT_PUBLIC_PAC}`,
          },
          IvPartsNo: debouncedSearch,
        }
      );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
  };
  return (
    <>
      <Head>
        <title>Parts</title>
      </Head>
      <Navbar />
      <main className="flex flex-col justify-center">
        <div className="container mx-auto p-1">
          <h1 className=" text-gray-900 text-center sm:text-base md:text-xl lg:text-2xl py-2 capitalize">
            Get info for a specific part
          </h1>
          <section className="my-4 flex justify-center flex-col items-center gap-2">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center mx-auto py-3"
            >
              <label
                htmlFor="searchPart"
                className="text-center text-gray-950 font-medium mb-1 sr-only"
              >
                Part number
              </label>
              <input
                className="search border border-[#eee] rounded focus:border-sky-500 focus:outline-none font-medium"
                placeholder="Search Part"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
          </section>
          {data && (
            <section className="my-2 border border-[#eee] rounded px-2 py-3 font-sans">
              <p className="text-gray-800  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                Part No:{" "}
                <span className="text-slate-700 text-base capitalize font-semibold">
                  {data?.Return.EsPartsInfo.PartsNo}
                </span>
              </p>
              <p className="text-gray-800  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                Part Name:{" "}
                <span className="text-slate-700 text-base capitalize font-semibold">
                  {data?.Return.EsPartsInfo.PartsDescription}
                </span>
              </p>
              <p className="text-gray-800  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                Part Division:{" "}
                <span className="text-slate-700 text-base capitalize font-semibold">
                  {data?.Return.EsPartsInfo.Division}
                </span>
              </p>
              <p className="text-gray-800  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                Division Name:{" "}
                <span className="text-slate-700 text-base capitalize font-semibold">
                  {data?.Return.EsPartsInfo.DivisionDesc}
                </span>
              </p>
              <p className="text-gray-800  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                Sales Status:{" "}
                <span className="text-slate-700 text-base capitalize font-semibold">
                  {data?.Return.EsPartsInfo.SalesStatus}
                </span>
              </p>
              <p className="text-gray-800  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                Stock Availability:{" "}
                <span className="text-slate-700 text-base capitalize font-semibold">
                  {data?.Return.EsPartsInfo.StockAvailability}
                </span>
              </p>
              <p className="text-gray-800  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                Unit Price:{" "}
                <span className="text-slate-700 text-base capitalize font-semibold">
                  {data?.Return.EsPartsInfo.UnitPrice}
                </span>
              </p>
              <p className="text-gray-800  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                Currency:{" "}
                <span className="text-slate-700 text-base capitalize font-semibold">
                  {data?.Return.EsPartsInfo.Currency}
                </span>
              </p>
              <p className="text-gray-800  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                Color:{" "}
                <span className="text-slate-700 text-base capitalize font-semibold">
                  {data?.Return.EsPartsInfo.Color}
                </span>
              </p>
              <p className="text-gray-800  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                Division Name:{" "}
                <span className="text-slate-700 text-base capitalize font-semibold">
                  {data?.Return.EsPartsInfo.DivisionName}
                </span>
              </p>
              <p className="text-gray-800  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                Retail Price:{" "}
                <span className="text-slate-700 text-base capitalize font-semibold">
                  {data?.Return.EsPartsInfo.RetailPrice}
                </span>
              </p>
              <p className="text-gray-800  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                ASC Price:{" "}
                <span className="text-slate-700 text-base capitalize font-semibold">
                  {data?.Return.EsPartsInfo.ASCPrice}
                </span>
              </p>
              <p className="text-gray-800  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                Core A Price:{" "}
                <span className="text-slate-700 text-base capitalize font-semibold">
                  {data?.Return.EsPartsInfo.CoreAPrice}
                </span>
              </p>
              <p className="text-gray-800  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                Core B Price:{" "}
                <span className="text-slate-700 text-base capitalize font-semibold">
                  {data?.Return.EsPartsInfo.CoreBPrice}
                </span>
              </p>
            </section>
          )}
        </div>
      </main>
    </>
  );
}

export default Parts;
