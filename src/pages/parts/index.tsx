import { memo, useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import Head from "next/head";

function Parts() {
  const [data, setData] = useState<null | any>(null);
  const [isLoading, setLoading] = useState(false);
  const [search, setSearch] = useState<string>("");

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
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_IPAAS}`,
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

    getData("https://eu.ipaas.samsung.com/eu/gcic/GetPartsInfo/1.0/ImportSet", {
      IsCommonHeader: {
        Company: `${process.env.NEXT_PUBLIC_COMPANY}`,
        AscCode: `${process.env.NEXT_PUBLIC_ASC_CODE}`,
        Lang: `${process.env.NEXT_PUBLIC_LANG}`,
        Country: `${process.env.NEXT_PUBLIC_COUNTRY}`,
        Pac: `${process.env.NEXT_PUBLIC_PAC}`,
      },
      IvPartsNo: search,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setSearch(event.target.value);
  };
  return (
    <>
      <Head>
        <title>Parts</title>
      </Head>
      <Navbar />
      <main>
        <div className="container mx-auto p-4">
          <section className="my-4 flex justify-center flex-col items-center gap-2">
            <form onSubmit={handleSubmit} className="flex flex-row gap-2">
              <label htmlFor="searchPart" className="sr-only">
                Search Part
              </label>
              <input
                className="searchInput search input placeholder-sky-900 outline-none text-gray-950"
                placeholder="Search Part"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <input
                type="submit"
                value="Search"
                className="bg-sky-700 py-3 px-4 rounded text-white border-0 font-sans font-medium hover:bg-sky-950 cursor-pointer"
              />
            </form>
          </section>
          <section className="flex justify-center mx-auto p-2">
            <article className="part_info_card">
              <p>
                Part No: <span>{data?.Return.EsPartsInfo.PartsNo}</span>
              </p>
              <p>
                Part Name:{" "}
                <span>{data?.Return.EsPartsInfo.PartsDescription}</span>
              </p>
              <p>
                Part Division: <span>{data?.Return.EsPartsInfo.Division}</span>
              </p>
              <p>
                Division Name:{" "}
                <span>{data?.Return.EsPartsInfo.DivisionDesc}</span>
              </p>
              <p>
                Sales Status:{" "}
                <span>{data?.Return.EsPartsInfo.SalesStatus}</span>
              </p>
              <p>
                Stock Availability:{" "}
                <span>{data?.Return.EsPartsInfo.StockAvailability}</span>
              </p>
              <p>
                Unit Price: <span>{data?.Return.EsPartsInfo.UnitPrice}</span>
              </p>
              <p>
                Currency: <span>{data?.Return.EsPartsInfo.Currency}</span>
              </p>
              <p>
                Color: <span>{data?.Return.EsPartsInfo.Color}</span>
              </p>
              <p>
                Division Name:{" "}
                <span>{data?.Return.EsPartsInfo.DivisionName}</span>
              </p>
              <p>
                Retail Price:{" "}
                <span>{data?.Return.EsPartsInfo.RetailPrice}</span>
              </p>
              <p>
                ASC Price: <span>{data?.Return.EsPartsInfo.ASCPrice}</span>
              </p>
              <p>
                Core A Price: <span>{data?.Return.EsPartsInfo.CoreAPrice}</span>
              </p>
              <p>
                Core B Price: <span>{data?.Return.EsPartsInfo.CoreBPrice}</span>
              </p>
            </article>
          </section>
        </div>
      </main>
    </>
  );
}

export default memo(Parts);
