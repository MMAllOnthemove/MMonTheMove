import moment from "moment";
import { TAgentTasks } from "./types";

export const bookingAgentMapOverJobs = (
    arr: TAgentTasks[],
    dateFrom: string,
    dateTo: string,
    agentName: string
) => {
    arr =
        dateFrom.length > 0 && dateTo.length > 0
            ? arr.filter((agent) => {
                  const date = moment(agent.original_ticket_date).format(
                      "YYYY-MM-DD"
                  );
                  return (
                      date >= dateFrom &&
                      agent.booking_agent === agentName &&
                      date <= dateTo &&
                      agent.booking_agent === agentName
                  );
              })
            : [];

    return arr;
};
