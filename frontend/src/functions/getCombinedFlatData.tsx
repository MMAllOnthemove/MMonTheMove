import {
  IfetchDataCombinedData,
  IgetBookingAgentJobs,
} from "../../utils/interfaces";

export const fetchDataCombinedData = async (props: IfetchDataCombinedData) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL_MANAGEMENT}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    // console.log(data);
    props.setTableData(data);
  } catch (error) {
    // console.log("Error", error);
  }
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
