export const minDate = new Date(2023, 7, 1).toISOString().split("T")[0];
export const maxDate = new Date().toISOString().split("T")[0];
export const datetimestamp = new Date(
  Date.now() + 1000 * 60 * -new Date().getTimezoneOffset()
)
  .toISOString()
  .replace("T", " ")
  .replace("Z", "");
