import React, { useEffect, useState } from "react";

function useFetchRepairJobs(url: string) {
  const [repairData, setRepairData] = useState<any>([]);

  useEffect(() => {
    fetch(url, {
      method: "GET",
      mode: "cors",
      cache: "default",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setRepairData(data));
  }, [url]);
  return [repairData];
}

export default useFetchRepairJobs;
