import moment from "moment";
export const minDate = new Date(2023, 7, 1).toISOString().split("T")[0];
export const maxDate = new Date().toISOString().split("T")[0];
// export const datetimestamp = moment().format("YYYY-MM-DD HH:mm:ss");
export const datetimestamp = new Date(
    Date.now() + 1000 * 60 * -new Date().getTimezoneOffset()
)
    .toISOString()
    .replace("T", " ")
    .replace("Z", "");

// Get today's date
export const today = new Date().toISOString().split("T")[0];

// Calculate the minimum date (3 months back)

// Format the dates to 'YYYY-MM-DD'
export const formatDate = (date: string | Date | number) => {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};
