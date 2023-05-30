import { ThemeProvider, createTheme } from "@mui/material";
import MaterialReactTable from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";

type Table = {
  service_order: string;
  warranty: string;
  model: string;
  fault: string;
  imei: string;
  serial_number: string;
  engineer: string;
  parts_issued: string;
  parts_ordered: string;
};

const Table = () => {
  const [tableData, setTableData] = useState<string[] | any[]>([]);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}`)
      .then((res) => res.json())
      .then((data) => {
        setTableData(data);
      });
  }, [tableData]);

  // if (isLoading) return <p>Loading...</p>;
  // if (!tableData) return <p>No profile data</p>;

  //should be memoized or stable
  const defaultMaterialTheme = createTheme();
  const columns = useMemo(
    () => [
      {
        accessorKey: "service_order", //access nested data with dot notation
        header: "Service Order",
        enableClickToCopy: true,
      },
      {
        accessorKey: "warranty",
        header: "Warranty",
      },
      {
        accessorKey: "model", //normal accessorKey
        header: "Model",
        enableClickToCopy: true,
      },
      {
        accessorKey: "imei",
        header: "IMEI",
        enableClickToCopy: true,
      },
      {
        accessorKey: "serial_number",
        header: "Serial Number",
        enableClickToCopy: true,
      },
      {
        accessorKey: "engineer",
        header: "Engineer",
      },
      {
        accessorKey: "parts_issued",
        header: "Parts issued",
      },
      {
        accessorKey: "parts_ordered",
        header: "Parts ordered",
      },
    ],
    []
  );
  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      <MaterialReactTable
        columns={columns}
        data={tableData}
        renderDetailPanel={({ row }) => (
          <Box
            sx={{
              display: "grid",
              margin: "auto",
              gridTemplateColumns: "1fr 1fr",
              width: "100%",
            }}
          >
            <h3 className="text-gray-900 font-medium">
              {" "}
              Repairshopr details for this specific job will appear here
            </h3>
          </Box>
        )}
      />
    </ThemeProvider>
  );
};

export default Table;
