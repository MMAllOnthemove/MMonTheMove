import { useEffect, useState } from "react";

export const getDTVAnalytics = () => {
  const [dtvData, setDTVData] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DTV}analytics/get`)
        .then((res) => res.json())
        .then((data) => {
          setDTVData(data);
        });
    };

    fetchData();
  }, [dtvData]);

  return { dtvData };
};
