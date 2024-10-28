import moment from "moment";

export const bookingAgentMapOverJobs = (
    arr: string[] | any[],
    dateFrom: string,
    dateTo: string,
    agentName: string
) => {
    arr =
        dateFrom.length > 0 && dateTo.length > 0
            ? arr.filter((agent) => {
                  const date = moment(agent.created_date).format("YYYY-MM-DD");
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
