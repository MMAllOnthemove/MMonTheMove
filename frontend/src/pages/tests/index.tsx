import React, { useEffect } from "react";

function Tests() {
  useEffect(() => {
    getSOInfoAllFunction();
  }, []);
  async function getSOInfoAllFunction() {
    const options = {
      IvSvcOrderNo: "4266647460",
      IsCommonHeader: {
        Company: `${process.env.NEXT_PUBLIC_COMPANY}`,
        AscCode: `${process.env.NEXT_PUBLIC_ASC_CODE}`,
        Lang: `${process.env.NEXT_PUBLIC_LANG}`,
        Country: `${process.env.NEXT_PUBLIC_COUNTRY}`,
        Pac: `${process.env.NEXT_PUBLIC_PAC}`,
      },
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_IPAAS_API_GETSOINFOALL}`,
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_IPASS}`,
        },
        body: JSON.stringify(options),
      }
    );

    const data = await response.json();
    // console.log(data);
  }
  return <div>Tests</div>;
}

export default Tests;
