import moment from "moment";

const calculateDueDate = (dateBooked: string | undefined): string => {
    // Parse the date_booked and add 7 days
    const dueDate = moment(dateBooked).add(7, "days").format("lll");
    return dueDate;
};
export default calculateDueDate;
