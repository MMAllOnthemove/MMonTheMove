import Navbar from "../../../components/Navbar";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import LoadingSpinner from "../../../components/LoadingSpinner";

export default function Management() {
  const [data, setData] = useState<null | any>(null);
  const [isLoading, setLoading] = useState(false);
  const [search, setSearch] = useState<string>("");

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
          Authorization: "Bearer 1c5914b1-9eaf-3aa7-a0d9-cf11c0a72e10",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
        .then((res) => res.json())
        .then((data: string | any) => {
          // console.log(data.EtPartsInfo.results);
          setData(data);
          // setLoading(false);
        });
    }

    getData(
      "https://eu.ipaas.samsung.com/eu/gcic/GetSOPartsInfo/1.0/ImportSet",
      {
        IvSvcOrderNo: search,
        // IvAscJobNo: "4266443508",
        IsCommonHeader: {
          Company: "C720",
          AscCode: "1730640",
          Lang: "EN",
          Country: "ZA",
          Pac: "999999920180502152320",
        },
      }
    );
  }, [search]);

  // if (isLoading) return <p>Loading...</p>;
  const handleSubmit = (event: any) => {
    event.preventDefault();
    setSearch(event.target.value);
  };
  return (
    <>
      <Navbar />

      <main>
        <div className="container flex justify-center flex-col mx-auto p-2">
          <section className="my-4 flex justify-center flex-col items-center gap-2">
            <form onSubmit={handleSubmit} className="flex flex-row gap-2">
              <label htmlFor="searchPart" className="sr-only">
                Search here
              </label>
              <input
                className="searchInput search input placeholder-sky-900 outline-none text-gray-950"
                placeholder="Search Service Order No."
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <input
                type="submit"
                value="Search"
                className="bg-sky-700 py-3 px-4 rounded text-white border-0 font-sans font-medium hover:bg-sky-950"
              />
            </form>
          </section>
          {/* {data &&
        data.EtPartsInfo.results.map((item, index) => {
          return <p key={index}>{item.PartsNo}</p>;
        })} */}

          <table>
            <thead>
              <tr>
                <th>GoodIssueDate</th>
                <th>InvoiceItemNo</th>
                <th>InvoiceNo</th>
                <th>MateralRequestNo</th>
                <th>PODate</th>
                <th>PONo</th>
                <th>POStatus</th>
                <th>PartStatus</th>
                <th>PartsDesc</th>
                <th>PartsNo</th>
                <th>PartsQty</th>
                <th>PartsRecvDate</th>
                <th>PartsSerial</th>
                <th>PartsSerialOld</th>
                <th>RepairLocation</th>
                <th>RequestDate</th>
                <th>SamsungOrderDate</th>
                <th>SamsungOrderNo</th>
                <th>SeqNo</th>
                <th>TrackingNo</th>
                <th>WtyType</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data?.EtPartsInfo?.results.map((item:any, index:any) => {
                  const {
                    GoodIssueDate,
                    InvoiceItemNo,
                    InvoiceNo,
                    MateralRequestNo,
                    PODate,
                    PONo,
                    POStatus,
                    PartStatus,
                    PartsDesc,
                    PartsNo,
                    PartsQty,
                    PartsRecvDate,
                    PartsSerial,
                    PartsSerialOld,
                    RepairLocation,
                    RequestDate,
                    SamsungOrderDate,
                    SamsungOrderNo,
                    SeqNo,
                    TrackingNo,
                    WtyType,
                  } = item;
                  return (
                    <tr key={index}>
                      <td>{GoodIssueDate}</td>
                      <td>{InvoiceItemNo}</td>
                      <td>{InvoiceNo}</td>
                      <td>{MateralRequestNo}</td>
                      <td>{PODate}</td>
                      <td>{PONo}</td>
                      <td>{POStatus}</td>
                      <td>{PartStatus}</td>
                      <td>{PartsDesc}</td>
                      <td>{PartsNo}</td>
                      <td>{PartsQty}</td>
                      <td>{PartsRecvDate}</td>
                      <td>{PartsSerial}</td>
                      <td>{PartsSerialOld}</td>
                      <td>{RepairLocation}</td>
                      <td>{RequestDate}</td>
                      <td>{SamsungOrderDate}</td>
                      <td>{SamsungOrderNo}</td>
                      <td>{SeqNo}</td>
                      <td>{TrackingNo}</td>
                      <td>{WtyType === "O" ? "OOW" : "IN"}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <section></section>
        </div>
      </main>
    </>
  );
}
