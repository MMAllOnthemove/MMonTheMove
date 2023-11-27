import React, { useEffect, useState } from "react";

function Tests() {
  const [searchTerm, setSearchTerm] = useState("");
  const [collectData, setCollectData] = useState([]);

  useEffect(() => {
    getBookings();
  }, []);
  async function getBookings() {
    const response = await fetch(
      `https://eu.ipaas.samsung.com/eu/gcic/GetSOList/1.0/ImportSet`,
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_IPASS}`,
        },
        body: JSON.stringify({
          IsBasicCond: {
            AscCode: "1730640",
            ReqDateFrom: "20231031",
            ReqDateTo: "20231031",
          },
          IsCommonHeader: {
            Company: "C720",
            AscCode: "1730640",
            Country: "ZA",
            Lang: "EN",
            Pac: "999999920180502152320",
          },
        }),
      }
    );
    const data = await response.json();
    // console.log(data.EtSvcInfo.results);

    setCollectData(data.EtSvcInfo.results);
  }
  let filter = collectData.filter((i: any) => i?.SvcProduct === "HHP");
  return (
    <>
      <input
        type="search"
        name="search"
        id="search"
        className="border p-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <td>SO</td>
            <td>Date</td>
          </tr>
        </thead>
        <tbody>
          {filter.map((k: any) => (
            <tr key={k.SvcOrderNo}>
              <td>{k.SvcOrderNo}</td>
              <td>{k.PostingDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Tests;
