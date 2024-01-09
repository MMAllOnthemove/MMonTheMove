import { useEffect, useState } from "react";
import {
  IfetchDataCombinedData,
  IgetBookingAgentJobs,
  Itable,
} from "../../utils/interfaces";

export const fetchDataCombinedData = () => {
  const [hhpData, setHHPData] = useState<Itable[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_MANAGEMENT}`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json)
        .then((data) => {
          // console.log("data", hhpData);
          setHHPData(hhpData);
        });
    };
    fetchData();
  }, []);
  return hhpData;
};

export const getBookingAgentJobs = async (props: IgetBookingAgentJobs) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_MANAGEMENT_AGENTS}/booking-agents/jobs/get`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const json = await response.json();
    // console.log(json)
    props.setGetBookingAgentJobsData(json);
  } catch (error) {}
};
