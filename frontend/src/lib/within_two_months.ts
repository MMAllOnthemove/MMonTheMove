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
