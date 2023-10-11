import moment from "moment";
import { getBookingAgentJobs } from "@/functions/getCombinedFlatData";
import { useEffect } from "react";

type TBookingsProps = {
  dateFrom: string;
  dateTo: string;
  getBookingAgentJobsData: string[];
  setGetBookingAgentJobsData: string;
  booking_agent: string;
  created_date: string;
  agent: string;
};

// Booking agent Shane

export function bookingAgentFunc(
  arr: string[] | any[],
  dateFrom: string,
  dateTo: string,
  agentName: string
) {
  arr =
    dateFrom.length > 0 && dateTo.length > 0
      ? arr.filter((agent) => {
          let date = moment(agent.created_date).format("YYYY-MM-DD");
          return (
            date >= dateFrom &&
            agent.booking_agent === agentName &&
            date <= dateTo &&
            agent.booking_agent === agentName
          );
        })
      : [];

  return arr.length;
}
export function bookingAgentFuncTotal(
  arr: string[] | any[],
  dateFrom: string,
  dateTo: string
) {
  arr =
    dateFrom.length > 0 && dateTo.length > 0
      ? arr.filter((agent) => {
          let date = moment(agent.created_date).format("YYYY-MM-DD");
          return date >= dateFrom && date <= dateTo;
        })
      : [];

  return arr.length;
}

export function bookingAgentMapOverJobs(
  arr: string[] | any[],
  dateFrom: string,
  dateTo: string,
  agentName: string
) {
  arr =
    dateFrom.length > 0 && dateTo.length > 0
      ? arr
          .filter((agent) => {
            let date = moment(agent.created_date).format("YYYY-MM-DD");
            return (
              date >= dateFrom &&
              agent.booking_agent === agentName &&
              date <= dateTo &&
              agent.booking_agent === agentName
            );
          })
          .map((item) => (
            <p className="font-sans font-semibold" key={item.id}>
              {item?.service_order_no}
            </p>
          )) // we will map over it on the page we need
      : [];

  return arr;
}
