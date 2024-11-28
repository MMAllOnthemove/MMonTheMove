function isWithinTwoMonths(date1: string, date2: string) {
    const TWO_MONTHS = 60 * 24 * 60 * 60 * 1000; // 2 months in milliseconds

    // Convert input dates to timestamps
    const date1Timestamp = new Date(date1).getTime();
    const date2Timestamp = new Date(date2).getTime();

    // Calculate the difference between the two dates
    const difference = Math.abs(date2Timestamp - date1Timestamp);

    // Check if the difference is within 2 months
    return difference <= TWO_MONTHS;
}
export default isWithinTwoMonths;
// // Example usage:
// const date1 = "2024-11-27";
// const date2 = "2025-11-20";

// if (isWithinTwoMonths(date1, date2)) {
//     console.log("Within 2 months");
// } else {
//     console.log('<font color="red">red</font>');
// }
