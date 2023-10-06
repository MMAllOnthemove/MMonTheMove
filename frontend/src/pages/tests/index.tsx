import React, { useEffect, useState } from "react";

function Tests() {
  const [stockData, setStockData] = useState<string | any>("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    getStockOverviewInfo();
  }, [debouncedSearch]);
  async function getStockOverviewInfo() {
    const options = {
      IvCompany: `${process.env.NEXT_PUBLIC_COMPANY}`,
      IvLanguage: `${process.env.NEXT_PUBLIC_LANG}`,
      IvAscAcctno: `${process.env.NEXT_PUBLIC_ASC_CODE}`,
      IvAscCode: `${process.env.NEXT_PUBLIC_ASC_CODE}`,
      IvPartsCode: debouncedSearch,
      IsCommonHeader: {
        Company: `${process.env.NEXT_PUBLIC_COMPANY}`,
        AscCode: `${process.env.NEXT_PUBLIC_ASC_CODE}`,
        Lang: `${process.env.NEXT_PUBLIC_LANG}`,
        Country: `${process.env.NEXT_PUBLIC_COUNTRY}`,
        Pac: `${process.env.NEXT_PUBLIC_PAC}`,
        Systemkey: "",
        Msgid: "",
      },
    };
    await fetch(`${process.env.NEXT_PUBLIC_IPAAS_API_GetBranchStockOverview}`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_IPASS}`,
      },
      body: JSON.stringify(options),
    })
      .then((response) => response.json())
      .then((data) => {
        setStockData(data);
        // console.log(data);
      });
  }

  return (
    <>
      <section
        className="flex flex-col justify-center mx-auto py-3"
        id="searchparts_form"
      >
        <label
          htmlFor="searchPart"
          className="text-center text-gray-950 font-medium mb-1 sr-only"
        >
          Part number
        </label>
        <input
          name="searchPart"
          aria-labelledby="searchPart"
          className="search border border-[#eee] rounded focus:border-sky-500 focus:outline-none font-medium"
          placeholder="Search Part"
          type="text"
          maxLength={11}
          value={debouncedSearch.trim().toUpperCase()}
          onChange={(e) => setDebouncedSearch(e.target.value)}
        />
      </section>
      <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
        PartsCode:{" "}
        <span className="text-slate-700 text-base capitalize font-semibold">
          {stockData?.EtStockInfo?.results[0]?.PartsCode !== debouncedSearch
            ? ""
            : stockData?.EtStockInfo?.results[0]?.PartsCode}
        </span>
      </p>
    </>
  );
}

export default Tests;
