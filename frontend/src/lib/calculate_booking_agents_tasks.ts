import moment from "moment";

export const bookingAgentFunc = (
    arr: unknown[],
    dateFrom: string,
    dateTo: string
): number => {
    const filteredArr = arr.filter((agent) => {
        const date = moment(agent.created_date).format("YYYY-MM-DD");
        return date >= dateFrom && date <= dateTo;
    });
    return filteredArr;
};
