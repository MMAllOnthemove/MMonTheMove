interface IfetchDataCombinedData {
  setTableData: (order: string | any) => void;
}

// Repair and gspn combined data
const urls = [
  `${process.env.NEXT_PUBLIC_SERVER_API_URL_MANAGEMENT}`,
  `${process.env.NEXT_PUBLIC_SERVER_API_URL_MANAGEMENT}/repair`,
];
export const fetchDataCombinedData = async (props: IfetchDataCombinedData) => {
  try {
    const response = await Promise.all(
      urls.map((url) => fetch(url).then((res) => res.json()))
    );
    let filterOutDups = response
      .flat()
      .filter(
        (obj, index) =>
          response
            .flat()
            .findIndex(
              (item) => item.service_order_no === obj.service_order_no
            ) === index
      );
    // console.log(response.flat());
    props.setTableData(filterOutDups);
  } catch (error) {
    // console.log("Error", error);
  }
};
