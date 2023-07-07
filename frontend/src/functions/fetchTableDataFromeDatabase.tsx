import UnitFinder from "@/pages/api/UnitFinder";

interface IfetchDataFromDatabase {
  setTableData: (data: any) => void;
}
export const fetchDataFromDatabase = async (props: IfetchDataFromDatabase) => {
  try {
    //  '/' not to be confused with home
    // the / is putting it at the end of our axios instance url defined in api folder
    const response = await UnitFinder.get("/");
    // console.log("Response is", response.data);
    // Accesing the response like this because we logged it to see how it was structured
    props.setTableData(response.data);
    // console.log(tableData);
  } catch (err) {
    console.log(err);
  }
};
