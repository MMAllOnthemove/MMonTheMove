import moment from "moment";

// function isDateInRange(dateString: string, startDate: string, endDate: string) {
//     const date = moment(dateString).format("YYYY-MM-DD");
//     return date >= startDate && date <= endDate;
// }
// export default isDateInRange;

function isDateInRange(
    dateString: string,
    startDate?: string,
    endDate?: string
) {
    // Default to a 7-day range ending today if no dates are provided
    const end = endDate || moment().format("YYYY-MM-DD");
    const start =
        startDate || moment().subtract(7, "days").format("YYYY-MM-DD");

    const date = moment(dateString).format("YYYY-MM-DD");
    return date >= start && date <= end;
}

export default isDateInRange;
