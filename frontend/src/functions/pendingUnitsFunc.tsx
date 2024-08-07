import moment from "moment";

export const getFilteredJobsByStatusCount = (
  arr: string[] | any,
  dateFrom: string,
  dateTo: string,
  statusName: string
) => {
  arr =
    dateFrom.length > 0 && dateTo.length > 0
      ? arr.filter((item: string | any) => {
          let date = moment(item.date_modified).format("YYYY-MM-DD");
          return (
            date >= dateFrom &&
            item.in_house_status === statusName &&
            date <= dateTo &&
            item.in_house_status === statusName
          );
        })
      : [];
  return arr.length;
};
export const getMappedJobsByStatusCount = (
  arr: string[] | any,
  dateFrom: string,
  dateTo: string,
  statusName: string
) => {
  arr =
    dateFrom.length > 0 && dateTo.length > 0
      ? arr
          .filter((item: any) => {
            let date = moment(item.date_modified).format("YYYY-MM-DD");
            return (
              date >= dateFrom &&
              item.in_house_status === statusName &&
              date <= dateTo &&
              item.in_house_status === statusName
            );
          })
          .map((i: any, index: number) => (
            <p
              className=" font-semibold border-b border-t border-[#eee] py-1"
              key={i.id}
            >
              {index + 1 + ")."} {i?.service_order_no} - {i.engineer}
            </p>
          ))
      : [];
  return arr;
};

const filter = ()=>{
  
}
export const getMappedJobsByApprovedOrRejectedStatusCount = (
  arr: string[] | any,
  dateFrom: string,
  dateTo: string,
  statusName: string
) => {
  arr =
    dateFrom.length > 0 && dateTo.length > 0
      ? arr.filter((item: any, index: number) => {
          let date = moment(item.date_modified).format("YYYY-MM-DD");
          return (
            date >= dateFrom &&
            item.in_house_status === statusName &&
            date <= dateTo &&
            item.in_house_status === statusName
          );
        })
      : [];
  return arr.length;
};
// Get all jobs per date
export const getMappedBookedInJobs = (
  arr: string[] | any,
  dateFrom: string,
  dateTo: string
) => {
  arr =
    dateFrom.length > 0 && dateTo.length > 0
      ? arr
          .filter((item: any) => {
            let date = moment(item.date_modified).format("YYYY-MM-DD");
            return date >= dateFrom && date <= dateTo;
          })
          .map((i: any, index: number) => (
            <p
              className=" font-semibold border-b border-t border-[#eee] py-1"
              key={i.id}
            >
              {index + 1 + ")."} {i?.service_order_no} - {i.engineer}
            </p>
          ))
      : [];
  return arr;
};
// Get all jobs count per date
export const getFilteredBookedInJobs = (
  arr: string[] | any,
  dateFrom: string,
  dateTo: string
) => {
  arr =
    dateFrom.length > 0 && dateTo.length > 0
      ? arr.filter((item: any) => {
          let date = moment(item.date_modified).format("YYYY-MM-DD");
          return date >= dateFrom && date <= dateTo;
        })
      : [];
  return arr.length;
};
// Pull job counts for each engineer
export const getEngineerJobsByStatusCount = (
  arr: string[] | any,
  dateFrom: string,
  dateTo: string,
  statusName: string,
  engineerFilter: string
) => {
  arr =
    dateFrom.length > 0 && dateTo.length > 0
      ? arr.filter((item: string | any) => {
          let date = moment(item.date_modified).format("YYYY-MM-DD");
          return (
            date >= dateFrom &&
            item.in_house_status === statusName &&
            item.engineer === engineerFilter &&
            date <= dateTo &&
            item.in_house_status === statusName &&
            item.engineer === engineerFilter
          );
        })
      : [];
  return arr.length;
};
export const getDTVEngineerJobsByStatus = (
  arr: string[] | any,
  dateFrom: string,
  dateTo: string,
  statusName: string,
  engineerFilter: string
) => {
  arr =
    dateFrom.length > 0 && dateTo.length > 0
      ? arr.filter((item: string | any) => {
          let date = moment(item.date_modified).format("YYYY-MM-DD");
          return (
            date >= dateFrom &&
            item.job_status === statusName &&
            item.engineer === engineerFilter &&
            date <= dateTo &&
            item.job_status === statusName &&
            item.engineer === engineerFilter
          );
        })
      : [];
  return arr.length;
};
export const getDTVEngineerJobsAllTime = (
  arr: string[] | any,
  dateFrom: string,
  dateTo: string,
) => {
  arr =
    dateFrom.length > 0 && dateTo.length > 0
      ? arr.filter((item: any) => {
          let date = moment(item.date_modified).format("YYYY-MM-DD");
          return date >= dateFrom && date <= dateTo;
        })
      : [];
  return arr.length;
};
