import {
  getPartsInfoFunction,
  getStockOverviewInfo,
} from "@/functions/ipass_api";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import useDebounce from "@/components/useDebounce";

function PartsSearch() {
  const [data, setData] = useState<null | any>(null);
  const [stockData, setStockData] = useState<null | any>(null);
  const [search, setSearch] = useState<string | any>("");
  // const [searchStock, setStockSearch] = useState<string>("");

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    getPartsInfoFunction({
      debouncedSearch,
      setData,
    });

    if (debouncedSearch) {
      getPartsInfoFunction({
        debouncedSearch,
        setData,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  useEffect(() => {
    getStockOverviewInfo({
      debouncedSearch,
      setStockData,
    });

    if (debouncedSearch) {
      getStockOverviewInfo({
        debouncedSearch,
        setStockData,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  return (
    <>
      <Head>
        <title>Parts</title>
        <meta name="robots" content="noindex, nofollow"></meta>
      </Head>
      <Navbar />
      <main className="flex flex-col justify-center space-between-navbar-and-content">
        <div className="container mx-auto p-1">
          <section className="my-5">
            <h1 className="mb-4 text-2xl font-sans font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-6xl text-center">
              Parts
            </h1>
          </section>
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
              value={search.trim()}
              onChange={(e) => setSearch(e.target.value)}
            />
          </section>
          <Tabs defaultIndex={0} size="md" variant="enclosed">
            <TabList>
              <Tab fontFamily="inherit" fontWeight="500">
                Search part
              </Tab>

              <Tab fontFamily="inherit" fontWeight="500">
                Stock overview
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <section className="my-5">
                  <h2 className="mb-4 text-3xl dark:text-white font-sans font-bold leading-none tracking-tight text-gray-900 text-center">
                    Get info for a specific part
                  </h2>
                  <section className="my-4 flex justify-center flex-col items-center gap-2"></section>
                  {data && search.length > 5 ? (
                    <section className="my-2 border border-[#eee] rounded px-2 py-3 font-sans">
                      <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                        Part No:{" "}
                        <span className="text-slate-700 text-base capitalize font-semibold">
                          {data?.Return.EsPartsInfo.PartsNo}
                        </span>
                      </p>
                      <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                        Part Name:{" "}
                        <span className="text-slate-700 text-base capitalize font-semibold">
                          {data?.Return.EsPartsInfo.PartsDescription}
                        </span>
                      </p>
                      <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                        Part Division:{" "}
                        <span className="text-slate-700 text-base capitalize font-semibold">
                          {data?.Return.EsPartsInfo.Division}
                        </span>
                      </p>

                      <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                        Division Name:{" "}
                        <span className="text-slate-700 text-base capitalize font-semibold">
                          {data?.Return.EsPartsInfo.DivisionDesc}
                        </span>
                      </p>
                      <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                        Sales Status:{" "}
                        <span className="text-slate-700 text-base capitalize font-semibold">
                          {data?.Return.EsPartsInfo.SalesStatus}
                        </span>
                      </p>
                      <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                        Stock Availability:{" "}
                        <span className="text-slate-700 text-base capitalize font-semibold">
                          {data?.Return.EsPartsInfo.StockAvailability}
                        </span>
                      </p>
                      <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                        Unit Price:{" "}
                        <span className="text-slate-700 text-base capitalize font-semibold">
                          {data?.Return.EsPartsInfo.UnitPrice}
                        </span>
                      </p>
                      <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                        Currency:{" "}
                        <span className="text-slate-700 text-base capitalize font-semibold">
                          {data?.Return.EsPartsInfo.Currency}
                        </span>
                      </p>
                      <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                        Color:{" "}
                        <span className="text-slate-700 text-base capitalize font-semibold">
                          {data?.Return.EsPartsInfo.Color}
                        </span>
                      </p>
                      <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                        Division Name:{" "}
                        <span className="text-slate-700 text-base capitalize font-semibold">
                          {data?.Return.EsPartsInfo.DivisionName}
                        </span>
                      </p>
                      <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                        Retail Price:{" "}
                        <span className="text-slate-700 text-base capitalize font-semibold">
                          {data?.Return.EsPartsInfo.RetailPrice}
                        </span>
                      </p>
                      <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                        ASC Price:{" "}
                        <span className="text-slate-700 text-base capitalize font-semibold">
                          {data?.Return.EsPartsInfo.ASCPrice}
                        </span>
                      </p>
                      <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                        Core A Price:{" "}
                        <span className="text-slate-700 text-base capitalize font-semibold">
                          {data?.Return.EsPartsInfo.CoreAPrice}
                        </span>
                      </p>
                      <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                        Core B Price:{" "}
                        <span className="text-slate-700 text-base capitalize font-semibold">
                          {data?.Return.EsPartsInfo.CoreBPrice}
                        </span>
                      </p>
                      <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                        WhStockQty:{" "}
                        <span className="text-slate-700 text-base capitalize font-semibold">
                          {stockData?.EtStockInfo?.results[0]?.PartsCode !==
                          search
                            ? ""
                            : stockData?.EtStockInfo?.results[0]?.WhStockQty}
                        </span>
                      </p>
                    </section>
                  ) : (
                    <p className="font-sans text-center font-semibold text-slate-950">
                      No data available
                    </p>
                  )}
                </section>
              </TabPanel>
              <TabPanel>
                <section className="my-5">
                  <h2 className="mb-4 text-3xl dark:text-white font-sans font-bold leading-none tracking-tight text-gray-900 text-center">
                    Get stock overview
                  </h2>
                </section>

                {stockData && search.length > 5 ? (
                  <section className="my-2 border border-[#eee] rounded px-2 py-3 font-sans">
                    <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                      PartsCode:{" "}
                      <span className="text-slate-700 text-base capitalize font-semibold">
                        {stockData?.EtStockInfo?.results[0]?.PartsCode !==
                        search
                          ? ""
                          : stockData?.EtStockInfo?.results[0]?.PartsCode}
                      </span>
                    </p>
                    <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                      PartsDesc:{" "}
                      <span className="text-slate-700 text-base capitalize font-semibold">
                        {stockData?.EtStockInfo?.results[0]?.PartsCode !==
                        search
                          ? ""
                          : stockData?.EtStockInfo?.results[0]?.PartsDesc}
                      </span>
                    </p>
                    <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                      StockQty:{" "}
                      <span className="text-slate-700 text-base capitalize font-semibold">
                        {stockData?.EtStockInfo?.results[0]?.PartsCode !==
                        search
                          ? ""
                          : stockData?.EtStockInfo?.results[0]?.StockQty}
                      </span>
                    </p>
                    <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                      WhStockQty:{" "}
                      <span className="text-slate-700 text-base capitalize font-semibold">
                        {stockData?.EtStockInfo?.results[0]?.PartsCode !==
                        search
                          ? ""
                          : stockData?.EtStockInfo?.results[0]?.WhStockQty}
                      </span>
                    </p>
                    <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                      EngStockQty:{" "}
                      <span className="text-slate-700 text-base capitalize font-semibold">
                        {stockData?.EtStockInfo?.results[0]?.PartsCode !==
                        search
                          ? ""
                          : stockData?.EtStockInfo?.results[0]?.EngStockQty}
                      </span>
                    </p>
                    <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                      Location1:{" "}
                      <span className="text-slate-700 text-base capitalize font-semibold">
                        {stockData?.EtStockInfo?.results[0]?.PartsCode !==
                        search
                          ? ""
                          : stockData?.EtStockInfo?.results[0]?.Location1}
                      </span>
                    </p>
                    <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                      Location2:{" "}
                      <span className="text-slate-700 text-base capitalize font-semibold">
                        {stockData?.EtStockInfo?.results[0]?.PartsCode !==
                        search
                          ? ""
                          : stockData?.EtStockInfo?.results[0]?.Location2}
                      </span>
                    </p>
                    <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                      Location3:{" "}
                      <span className="text-slate-700 text-base capitalize font-semibold">
                        {stockData?.EtStockInfo?.results[0]?.PartsCode !==
                        search
                          ? ""
                          : stockData?.EtStockInfo?.results[0]?.Location3}
                      </span>
                    </p>
                    <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                      StockAmount:{" "}
                      <span className="text-slate-700 text-base capitalize font-semibold">
                        {stockData?.EtStockInfo?.results[0]?.PartsCode !==
                        search
                          ? ""
                          : stockData?.EtStockInfo?.results[0]?.StockAmount}
                      </span>
                    </p>
                    <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                      Mstav:{" "}
                      <span className="text-slate-700 text-base capitalize font-semibold">
                        {stockData?.EtStockInfo?.results[0]?.PartsCode !==
                        search
                          ? ""
                          : stockData?.EtStockInfo?.results[0]?.Mstav}
                      </span>
                    </p>
                    <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                      ReqStock:{" "}
                      <span className="text-slate-700 text-base capitalize font-semibold">
                        {stockData?.EtStockInfo?.results[0]?.PartsCode !==
                        search
                          ? ""
                          : stockData?.EtStockInfo?.results[0]?.ReqStock}
                      </span>
                    </p>
                    <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                      AvaStock:{" "}
                      <span className="text-slate-700 text-base capitalize font-semibold">
                        {stockData?.EtStockInfo?.results[0]?.PartsCode !==
                        search
                          ? ""
                          : stockData?.EtStockInfo?.results[0]?.AvaStock}
                      </span>
                    </p>
                    <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                      Cuky:{" "}
                      <span className="text-slate-700 text-base capitalize font-semibold">
                        {stockData?.EtStockInfo?.results[0]?.PartsCode !==
                        search
                          ? ""
                          : stockData?.EtStockInfo?.results[0]?.Cuky}
                      </span>
                    </p>
                    <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                      UnitPrice:{" "}
                      <span className="text-slate-700 text-base capitalize font-semibold">
                        {stockData?.EtStockInfo?.results[0]?.PartsCode !==
                        search
                          ? ""
                          : stockData?.EtStockInfo?.results[0]?.UnitPrice}
                      </span>
                    </p>
                    <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                      Unit:{" "}
                      <span className="text-slate-700 text-base capitalize font-semibold">
                        {stockData?.EtStockInfo?.results[0]?.PartsCode !==
                        search
                          ? ""
                          : stockData?.EtStockInfo?.results[0]?.Unit}
                      </span>
                    </p>
                    <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                      MoAvgPrice:{" "}
                      <span className="text-slate-700 text-base capitalize font-semibold">
                        {stockData?.EtStockInfo?.results[0]?.PartsCode !==
                        search
                          ? ""
                          : stockData?.EtStockInfo?.results[0]?.MoAvgPrice}
                      </span>
                    </p>
                    <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                      MoAvgAmount:{" "}
                      <span className="text-slate-700 text-base capitalize font-semibold">
                        {stockData?.EtStockInfo?.results[0]?.PartsCode !==
                        search
                          ? ""
                          : stockData?.EtStockInfo?.results[0]?.MoAvgAmount}
                      </span>
                    </p>
                    <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                      AscCode:{" "}
                      <span className="text-slate-700 text-base capitalize font-semibold">
                        {stockData?.EtStockInfo?.results[0]?.PartsCode !==
                        search
                          ? ""
                          : stockData?.EtStockInfo?.results[0]?.AscCode}
                      </span>
                    </p>
                    <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                      Spart:{" "}
                      <span className="text-slate-700 text-base capitalize font-semibold">
                        {stockData?.EtStockInfo?.results[0]?.PartsCode !==
                        search
                          ? ""
                          : stockData?.EtStockInfo?.results[0]?.Spart}
                      </span>
                    </p>
                    <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                      Erdat:{" "}
                      <span className="text-slate-700 text-base capitalize font-semibold">
                        {stockData?.EtStockInfo?.results[0]?.PartsCode !==
                        search
                          ? ""
                          : stockData?.EtStockInfo?.results[0]?.Erdat}
                      </span>
                    </p>
                    <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                      AscName:{" "}
                      <span className="text-slate-700 text-base capitalize font-semibold">
                        {stockData?.EtStockInfo?.results[0]?.PartsCode !==
                        search
                          ? ""
                          : stockData?.EtStockInfo?.results[0]?.AscName}
                      </span>
                    </p>
                    <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                      AssignedQty:{" "}
                      <span className="text-slate-700 text-base capitalize font-semibold">
                        {stockData?.EtStockInfo?.results[0]?.PartsCode !==
                        search
                          ? ""
                          : stockData?.EtStockInfo?.results[0]?.AssignedQty}
                      </span>
                    </p>
                    <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                      AvailableQty:{" "}
                      <span className="text-slate-700 text-base capitalize font-semibold">
                        {stockData?.EtStockInfo?.results[0]?.PartsCode !==
                        search
                          ? ""
                          : stockData?.EtStockInfo?.results[0]?.AvailableQty}
                      </span>
                    </p>
                    <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                      Vtext:{" "}
                      <span className="text-slate-700 text-base capitalize font-semibold">
                        {stockData?.EtStockInfo?.results[0]?.PartsCode !==
                        search
                          ? ""
                          : stockData?.EtStockInfo?.results[0]?.Vtext}
                      </span>
                    </p>
                    <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                      PrimeParts:{" "}
                      <span className="text-slate-700 text-base capitalize font-semibold">
                        {stockData?.EtStockInfo?.results[0]?.PartsCode !==
                        search
                          ? ""
                          : stockData?.EtStockInfo?.results[0]?.PrimeParts}
                      </span>
                    </p>
                    <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                      Aedat:{" "}
                      <span className="text-slate-700 text-base capitalize font-semibold">
                        {stockData?.EtStockInfo?.results[0]?.PartsCode !==
                        search
                          ? ""
                          : stockData?.EtStockInfo?.results[0]?.PrimeParts}
                      </span>
                    </p>
                    <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                      InTransitQty:{" "}
                      <span className="text-slate-700 text-base capitalize font-semibold">
                        {stockData?.EtStockInfo?.results[0]?.PartsCode !==
                        search
                          ? ""
                          : stockData?.EtStockInfo?.results[0]?.InTransitQty}
                      </span>
                    </p>
                    <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                      BlockedQty:{" "}
                      <span className="text-slate-700 text-base capitalize font-semibold">
                        {stockData?.EtStockInfo?.results[0]?.PartsCode !==
                        search
                          ? ""
                          : stockData?.EtStockInfo?.results[0]?.BlockedQty}
                      </span>
                    </p>
                    <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                      Location4:{" "}
                      <span className="text-slate-700 text-base capitalize font-semibold">
                        {stockData?.EtStockInfo?.results[0]?.PartsCode !==
                        search
                          ? ""
                          : stockData?.EtStockInfo?.results[0]?.Location4}
                      </span>
                    </p>
                    <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                      AscAcctno:{" "}
                      <span className="text-slate-700 text-base capitalize font-semibold">
                        {stockData?.EtStockInfo?.results[0]?.PartsCode !==
                        search
                          ? ""
                          : stockData?.EtStockInfo?.results[0]?.AscAcctno}
                      </span>
                    </p>
                    <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                      AscAcctName:{" "}
                      <span className="text-slate-700 text-base capitalize font-semibold">
                        {stockData?.EtStockInfo?.results[0]?.PartsCode !==
                        search
                          ? ""
                          : stockData?.EtStockInfo?.results[0]?.AscAcctName}
                      </span>
                    </p>
                    <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                      PbaFlag:{" "}
                      <span className="text-slate-700 text-base capitalize font-semibold">
                        {stockData?.EtStockInfo?.results[0]?.PartsCode !==
                        search
                          ? ""
                          : stockData?.EtStockInfo?.results[0]?.PbaFlag}
                      </span>
                    </p>
                    <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                      LimitStockQty:{" "}
                      <span className="text-slate-700 text-base capitalize font-semibold">
                        {stockData?.EtStockInfo?.results[0]?.PartsCode !==
                        search
                          ? ""
                          : stockData?.EtStockInfo?.results[0]?.LimitStockQty}
                      </span>
                    </p>
                    <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                      TotalQty:{" "}
                      <span className="text-slate-700 text-base capitalize font-semibold">
                        {stockData?.EtStockInfo?.results[0]?.PartsCode !==
                        search
                          ? ""
                          : stockData?.EtStockInfo?.results[0]?.TotalQty}
                      </span>
                    </p>
                    <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                      PartsDescCn:{" "}
                      <span className="text-slate-700 text-base capitalize font-semibold">
                        {stockData?.EtStockInfo?.results[0]?.PartsCode !==
                        search
                          ? ""
                          : stockData?.EtStockInfo?.results[0]?.PartsDescCn}
                      </span>
                    </p>
                    <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                      Rso:{" "}
                      <span className="text-slate-700 text-base capitalize font-semibold">
                        {stockData?.EtStockInfo?.results[0]?.PartsCode !==
                        search
                          ? ""
                          : stockData?.EtStockInfo?.results[0]?.Rso}
                      </span>
                    </p>
                    <p className="text-gray-800 font-sans  flex items-center justify-between font-medium text-base border-b border-[#eee} py-2">
                      RsoName:{" "}
                      <span className="text-slate-700 text-base capitalize font-semibold">
                        {stockData?.EtStockInfo?.results[0]?.PartsCode !==
                        search
                          ? ""
                          : stockData?.EtStockInfo?.results[0]?.RsoName}
                      </span>
                    </p>
                  </section>
                ) : (
                  <p className="font-sans text-center font-semibold text-slate-950">
                    No data available
                  </p>
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </main>
    </>
  );
}

export default PartsSearch;